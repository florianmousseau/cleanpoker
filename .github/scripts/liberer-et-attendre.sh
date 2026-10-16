#!/usr/bin/env bash
# Libere les runs `pull_request` d'une PR ouverte par `github-actions[bot]`,
# puis attend ses checks. Sort en 1 avant tout merge si un run reste en attente,
# si aucun check n'apparait, ou si un check est rouge.
#
# Un run qui attend son approbation sort de l'API en `status: completed`,
# `conclusion: action_required`, et non en `status: action_required`. Mesure du
# 2026-10-16 sur la PR #264 (run 38981876656, tentative 1) : le filtre ne lisait
# que `status`, ne voyait aucun run, et jetait l'erreur de l'approbation. Zero
# run libere a chaque release depuis la premiere. Une fois le filtre corrige,
# `approve` par `GITHUB_TOKEN` passe (run 38983445842, PR #267).
#
# Usage : liberer-et-attendre.sh <branche-source-de-la-PR>
set -euo pipefail

branch="$1"

en_attente() {
  gh run list --branch "$branch" --event pull_request --limit 20 \
    --json databaseId,status,conclusion \
    --jq '.[] | select(.status == "action_required" or .conclusion == "action_required") | .databaseId'
}

# Les runs mettent quelques secondes a apparaitre apres l'ouverture de la PR.
liberes=0
for _ in $(seq 1 24); do
  sleep 5
  ids=$(en_attente)
  if [ -z "$ids" ]; then
    if [ "$liberes" -gt 0 ]; then break; fi
    continue
  fi
  for id in $ids; do
    if gh api --method POST "repos/$GITHUB_REPOSITORY/actions/runs/$id/approve" >/dev/null; then
      echo "run $id approuve"
      liberes=$((liberes + 1))
    else
      echo "::warning::run $id : approbation refusee"
    fi
  done
done
echo "runs liberes de l attente d approbation : $liberes"

restants=$(en_attente | wc -l)
if [ "$restants" -gt 0 ]; then
  echo "::error::$restants run(s) de la PR $branch toujours en action_required : arret avant le merge." >&2
  exit 1
fi

# `gh pr checks` sort en 8 tant qu'un check tourne : on COMPTE les checks
# plutot que de lire son code de sortie.
nb=0
for _ in $(seq 1 12); do
  nb=$(gh pr checks "$branch" --json name --jq length 2>/dev/null || true)
  if [ "${nb:-0}" -gt 0 ]; then break; fi
  sleep 5
done
if [ "${nb:-0}" -eq 0 ]; then
  echo "::error::Aucun check sur la PR $branch : arret avant le merge." >&2
  exit 1
fi

# `--fail-fast` : un check rouge sort en 1, et le job s'arrete avant le merge.
gh pr checks "$branch" --watch --fail-fast --interval 15
