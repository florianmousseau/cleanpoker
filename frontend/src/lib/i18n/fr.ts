import type { Translation } from "#lib/i18n.ts";

export const FR: Translation = {
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
    autoReveal: 'Révéler dès que tout le monde a voté',
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
    creditOption: 'Ajouter la ligne PokerAgile aux résultats copiés',
  },

  stories: {
    title: 'Stories',
    onTable: 'Story en cours\u00A0:',
    none: "Aucune story. Collez une liste pour les estimer l'une après l'autre.",
    addLabel: 'Ajouter des stories, une par ligne',
    addPlaceholder: 'Page de connexion\nExport CSV des factures',
    addBtn: 'Ajouter',
    clear: 'Vider la liste',
    clearConfirm: 'Vider la liste des stories et leurs estimations\u00A0?',
    colStory: 'Story',
    colEstimate: 'Estimation',
    vote: (t: string) => `Estimer «\u00A0${t}\u00A0»`,
    keep: (v: string) => `Retenir ${v}`,
    keepTitle: 'Estimation retenue',
    next: 'Story suivante',
    copyMd: 'Copier en Markdown',
    downloadCsv: 'Télécharger en CSV',
    copied: 'Copié',
  },
  qr: {
    show: 'QR code',
    hide: 'Masquer le QR code',
    alt: "QR code de l'adresse de la salle",
    failed: "Le QR code n'a pas pu être chargé.",
  },
  ia: {
    button: "Analyser la story avec l'IA du navigateur",
    again: "Relancer l'analyse",
    running: 'Analyse en cours',
    downloading: (n: number) => `Le navigateur télécharge son modèle, ${n}\u00A0%`,
    failed: "L'analyse n'a pas abouti.",
    private: "Visible par vous seul. L'analyse tourne dans le navigateur, sur cet ordinateur.",
    invite: 'Inviter ton IA',
    inviteHelp: 'Copie une consigne à coller dans ton assistant IA.',
    prompt: (room: string, mcp: string) => `Rejoins ma salle de planning poker ${room} par le serveur MCP ${mcp} (outils\u00A0: join_room, get_room, add_stories, vote, get_estimates, leave_room). Lis la story sur la table, vote avec une carte du jeu et donne ta raison en une phrase. Ne révèle pas ta carte dans la conversation.`,
  },
  options: 'Options',
  host: {
    badge: 'hôte',
    ai: 'IA',
    lock: 'Verrouiller la salle',
    unlock: 'Ouvrir la salle',
    lockedHint: "Salle verrouillée, seul l'hôte mène le tour.",
    timer: 'Minuteur',
    timerStop: 'Arrêter',
    timerLeft: (s: string) => `Temps restant ${s}`,
    timerOver: 'Temps écoulé',
    seconds: (n: number) => (n < 60 ? `${n}\u00A0s` : `${n / 60}\u00A0min`),
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

  activity: {
    title: 'Activité',
    none: 'Aucune activité.',
    colTime: 'Heure',
    colAuthor: 'Participant',
    colAction: 'Action',
    joined: 'a rejoint la session.',
    joined_observer: 'a rejoint en observateur.',
    left: 'a quitté la session.',
    voted: 'a voté.',
    unvoted: 'a retiré son vote.',
    revealed: 'a révélé les votes.',
    new_round: 'a démarré un nouveau tour.',
    stories_added: 'a ajouté des stories.',
    stories_cleared: 'a vidé la liste des stories.',
    story_selected: (t: string) => `passe à «\u00A0${t}\u00A0».`,
    estimated: (t: string) => `a retenu l'estimation de «\u00A0${t}\u00A0».`,
    locked: 'a verrouillé la salle.',
    unlocked: 'a ouvert la salle.',
    timer_started: 'a lancé le minuteur.',
    timer_stopped: 'a arrêté le minuteur.',
    kicked: (t: string) => `a expulsé ${t}.`,
    to_observer: (t: string) => `a passé ${t} en observateur.`,
    to_participant: (t: string) => `a passé ${t} en participant.`,
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
