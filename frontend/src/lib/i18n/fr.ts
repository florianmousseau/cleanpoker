import type { Translation } from "#lib/i18n.ts";

export const FR: Translation = {
  homeLabel: 'PokerAgile, accueil',
  salleLabel: 'Salle',
  tourLabel: 'Tour',
  copyLink: 'Copier le lien',
  copied: 'Copié\u00A0!',
  copyFailed: "Ton navigateur a refusé la copie. Copie l'adresse depuis la barre du navigateur.",

  kicked: {
    title: 'Tu as été expulsé',
    back: "Retour à l'accueil",
  },

  join: {
    title: 'Rejoindre la salle',
    label: 'Ton prénom ou pseudo',
    placeholder: 'ex. Amandine',
    observer: "Rejoindre en tant qu'observateur",
    btn: 'Rejoindre',
  },

  connection: {
    connecting: 'Connexion...',
    reconnecting: 'Reconnexion...',
  },

  solo: {
    hint: 'Tu es seul(e) dans cette salle.',
    invite: 'Inviter des collègues',
  },

  share: {
    ogTitle: 'Planning poker, sans compte ni traceur',
    ogDesc: "Rejoins la session d'estimation. Aucun compte à créer, aucun suivi comportemental, aucune publicité.",
    inviteMessage: (url: string) => `Estimation en planning poker, on vote ici\u00A0: ${url}\nAucun compte à créer.`,
  },

  promo: {
    lead: 'Pour ta prochaine estimation, ouvre ta propre salle\u00A0: le lien suffit à inviter ton équipe.',
    cta: 'Créer ta propre salle',
    close: 'Fermer',
  },

  cards: {
    title: 'Cartes',
    revealedSub: 'Votes révélés. Lance un nouveau tour pour continuer.',
    votingHint: 'Clique sur une carte pour voter',
    selectedSuffix: (v: string) => `, ${v} sélectionné, reclique pour annuler`,
    voteLabel: (c: string) => `Voter ${c}`,
  },

  controls: {
    title: 'Tour en cours',
    newRound: 'Nouveau tour',
    reveal: 'Révéler',
    voted: (n: number, total: number) => `${n} sur ${total} ${n > 1 ? 'ont' : 'a'} voté`,
  },

  results: {
    title: 'Résultats',
    agreement: (n: number) => `Accord ${n}\u00A0%`,
    avg: 'Moyenne',
    median: 'Médiane',
    min: 'Min',
    max: 'Max',
    none: "Les résultats s'afficheront après la révélation.",
    copy: 'Copier le résultat',
    credit: 'Estimé avec PokerAgile\u00A0: https://pokeragile.com',
  },

  stories: {
    onTable: 'Story en cours\u00A0:',
    colStory: 'Story',
    colEstimate: 'Estimation',
    keep: (v: string) => `Retenir ${v}`,
    keepTitle: 'Estimation retenue',
    next: 'Story suivante',
    copied: 'Copié',
  },
  options: 'Options',
  host: {
    badge: 'hôte',
    ai: 'IA',
    lockedHint: "Salle verrouillée, seul l'hôte mène le tour.",
    timerLeft: (s: string) => `Temps restant ${s}`,
    timerOver: 'Temps écoulé',
  },

  participants: {
    title: 'Participants',
    none: 'Aucun participant.',
    colStatus: 'Statut vote',
    colName: 'Nom',
    colVote: 'Vote',
    colRole: 'Rôle',
    colAction: 'Action',
    me: '(moi)',
    votedSr: ', a voté',
    votePending: 'voté',
    toObserver: 'Passer en observateur',
    toObserverLabel: (n: string) => `Passer ${n} en observateur`,
    kick: 'Expulser',
    kickLabel: (n: string) => `Expulser ${n}`,
    kickConfirm: (n: string) => `Expulser ${n}\u00A0?`,
  },

  observers: {
    title: 'Observateurs',
    toParticipant: 'Passer en participant',
    toParticipantLabel: (n: string) => `Passer ${n} en participant`,
  },

  live: {
    newRound: (n: number) => `Tour ${n}. Nouveau vote.`,
    revealed: 'Votes révélés.',
  },

  footer: {
    source: 'Code source',
    license: 'Licence MIT',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    about: 'À propos',
    navAriaLabel: 'Langue',
  },
};
