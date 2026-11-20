export interface Translation {
  salleLabel: string;
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
  controls: { title: string; newRound: string; reveal: string; pending: (n: number) => string };
  results: { title: string; avg: string; median: string; min: string; max: string; none: string };
  host: { badge: string; lock: string; unlock: string; lockedHint: string; timer: string; timerStop: string; timerLeft: (s: string) => string; timerOver: string; seconds: (n: number) => string };
  participants: { title: string; none: string; colStatus: string; colName: string; colVote: string; colRole: string; colAction: string; me: string; votedSr: string; votePending: string; toObserver: string; toObserverLabel: (n: string) => string; kick: string; kickLabel: (n: string) => string; kickConfirm: (n: string) => string };
  observers: { title: string; toParticipant: string; toParticipantLabel: (n: string) => string };
  activity: { title: string; none: string; colTime: string; colAuthor: string; colAction: string; joined: string; joined_observer: string; left: string; voted: string; unvoted: string; revealed: string; new_round: string; locked: string; unlocked: string; timer_started: string; timer_stopped: string; kicked: (t: string) => string; to_observer: (t: string) => string; to_participant: (t: string) => string };
  live: { newRound: (n: number) => string; revealed: string };
  footer: { source: string; license: string; legal: string; privacy: string; about: string; navAriaLabel: string };
  theme: { toDark: string; toLight: string };
}

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
    invite: 'Inviter des coéquipiers',
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
    pending: (n: number) => `${n} participant(s) n'ont pas encore voté.`,
  },

  results: {
    title: 'Résultats',
    avg: 'Moyenne',
    median: 'Médiane',
    min: 'Min',
    max: 'Max',
    none: "Les résultats s'afficheront après la révélation.",
  },

  host: {
    badge: 'hôte',
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
    pending: (n: number) => `${n} participant(s) haven't voted yet.`,
  },

  results: {
    title: 'Results',
    avg: 'Average',
    median: 'Median',
    min: 'Min',
    max: 'Max',
    none: 'Results will appear after the reveal.',
  },

  host: {
    badge: 'host',
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
    pending: (n: number) => `${n} participante(s) aún no han votado.`,
  },

  results: {
    title: 'Resultados',
    avg: 'Media',
    median: 'Mediana',
    min: 'Mín',
    max: 'Máx',
    none: 'Los resultados aparecerán tras la revelación.',
  },

  host: {
    badge: 'anfitrión',
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
    pending: (n: number) => `${n} Teilnehmer ${n === 1 ? 'hat' : 'haben'} noch nicht abgestimmt.`,
  },

  results: {
    title: 'Ergebnisse',
    avg: 'Durchschn.',
    median: 'Median',
    min: 'Min',
    max: 'Max',
    none: 'Ergebnisse erscheinen nach der Aufdeckung.',
  },

  host: {
    badge: 'Host',
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
    pending: (n: number) => `${n} participante(s) ainda não votaram.`,
  },

  results: {
    title: 'Resultados',
    avg: 'Média',
    median: 'Mediana',
    min: 'Mín',
    max: 'Máx',
    none: 'Os resultados aparecerão após a revelação.',
  },

  host: {
    badge: 'anfitrião',
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
