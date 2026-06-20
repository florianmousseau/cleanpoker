<svelte:head>
  <title>Estimation agile : story points, vélocité et planification de sprint | CleanPoker</title>
  <meta name="description" content="Guide complet de l'estimation agile : story points vs heures, fonctionnement de la vélocité, planification de capacité et erreurs courantes à éviter." />
  <link rel="canonical" href="https://cleanpoker.dev/fr/estimation-agile" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/estimation-agile" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/estimation-agile" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/estimation-agile" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/estimation-agile" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/estimation-agile" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/estimation-agile" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Estimation agile : story points, vélocité et planification de sprint",
    "url": "https://cleanpoker.dev/fr/estimation-agile",
    "description": "Guide complet sur estimation agile : story points, vélocité, planification de capacité et erreurs courantes.",
    "isPartOf": { "@type": "WebApplication", "name": "CleanPoker", "url": "https://cleanpoker.dev" },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quelle est la différence entre les story points et les heures ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Les story points mesurent la complexité relative, pas le temps. Une story à 5 points est environ deux fois plus complexe que une story à 3 points. Les heures varient selon le développeur ; la complexité relative est stable." },
      },
      {
        "@type": "Question",
        "name": "Définition de la vélocité en agile",
        "acceptedAnswer": { "@type": "Answer", "text": "La vélocité est le nombre de story points complétés par sprint en moyenne. Après 3 à 5 sprints, elle se stabilise et devient un outil fiable pour la planification de release et engagement de sprint." },
      },
      {
        "@type": "Question",
        "name": "Faut-il estimer les bugs et la dette technique ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui. Si un bug demande un effort significatif, estimez-le. Le compter dans la vélocité évite une vélocité gonflée qui trompe la planification." },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/a-propos" class="back-link">← À propos</a>

    <h1>Estimation agile : guide complet</h1>

    <p>
      L'estimation agile est souvent mal comprise. Certaines équipes la sur-ingénièrent avec
      des tableaux complexes, d'autres la rejettent comme inexacte. Ce guide explique les
      principes, les outils et les erreurs courantes.
    </p>

    <h2>Pourquoi estimer ?</h2>
    <p>
      L'estimation ne sert pas à prédire l'avenir. Elle sert à
      <strong>révéler ce que l'équipe ne sait pas encore</strong>. Une bonne session
      d'estimation fait apparaître la complexité cachée, les hypothèses implicites et les
      dépendances non résolues — avant d'écrire la moindre ligne de code.
    </p>
    <p>
      Le chiffre produit est moins précieux que la conversation qui l'a généré.
    </p>

    <h2>Story points vs. heures : la différence clé</h2>
    <p>
      Les <strong>heures</strong> mesurent le temps — qui varie selon le développeur, le jour
      et le contexte. Un senior finit une tâche en 2 heures ; un junior en 8. Ni l'un ni
      l'autre n'a tort ; ils mesurent simplement des choses différentes.
    </p>
    <p>
      Les <strong>story points</strong> mesurent la <em>complexité relative</em> dans
      l'expérience partagée de l'équipe. Une story à 5 points est environ deux fois plus
      complexe qu'une story à 3 points, peu importe qui la réalise. Cette abstraction rend
      la vélocité stable et comparable d'un sprint à l'autre.
    </p>

    <h2>Comment fonctionne la vélocité</h2>
    <p>
      La vélocité est le nombre de story points qu'une équipe complète par sprint en moyenne.
      Elle se calcule en fin de sprint en additionnant les points des stories terminées (pas
      commencées, pas à moitié faites — uniquement done-done).
    </p>
    <p>
      Après 3 à 5 sprints, la vélocité se stabilise. On peut ensuite l'utiliser pour :
    </p>
    <ul>
      <li>Prévoir en combien de sprints une release sera livrée.</li>
      <li>Définir un engagement de sprint soutenable.</li>
      <li>Détecter les changements de capacité (nouveau membre, congés, astreintes).</li>
    </ul>

    <h2>Les erreurs d'estimation les plus courantes</h2>
    <table>
      <thead>
        <tr><th>Erreur</th><th>Pourquoi ça nuit</th><th>Correction</th></tr>
      </thead>
      <tbody>
        <tr><td>Estimer en heures</td><td>Ancre sur la vitesse individuelle, pas la complexité</td><td>Passer aux story points relatifs</td></tr>
        <tr><td>S'ancrer sur le premier vote révélé</td><td>Tue l'estimation indépendante</td><td>Révéler toujours simultanément</td></tr>
        <tr><td>Forcer le consensus sur les outliers</td><td>Supprime des signaux de risque valides</td><td>Demander aux outliers d'expliquer, puis revoter</td></tr>
        <tr><td>Ignorer les bugs dans l'estimation</td><td>Gonfle la vélocité, trompe la planification</td><td>Estimer les bugs qui demandent un effort réel</td></tr>
        <tr><td>Comparer les vélocités entre équipes</td><td>Échelles et contextes différents</td><td>La vélocité est un outil interne uniquement</td></tr>
      </tbody>
    </table>

    <h2>Questions fréquentes</h2>

    <details>
      <summary>Quelle est la différence entre story points et heures ?</summary>
      <p>
        Les story points mesurent la complexité relative, pas le temps. Une story à 5 points
        est environ deux fois plus complexe qu'une story à 3 points, indépendamment de qui la
        réalise. Les heures varient ; la complexité relative est stable.
      </p>
    </details>

    <details>
      <summary>Qu'est-ce que la vélocité en agile ?</summary>
      <p>
        La vélocité est le nombre de story points complétés par sprint en moyenne. Après 3 à 5
        sprints, elle se stabilise et devient un outil fiable pour la planification de release
        et l'engagement de sprint.
      </p>
    </details>

    <details>
      <summary>Faut-il estimer les bugs et la dette technique ?</summary>
      <p>
        Oui. Si un bug demande un effort significatif, estimez-le. Si du travail de dette
        technique est planifié dans un sprint, estimez-le et comptez-le dans la vélocité.
        L'ignorer produit une vélocité gonflée qui trompe la planification.
      </p>
    </details>

    <details>
      <summary>Combien de sprints faut-il pour que la vélocité se stabilise ?</summary>
      <p>
        En général 3 à 5 sprints. Le premier sprint est souvent plus bas, car l'équipe calibre
        son estimation. À partir du 4e ou 5e sprint, la moyenne est suffisamment fiable pour
        prévoir les dates de release.
      </p>
    </details>

    <div class="cta">
      <a href="/fr" class="btn">Lancer une session avec CleanPoker →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/fr/a-propos">À propos</a>
      | <a href="/fr/mentions-legales">Mentions légales</a>
    </p>
  </footer>
</div>

<style>
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p, li { line-height: 1.7; }
  ul { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 0.5rem 0; }
  th, td { padding: 0.5rem 0.75rem; border: 1px solid var(--color-border); text-align: left; }
  th { background: var(--color-surface); font-weight: 700; }
  tr:nth-child(even) td { background: var(--color-surface); }
  details { border: 1px solid var(--color-border); border-radius: var(--radius); padding: 0.75rem 1rem; margin-bottom: 0.5rem; }
  details[open] { background: var(--color-surface); }
  summary { font-weight: 600; cursor: pointer; font-size: 0.95rem; }
  details p { margin: 0.75rem 0 0; font-size: 0.9rem; }
  .cta { margin-top: 2.5rem; text-align: center; }
  .btn { display: inline-block; padding: 0.875rem 2rem; background: var(--color-primary); color: #fff; border-radius: var(--radius-lg); text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.15s; }
  .btn:hover { opacity: 0.85; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
