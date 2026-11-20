export interface Translation {
  salleLabel: string;
  homeLabel: string;
  tourLabel: string;
  copyLink: string;
  copied: string;
  copyFailed: string;
  kicked: { title: string; back: string };
  join: { title: string; label: string; placeholder: string; observer: string; btn: string };
  connection: { connecting: string; reconnecting: string };
  solo: { hint: string; invite: string };
  share: { ogTitle: string; ogDesc: string; inviteMessage: (url: string) => string };
  promo: { lead: string; cta: string; close: string };
  cards: { title: string; revealedSub: string; votingHint: string; selectedSuffix: (v: string) => string; voteLabel: (c: string) => string };
  controls: { title: string; newRound: string; reveal: string; voted: (n: number, total: number) => string; autoReveal: string };
  results: { title: string; agreement: (n: number) => string; avg: string; median: string; min: string; max: string; none: string };
  stories: { title: string; onTable: string; none: string; addLabel: string; addPlaceholder: string; addBtn: string; clear: string; clearConfirm: string; colStory: string; colEstimate: string; vote: (t: string) => string; keep: (v: string) => string; keepTitle: string; next: string; copyMd: string; downloadCsv: string; copied: string };
  qr: { show: string; hide: string; alt: string; failed: string };
  ia: { button: string; again: string; running: string; downloading: (n: number) => string; failed: string; private: string; invite: string; inviteHelp: string; prompt: (room: string, mcp: string) => string };
  options: string;
  team: { summary: string; name: string; color: string };
  host: { badge: string; ai: string; lock: string; unlock: string; lockedHint: string; timer: string; timerStop: string; timerLeft: (s: string) => string; timerOver: string; seconds: (n: number) => string };
  participants: { title: string; none: string; colStatus: string; colName: string; colVote: string; colRole: string; colAction: string; me: string; votedSr: string; votePending: string; toObserver: string; toObserverLabel: (n: string) => string; kick: string; kickLabel: (n: string) => string; kickConfirm: (n: string) => string };
  observers: { title: string; toParticipant: string; toParticipantLabel: (n: string) => string };
  activity: { title: string; none: string; colTime: string; colAuthor: string; colAction: string; joined: string; joined_observer: string; left: string; voted: string; unvoted: string; revealed: string; new_round: string; stories_added: string; stories_cleared: string; story_selected: (t: string) => string; estimated: (t: string) => string; locked: string; unlocked: string; timer_started: string; timer_stopped: string; kicked: (t: string) => string; to_observer: (t: string) => string; to_participant: (t: string) => string };
  live: { newRound: (n: number) => string; revealed: string };
  footer: { source: string; license: string; legal: string; privacy: string; about: string; navAriaLabel: string };
  theme: { toDark: string; toLight: string };
}

export const FR: Translation = {
  salleLabel: 'Salle',
  homeLabel: 'PokerAgile, accueil',
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
  team: {
    summary: "Habiller la salle aux couleurs de l'équipe",
    name: "Nom de l'équipe",
    color: 'Couleur',
  },
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
  theme: { toDark: 'Passer en mode sombre', toLight: 'Passer en mode clair' },
};

export const EN: Translation = {
  salleLabel: 'Room',
  homeLabel: 'PokerAgile, home',
  tourLabel: 'Round',
  copyLink: 'Copy link',
  copied: 'Copied!',
  copyFailed: 'Your browser refused the copy. Copy the address from the browser bar.',

  kicked: {
    title: 'You have been removed',
    back: 'Back to home',
  },

  join: {
    title: 'Join the room',
    label: 'Your first name or username',
    placeholder: 'e.g. Alex',
    observer: 'Join as observer',
    btn: 'Join',
  },

  connection: {
    connecting: 'Connecting...',
    reconnecting: 'Reconnecting...',
  },

  solo: {
    hint: 'You are alone in this room.',
    invite: 'Invite teammates',
  },

  share: {
    ogTitle: 'Planning poker, no account, no behavioural tracking',
    ogDesc: 'Join the estimation session. No account to create, no behavioural tracking, no ads.',
    inviteMessage: (url: string) => `Planning poker estimation, we vote here: ${url}\nNo account needed.`,
  },

  promo: {
    lead: 'For your next estimate, open your own room: the link is all your team needs to join.',
    cta: 'Create your own room',
    close: 'Close',
  },

  cards: {
    title: 'Cards',
    revealedSub: 'Votes revealed. Start a new round to continue.',
    votingHint: 'Click a card to vote',
    selectedSuffix: (v: string) => `, ${v} selected, click again to deselect`,
    voteLabel: (c: string) => `Vote ${c}`,
  },

  controls: {
    title: 'Current round',
    newRound: 'New round',
    reveal: 'Reveal',
    voted: (n: number, total: number) => `${n} of ${total} ${n === 1 ? 'has' : 'have'} voted`,
    autoReveal: 'Reveal as soon as everyone has voted',
  },

  results: {
    title: 'Results',
    agreement: (n: number) => `Agreement ${n}%`,
    avg: 'Average',
    median: 'Median',
    min: 'Min',
    max: 'Max',
    none: 'Results will appear after the reveal.',
  },

  stories: {
    title: 'Stories',
    onTable: 'Story on the table:',
    none: 'No story yet. Paste a list to estimate them one after the other.',
    addLabel: 'Add stories, one per line',
    addPlaceholder: 'Login page\nCSV export of invoices',
    addBtn: 'Add',
    clear: 'Clear the list',
    clearConfirm: 'Clear the story list and its estimates?',
    colStory: 'Story',
    colEstimate: 'Estimate',
    vote: (t: string) => `Estimate “${t}”`,
    keep: (v: string) => `Keep ${v}`,
    keepTitle: 'Estimate kept',
    next: 'Next story',
    copyMd: 'Copy as Markdown',
    downloadCsv: 'Download as CSV',
    copied: 'Copied',
  },
  qr: {
    show: 'QR code',
    hide: 'Hide QR code',
    alt: 'QR code of the room address',
    failed: 'The QR code could not be loaded.',
  },
  ia: {
    button: "Analyze the story with the browser's AI",
    again: 'Run the analysis again',
    running: 'Analyzing',
    downloading: (n: number) => `The browser is downloading its model, ${n}%`,
    failed: 'The analysis did not complete.',
    private: 'Only you see this. The analysis runs in the browser, on this computer.',
    invite: 'Invite your AI',
    inviteHelp: 'Copies a prompt to paste into your AI assistant.',
    prompt: (room: string, mcp: string) => `Join my planning poker room ${room} through the MCP server ${mcp} (tools: join_room, get_room, add_stories, vote, get_estimates, leave_room). Read the story on the table, vote with one card from the deck and give your reason in one sentence. Do not reveal your card in the chat.`,
  },
  options: 'Options',
  team: {
    summary: "Dress the room in the team's colours",
    name: 'Team name',
    color: 'Colour',
  },
  host: {
    badge: 'host',
    ai: 'AI',
    lock: 'Lock room',
    unlock: 'Unlock room',
    lockedHint: 'Room locked, only the host runs the round.',
    timer: 'Timer',
    timerStop: 'Stop',
    timerLeft: (s: string) => `Time left ${s}`,
    timerOver: "Time's up",
    seconds: (n: number) => (n < 60 ? `${n}\u00A0s` : `${n / 60}\u00A0min`),
  },

  participants: {
    title: 'Participants',
    none: 'No participants.',
    colStatus: 'Vote status',
    colName: 'Name',
    colVote: 'Vote',
    colRole: 'Role',
    colAction: 'Action',
    me: '(me)',
    votedSr: ', voted',
    votePending: 'voted',
    toObserver: 'Switch to observer',
    toObserverLabel: (n: string) => `Switch ${n} to observer`,
    kick: 'Remove',
    kickLabel: (n: string) => `Remove ${n}`,
    kickConfirm: (n: string) => `Remove ${n}?`,
  },

  observers: {
    title: 'Observers',
    toParticipant: 'Switch to participant',
    toParticipantLabel: (n: string) => `Switch ${n} to participant`,
  },

  activity: {
    title: 'Activity',
    none: 'No activity yet.',
    colTime: 'Time',
    colAuthor: 'Participant',
    colAction: 'Action',
    joined: 'joined the session.',
    joined_observer: 'joined as observer.',
    left: 'left the session.',
    voted: 'voted.',
    unvoted: 'removed their vote.',
    revealed: 'revealed the votes.',
    new_round: 'started a new round.',
    stories_added: 'added stories.',
    stories_cleared: 'cleared the story list.',
    story_selected: (t: string) => `moved to “${t}”.`,
    estimated: (t: string) => `kept the estimate of “${t}”.`,
    locked: 'locked the room.',
    unlocked: 'unlocked the room.',
    timer_started: 'started the timer.',
    timer_stopped: 'stopped the timer.',
    kicked: (t: string) => `removed ${t}.`,
    to_observer: (t: string) => `switched ${t} to observer.`,
    to_participant: (t: string) => `switched ${t} to participant.`,
  },

  live: {
    newRound: (n: number) => `Round ${n}. New vote.`,
    revealed: 'Votes revealed.',
  },

  footer: {
    source: 'Source code',
    license: 'MIT License',
    legal: 'Legal notice',
    privacy: 'Privacy',
    about: 'About',
    navAriaLabel: 'Language',
  },
  theme: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
};

export const ES: Translation = {
  salleLabel: 'Sala',
  homeLabel: 'PokerAgile, inicio',
  tourLabel: 'Ronda',
  copyLink: 'Copiar enlace',
  copied: '¡Copiado!',
  copyFailed: 'Tu navegador ha rechazado la copia. Copia la dirección desde la barra del navegador.',

  kicked: {
    title: 'Has sido expulsado',
    back: 'Volver al inicio',
  },

  join: {
    title: 'Unirse a la sala',
    label: 'Tu nombre o apodo',
    placeholder: 'p. ej. Lucía',
    observer: 'Unirse como observador',
    btn: 'Unirse',
  },

  connection: {
    connecting: 'Conectando...',
    reconnecting: 'Reconectando...',
  },

  solo: {
    hint: 'Estás solo en esta sala.',
    invite: 'Invitar al equipo',
  },

  share: {
    ogTitle: 'Planning poker, sin cuenta ni seguimiento comportamental',
    ogDesc: 'Únete a la sesión de estimación. Nadie necesita una cuenta.',
    inviteMessage: (url: string) => `Estimación en planning poker, votamos aquí: ${url}\nSin cuenta.`,
  },

  promo: {
    lead: 'Para tu próxima estimación, abre tu propia sala: basta el enlace para invitar a tu equipo.',
    cta: 'Crea tu propia sala',
    close: 'Cerrar',
  },

  cards: {
    title: 'Cartas',
    revealedSub: 'Votos revelados. Inicia una nueva ronda para continuar.',
    votingHint: 'Haz clic en una carta para votar',
    selectedSuffix: (v: string) => `, ${v} seleccionado, vuelve a hacer clic para cancelar`,
    voteLabel: (c: string) => `Votar ${c}`,
  },

  controls: {
    title: 'Ronda actual',
    newRound: 'Nueva ronda',
    reveal: 'Revelar',
    voted: (n: number, total: number) => `${n} de ${total} ${n === 1 ? 'ha' : 'han'} votado`,
    autoReveal: 'Revelar en cuanto todos hayan votado',
  },

  results: {
    title: 'Resultados',
    agreement: (n: number) => `Acuerdo ${n} %`,
    avg: 'Media',
    median: 'Mediana',
    min: 'Mín',
    max: 'Máx',
    none: 'Los resultados aparecerán tras la revelación.',
  },

  stories: {
    title: 'Historias',
    onTable: 'Historia en curso:',
    none: 'Ninguna historia. Pega una lista para estimarlas una tras otra.',
    addLabel: 'Añadir historias, una por línea',
    addPlaceholder: 'Página de inicio de sesión\nExportación CSV de facturas',
    addBtn: 'Añadir',
    clear: 'Vaciar la lista',
    clearConfirm: '¿Vaciar la lista de historias y sus estimaciones?',
    colStory: 'Historia',
    colEstimate: 'Estimación',
    vote: (t: string) => `Estimar «${t}»`,
    keep: (v: string) => `Quedarse con ${v}`,
    keepTitle: 'Estimación elegida',
    next: 'Siguiente historia',
    copyMd: 'Copiar en Markdown',
    downloadCsv: 'Descargar en CSV',
    copied: 'Copiado',
  },
  qr: {
    show: 'Código QR',
    hide: 'Ocultar el código QR',
    alt: 'Código QR de la dirección de la sala',
    failed: 'No se pudo cargar el código QR.',
  },
  ia: {
    button: 'Analizar la historia con la IA del navegador',
    again: 'Repetir el análisis',
    running: 'Analizando',
    downloading: (n: number) => `El navegador descarga su modelo, ${n} %`,
    failed: 'El análisis no se completó.',
    private: 'Solo usted lo ve. El análisis se hace en el navegador, en este ordenador.',
    invite: 'Invitar a tu IA',
    inviteHelp: 'Copia una instrucción para pegar en tu asistente de IA.',
    prompt: (room: string, mcp: string) => `Únete a mi sala de planning poker ${room} mediante el servidor MCP ${mcp} (herramientas: join_room, get_room, add_stories, vote, get_estimates, leave_room). Lee la historia que está sobre la mesa, vota con una carta de la baraja y da tu motivo en una frase. No reveles tu carta en el chat.`,
  },
  options: 'Opciones',
  team: {
    summary: 'Vestir la sala con los colores del equipo',
    name: 'Nombre del equipo',
    color: 'Color',
  },
  host: {
    badge: 'anfitrión',
    ai: 'IA',
    lock: 'Bloquear sala',
    unlock: 'Abrir sala',
    lockedHint: 'Sala bloqueada, solo el anfitrión dirige la ronda.',
    timer: 'Temporizador',
    timerStop: 'Parar',
    timerLeft: (s: string) => `Tiempo restante ${s}`,
    timerOver: 'Tiempo agotado',
    seconds: (n: number) => (n < 60 ? `${n}\u00A0s` : `${n / 60}\u00A0min`),
  },

  participants: {
    title: 'Participantes',
    none: 'Sin participantes.',
    colStatus: 'Estado del voto',
    colName: 'Nombre',
    colVote: 'Voto',
    colRole: 'Rol',
    colAction: 'Acción',
    me: '(yo)',
    votedSr: ', votó',
    votePending: 'votado',
    toObserver: 'Cambiar a observador',
    toObserverLabel: (n: string) => `Cambiar ${n} a observador`,
    kick: 'Expulsar',
    kickLabel: (n: string) => `Expulsar a ${n}`,
    kickConfirm: (n: string) => `¿Expulsar a ${n}?`,
  },

  observers: {
    title: 'Observadores',
    toParticipant: 'Cambiar a participante',
    toParticipantLabel: (n: string) => `Cambiar ${n} a participante`,
  },

  activity: {
    title: 'Actividad',
    none: 'Sin actividad aún.',
    colTime: 'Hora',
    colAuthor: 'Participante',
    colAction: 'Acción',
    joined: 'se unió a la sesión.',
    joined_observer: 'se unió como observador.',
    left: 'abandonó la sesión.',
    voted: 'votó.',
    unvoted: 'retiró su voto.',
    revealed: 'reveló los votos.',
    new_round: 'inició una nueva ronda.',
    stories_added: 'añadió historias.',
    stories_cleared: 'vació la lista de historias.',
    story_selected: (t: string) => `pasa a «${t}».`,
    estimated: (t: string) => `eligió la estimación de «${t}».`,
    locked: 'bloqueó la sala.',
    unlocked: 'abrió la sala.',
    timer_started: 'inició el temporizador.',
    timer_stopped: 'paró el temporizador.',
    kicked: (t: string) => `expulsó a ${t}.`,
    to_observer: (t: string) => `cambió a ${t} a observador.`,
    to_participant: (t: string) => `cambió a ${t} a participante.`,
  },

  live: {
    newRound: (n: number) => `Ronda ${n}. Nueva votación.`,
    revealed: 'Votos revelados.',
  },

  footer: {
    source: 'Código fuente',
    license: 'Licencia MIT',
    legal: 'Aviso legal',
    privacy: 'Privacidad',
    about: 'Acerca de',
    navAriaLabel: 'Idioma',
  },
  theme: { toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro' },
};

export const DE: Translation = {
  salleLabel: 'Raum',
  homeLabel: 'PokerAgile, Startseite',
  tourLabel: 'Runde',
  copyLink: 'Link kopieren',
  copied: 'Kopiert!',
  copyFailed: 'Dein Browser hat das Kopieren abgelehnt. Kopiere die Adresse aus der Browserleiste.',

  kicked: {
    title: 'Du wurdest entfernt',
    back: 'Zurück zur Startseite',
  },

  join: {
    title: 'Dem Raum beitreten',
    label: 'Dein Name oder Spitzname',
    placeholder: 'z. B. Lena',
    observer: 'Als Beobachter beitreten',
    btn: 'Beitreten',
  },

  connection: {
    connecting: 'Verbinde...',
    reconnecting: 'Verbinde neu...',
  },

  solo: {
    hint: 'Du bist allein in diesem Raum.',
    invite: 'Team einladen',
  },

  share: {
    ogTitle: 'Planning Poker, ohne Konto und ohne verhaltensbasiertes Tracking',
    ogDesc: 'Tritt der Schätzrunde bei. Niemand braucht ein Konto.',
    inviteMessage: (url: string) => `Planning-Poker-Schätzung, wir stimmen hier ab: ${url}\nKein Konto nötig.`,
  },

  promo: {
    lead: 'Für deine nächste Schätzung öffne deinen eigenen Raum: Der Link reicht, um dein Team einzuladen.',
    cta: 'Eigenen Raum erstellen',
    close: 'Schließen',
  },

  cards: {
    title: 'Karten',
    revealedSub: 'Stimmen aufgedeckt. Neue Runde starten um fortzufahren.',
    votingHint: 'Klicke auf eine Karte zum Abstimmen',
    selectedSuffix: (v: string) => `, ${v} ausgewählt, erneut klicken zum Abwählen`,
    voteLabel: (c: string) => `Für ${c} stimmen`,
  },

  controls: {
    title: 'Aktuelle Runde',
    newRound: 'Neue Runde',
    reveal: 'Aufdecken',
    voted: (n: number, total: number) => `${n} von ${total} ${n === 1 ? 'hat' : 'haben'} abgestimmt`,
    autoReveal: 'Aufdecken, sobald alle abgestimmt haben',
  },

  results: {
    title: 'Ergebnisse',
    agreement: (n: number) => `Einigkeit ${n} %`,
    avg: 'Durchschn.',
    median: 'Median',
    min: 'Min',
    max: 'Max',
    none: 'Ergebnisse erscheinen nach der Aufdeckung.',
  },

  stories: {
    title: 'Storys',
    onTable: 'Aktuelle Story:',
    none: 'Noch keine Story. Füge eine Liste ein, um sie nacheinander zu schätzen.',
    addLabel: 'Storys hinzufügen, eine pro Zeile',
    addPlaceholder: 'Login-Seite\nCSV-Export der Rechnungen',
    addBtn: 'Hinzufügen',
    clear: 'Liste leeren',
    clearConfirm: 'Story-Liste und Schätzungen leeren?',
    colStory: 'Story',
    colEstimate: 'Schätzung',
    vote: (t: string) => `„${t}“ schätzen`,
    keep: (v: string) => `${v} übernehmen`,
    keepTitle: 'Übernommene Schätzung',
    next: 'Nächste Story',
    copyMd: 'Als Markdown kopieren',
    downloadCsv: 'Als CSV herunterladen',
    copied: 'Kopiert',
  },
  qr: {
    show: 'QR-Code',
    hide: 'QR-Code ausblenden',
    alt: 'QR-Code der Raumadresse',
    failed: 'Der QR-Code konnte nicht geladen werden.',
  },
  ia: {
    button: 'Story mit der KI des Browsers analysieren',
    again: 'Analyse wiederholen',
    running: 'Analyse läuft',
    downloading: (n: number) => `Der Browser lädt sein Modell, ${n} %`,
    failed: 'Die Analyse wurde nicht abgeschlossen.',
    private: 'Nur Sie sehen das. Die Analyse läuft im Browser, auf diesem Computer.',
    invite: 'Deine KI einladen',
    inviteHelp: 'Kopiert einen Prompt zum Einfügen in deinen KI-Assistenten.',
    prompt: (room: string, mcp: string) => `Tritt meinem Planning-Poker-Raum ${room} über den MCP-Server ${mcp} bei (Tools: join_room, get_room, add_stories, vote, get_estimates, leave_room). Lies die Story auf dem Tisch, stimme mit einer Karte aus dem Deck ab und begründe deine Wahl in einem Satz. Verrate deine Karte nicht im Chat.`,
  },
  options: 'Optionen',
  team: {
    summary: 'Den Raum in den Farben des Teams gestalten',
    name: 'Teamname',
    color: 'Farbe',
  },
  host: {
    badge: 'Host',
    ai: 'KI',
    lock: 'Raum sperren',
    unlock: 'Raum öffnen',
    lockedHint: 'Raum gesperrt, nur der Host leitet die Runde.',
    timer: 'Timer',
    timerStop: 'Stoppen',
    timerLeft: (s: string) => `Verbleibend ${s}`,
    timerOver: 'Zeit abgelaufen',
    seconds: (n: number) => (n < 60 ? `${n}\u00A0s` : `${n / 60}\u00A0min`),
  },

  participants: {
    title: 'Teilnehmer',
    none: 'Keine Teilnehmer.',
    colStatus: 'Abstimmstatus',
    colName: 'Name',
    colVote: 'Stimme',
    colRole: 'Rolle',
    colAction: 'Aktion',
    me: '(ich)',
    votedSr: ', hat abgestimmt',
    votePending: 'abgestimmt',
    toObserver: 'Zum Beobachter machen',
    toObserverLabel: (n: string) => `${n} zum Beobachter machen`,
    kick: 'Entfernen',
    kickLabel: (n: string) => `${n} entfernen`,
    kickConfirm: (n: string) => `${n} entfernen?`,
  },

  observers: {
    title: 'Beobachter',
    toParticipant: 'Zum Teilnehmer machen',
    toParticipantLabel: (n: string) => `${n} zum Teilnehmer machen`,
  },

  activity: {
    title: 'Aktivität',
    none: 'Noch keine Aktivität.',
    colTime: 'Zeit',
    colAuthor: 'Teilnehmer',
    colAction: 'Aktion',
    joined: 'ist beigetreten.',
    joined_observer: 'ist als Beobachter beigetreten.',
    left: 'hat den Raum verlassen.',
    voted: 'hat abgestimmt.',
    unvoted: 'hat die Stimme zurückgezogen.',
    revealed: 'hat die Stimmen aufgedeckt.',
    new_round: 'hat eine neue Runde gestartet.',
    stories_added: 'hat Storys hinzugefügt.',
    stories_cleared: 'hat die Story-Liste geleert.',
    story_selected: (t: string) => `wechselt zu „${t}“.`,
    estimated: (t: string) => `hat die Schätzung von „${t}“ übernommen.`,
    locked: 'hat den Raum gesperrt.',
    unlocked: 'hat den Raum geöffnet.',
    timer_started: 'hat den Timer gestartet.',
    timer_stopped: 'hat den Timer gestoppt.',
    kicked: (t: string) => `hat ${t} entfernt.`,
    to_observer: (t: string) => `hat ${t} zum Beobachter gemacht.`,
    to_participant: (t: string) => `hat ${t} zum Teilnehmer gemacht.`,
  },

  live: {
    newRound: (n: number) => `Runde ${n}. Neue Abstimmung.`,
    revealed: 'Stimmen aufgedeckt.',
  },

  footer: {
    source: 'Quellcode',
    license: 'MIT-Lizenz',
    legal: 'Impressum',
    privacy: 'Datenschutz',
    about: 'Über uns',
    navAriaLabel: 'Sprache',
  },
  theme: { toDark: 'Zum Dunkelmodus wechseln', toLight: 'Zum Hellmodus wechseln' },
};

export const PT: Translation = {
  salleLabel: 'Sala',
  homeLabel: 'PokerAgile, início',
  tourLabel: 'Rodada',
  copyLink: 'Copiar link',
  copied: 'Copiado!',
  copyFailed: 'O teu navegador recusou a cópia. Copia o endereço da barra do navegador.',

  kicked: {
    title: 'Você foi removido',
    back: 'Voltar ao início',
  },

  join: {
    title: 'Entrar na sala',
    label: 'Seu nome ou apelido',
    placeholder: 'ex.: Ana',
    observer: 'Entrar como observador',
    btn: 'Entrar',
  },

  connection: {
    connecting: 'Conectando...',
    reconnecting: 'Reconectando...',
  },

  solo: {
    hint: 'Você está sozinho nesta sala.',
    invite: 'Convidar a equipe',
  },

  share: {
    ogTitle: 'Planning poker, sem conta e sem rastreio comportamental',
    ogDesc: 'Entre na sessão de estimativa. Ninguém precisa de conta.',
    inviteMessage: (url: string) => `Estimativa em planning poker, votamos aqui: ${url}\nSem conta.`,
  },

  promo: {
    lead: 'Para a sua próxima estimativa, abra a sua própria sala: o link basta para convidar a equipe.',
    cta: 'Crie a sua própria sala',
    close: 'Fechar',
  },

  cards: {
    title: 'Cartas',
    revealedSub: 'Votos revelados. Inicie uma nova rodada para continuar.',
    votingHint: 'Clique em uma carta para votar',
    selectedSuffix: (v: string) => `, ${v} selecionado, clique novamente para cancelar`,
    voteLabel: (c: string) => `Votar ${c}`,
  },

  controls: {
    title: 'Rodada atual',
    newRound: 'Nova rodada',
    reveal: 'Revelar',
    voted: (n: number, total: number) => `${n} de ${total} ${n === 1 ? 'votou' : 'votaram'}`,
    autoReveal: 'Revelar assim que todos votarem',
  },

  results: {
    title: 'Resultados',
    agreement: (n: number) => `Acordo ${n} %`,
    avg: 'Média',
    median: 'Mediana',
    min: 'Mín',
    max: 'Máx',
    none: 'Os resultados aparecerão após a revelação.',
  },

  stories: {
    title: 'Histórias',
    onTable: 'História em curso:',
    none: 'Nenhuma história. Cole uma lista para estimá-las uma após a outra.',
    addLabel: 'Adicionar histórias, uma por linha',
    addPlaceholder: 'Página de login\nExportação CSV de faturas',
    addBtn: 'Adicionar',
    clear: 'Esvaziar a lista',
    clearConfirm: 'Esvaziar a lista de histórias e suas estimativas?',
    colStory: 'História',
    colEstimate: 'Estimativa',
    vote: (t: string) => `Estimar «${t}»`,
    keep: (v: string) => `Ficar com ${v}`,
    keepTitle: 'Estimativa escolhida',
    next: 'Próxima história',
    copyMd: 'Copiar em Markdown',
    downloadCsv: 'Baixar em CSV',
    copied: 'Copiado',
  },
  qr: {
    show: 'QR code',
    hide: 'Ocultar o QR code',
    alt: 'QR code do endereço da sala',
    failed: 'Não foi possível carregar o QR code.',
  },
  ia: {
    button: 'Analisar a história com a IA do navegador',
    again: 'Refazer a análise',
    running: 'Analisando',
    downloading: (n: number) => `O navegador está baixando o modelo, ${n} %`,
    failed: 'A análise não terminou.',
    private: 'Só você vê isto. A análise roda no navegador, neste computador.',
    invite: 'Convidar sua IA',
    inviteHelp: 'Copia um prompt para colar no seu assistente de IA.',
    prompt: (room: string, mcp: string) => `Entre na minha sala de planning poker ${room} pelo servidor MCP ${mcp} (ferramentas: join_room, get_room, add_stories, vote, get_estimates, leave_room). Leia a história que está na mesa, vote com uma carta do baralho e dê o seu motivo em uma frase. Não revele a sua carta no chat.`,
  },
  options: 'Opções',
  team: {
    summary: 'Vestir a sala com as cores da equipe',
    name: 'Nome da equipe',
    color: 'Cor',
  },
  host: {
    badge: 'anfitrião',
    ai: 'IA',
    lock: 'Bloquear sala',
    unlock: 'Abrir sala',
    lockedHint: 'Sala bloqueada, só o anfitrião conduz a rodada.',
    timer: 'Temporizador',
    timerStop: 'Parar',
    timerLeft: (s: string) => `Tempo restante ${s}`,
    timerOver: 'Tempo esgotado',
    seconds: (n: number) => (n < 60 ? `${n}\u00A0s` : `${n / 60}\u00A0min`),
  },

  participants: {
    title: 'Participantes',
    none: 'Nenhum participante.',
    colStatus: 'Status do voto',
    colName: 'Nome',
    colVote: 'Voto',
    colRole: 'Papel',
    colAction: 'Ação',
    me: '(eu)',
    votedSr: ', votou',
    votePending: 'votado',
    toObserver: 'Mudar para observador',
    toObserverLabel: (n: string) => `Mudar ${n} para observador`,
    kick: 'Remover',
    kickLabel: (n: string) => `Remover ${n}`,
    kickConfirm: (n: string) => `Remover ${n}?`,
  },

  observers: {
    title: 'Observadores',
    toParticipant: 'Mudar para participante',
    toParticipantLabel: (n: string) => `Mudar ${n} para participante`,
  },

  activity: {
    title: 'Atividade',
    none: 'Nenhuma atividade ainda.',
    colTime: 'Hora',
    colAuthor: 'Participante',
    colAction: 'Ação',
    joined: 'entrou na sessão.',
    joined_observer: 'entrou como observador.',
    left: 'saiu da sessão.',
    voted: 'votou.',
    unvoted: 'retirou o voto.',
    revealed: 'revelou os votos.',
    new_round: 'iniciou uma nova rodada.',
    stories_added: 'adicionou histórias.',
    stories_cleared: 'esvaziou a lista de histórias.',
    story_selected: (t: string) => `passa para «${t}».`,
    estimated: (t: string) => `escolheu a estimativa de «${t}».`,
    locked: 'bloqueou a sala.',
    unlocked: 'abriu a sala.',
    timer_started: 'iniciou o temporizador.',
    timer_stopped: 'parou o temporizador.',
    kicked: (t: string) => `removeu ${t}.`,
    to_observer: (t: string) => `mudou ${t} para observador.`,
    to_participant: (t: string) => `mudou ${t} para participante.`,
  },

  live: {
    newRound: (n: number) => `Rodada ${n}. Nova votação.`,
    revealed: 'Votos revelados.',
  },

  footer: {
    source: 'Código fonte',
    license: 'Licença MIT',
    legal: 'Aviso legal',
    privacy: 'Privacidade',
    about: 'Sobre',
    navAriaLabel: 'Idioma',
  },
  theme: { toDark: 'Mudar para modo escuro', toLight: 'Mudar para modo claro' },
};

export function translateActivity(
  msg: string,
  target: string,
  t: Translation,
): string {
  switch (msg) {
    case 'joined':           return t.activity.joined;
    case 'joined_observer':  return t.activity.joined_observer;
    case 'left':             return t.activity.left;
    case 'voted':            return t.activity.voted;
    case 'unvoted':          return t.activity.unvoted;
    case 'revealed':         return t.activity.revealed;
    case 'new_round':        return t.activity.new_round;
    case 'stories_added':    return t.activity.stories_added;
    case 'stories_cleared':  return t.activity.stories_cleared;
    case 'story_selected':   return t.activity.story_selected(target);
    case 'estimated':        return t.activity.estimated(target);
    case 'locked':           return t.activity.locked;
    case 'unlocked':         return t.activity.unlocked;
    case 'timer_started':    return t.activity.timer_started;
    case 'timer_stopped':    return t.activity.timer_stopped;
    case 'kicked':           return t.activity.kicked(target);
    case 'to_observer':      return t.activity.to_observer(target);
    case 'to_participant':   return t.activity.to_participant(target);
    default:                 return msg;
  }
}
