export const FR = {
  salleLabel: 'Salle',
  tourLabel: 'Tour',
  copyLink: 'Copier le lien',
  copied: 'Copié !',

  kicked: {
    title: 'Vous avez été expulsé',
    back: "Retour à l'accueil",
  },

  join: {
    title: 'Rejoindre la salle',
    label: 'Ton prénom ou pseudo',
    observer: "Rejoindre en tant qu'observateur",
    btn: 'Rejoindre',
  },

  connection: {
    lost: 'Connexion perdue.',
    closed: 'Connexion interrompue.',
    reconnect: 'Reconnecter',
    connecting: 'Connexion…',
    reconnecting: 'Reconnexion…',
  },

  solo: {
    hint: 'Tu es seul·e dans cette salle.',
    invite: 'Inviter des coéquipiers →',
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
    clear: 'Nouveau tour',
    newRound: 'Nouveau tour',
    reveal: 'Révéler',
    pending: (n: number) => `${n} participant(s) n'ont pas encore voté.`,
  },

  results: {
    title: 'Résultats',
    avg: 'Moyenne',
    min: 'Min',
    max: 'Max',
    none: "Les résultats s'afficheront après la révélation.",
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
    toObserver: '→ Observateur',
    toObserverLabel: (n: string) => `Passer ${n} en observateur`,
    kick: 'Expulser',
    kickLabel: (n: string) => `Expulser ${n}`,
  },

  observers: {
    title: 'Observateurs',
    toParticipant: '→ Participant',
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
  },
};

export const EN: typeof FR = {
  salleLabel: 'Room',
  tourLabel: 'Round',
  copyLink: 'Copy link',
  copied: 'Copied!',

  kicked: {
    title: 'You have been removed',
    back: 'Back to home',
  },

  join: {
    title: 'Join the room',
    label: 'Your first name or username',
    observer: 'Join as observer',
    btn: 'Join',
  },

  connection: {
    lost: 'Connection lost.',
    closed: 'Connection closed.',
    reconnect: 'Reconnect',
    connecting: 'Connecting…',
    reconnecting: 'Reconnecting…',
  },

  solo: {
    hint: 'You are alone in this room.',
    invite: 'Invite teammates →',
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
    clear: 'New round',
    newRound: 'New round',
    reveal: 'Reveal',
    pending: (n: number) => `${n} participant(s) haven't voted yet.`,
  },

  results: {
    title: 'Results',
    avg: 'Average',
    min: 'Min',
    max: 'Max',
    none: 'Results will appear after the reveal.',
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
    toObserver: '→ Observer',
    toObserverLabel: (n: string) => `Switch ${n} to observer`,
    kick: 'Remove',
    kickLabel: (n: string) => `Remove ${n}`,
  },

  observers: {
    title: 'Observers',
    toParticipant: '→ Participant',
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
  },
};

export const ES: typeof FR = {
  salleLabel: 'Sala',
  tourLabel: 'Ronda',
  copyLink: 'Copiar enlace',
  copied: '¡Copiado!',

  kicked: {
    title: 'Has sido expulsado',
    back: 'Volver al inicio',
  },

  join: {
    title: 'Unirse a la sala',
    label: 'Tu nombre o apodo',
    observer: 'Unirse como observador',
    btn: 'Unirse',
  },

  connection: {
    lost: 'Conexión perdida.',
    closed: 'Conexión interrumpida.',
    reconnect: 'Reconectar',
    connecting: 'Conectando…',
    reconnecting: 'Reconectando…',
  },

  solo: {
    hint: 'Estás solo en esta sala.',
    invite: 'Invitar al equipo →',
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
    clear: 'Nueva ronda',
    newRound: 'Nueva ronda',
    reveal: 'Revelar',
    pending: (n: number) => `${n} participante(s) aún no han votado.`,
  },

  results: {
    title: 'Resultados',
    avg: 'Media',
    min: 'Mín',
    max: 'Máx',
    none: 'Los resultados aparecerán tras la revelación.',
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
    toObserver: '→ Observador',
    toObserverLabel: (n: string) => `Cambiar ${n} a observador`,
    kick: 'Expulsar',
    kickLabel: (n: string) => `Expulsar a ${n}`,
  },

  observers: {
    title: 'Observadores',
    toParticipant: '→ Participante',
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
  },
};

export const DE: typeof FR = {
  salleLabel: 'Raum',
  tourLabel: 'Runde',
  copyLink: 'Link kopieren',
  copied: 'Kopiert!',

  kicked: {
    title: 'Du wurdest entfernt',
    back: 'Zurück zur Startseite',
  },

  join: {
    title: 'Dem Raum beitreten',
    label: 'Dein Name oder Spitzname',
    observer: 'Als Beobachter beitreten',
    btn: 'Beitreten',
  },

  connection: {
    lost: 'Verbindung verloren.',
    closed: 'Verbindung unterbrochen.',
    reconnect: 'Neu verbinden',
    connecting: 'Verbinde…',
    reconnecting: 'Verbinde neu…',
  },

  solo: {
    hint: 'Du bist allein in diesem Raum.',
    invite: 'Team einladen →',
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
    clear: 'Neue Runde',
    newRound: 'Neue Runde',
    reveal: 'Aufdecken',
    pending: (n: number) => `${n} Teilnehmer ${n === 1 ? 'hat' : 'haben'} noch nicht abgestimmt.`,
  },

  results: {
    title: 'Ergebnisse',
    avg: 'Durchschn.',
    min: 'Min',
    max: 'Max',
    none: 'Ergebnisse erscheinen nach der Aufdeckung.',
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
    toObserver: '→ Beobachter',
    toObserverLabel: (n: string) => `${n} zum Beobachter machen`,
    kick: 'Entfernen',
    kickLabel: (n: string) => `${n} entfernen`,
  },

  observers: {
    title: 'Beobachter',
    toParticipant: '→ Teilnehmer',
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
  },
};

export const PT: typeof FR = {
  salleLabel: 'Sala',
  tourLabel: 'Rodada',
  copyLink: 'Copiar link',
  copied: 'Copiado!',

  kicked: {
    title: 'Você foi removido',
    back: 'Voltar ao início',
  },

  join: {
    title: 'Entrar na sala',
    label: 'Seu nome ou apelido',
    observer: 'Entrar como observador',
    btn: 'Entrar',
  },

  connection: {
    lost: 'Conexão perdida.',
    closed: 'Conexão interrompida.',
    reconnect: 'Reconectar',
    connecting: 'Conectando…',
    reconnecting: 'Reconectando…',
  },

  solo: {
    hint: 'Você está sozinho nesta sala.',
    invite: 'Convidar a equipe →',
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
    clear: 'Nova rodada',
    newRound: 'Nova rodada',
    reveal: 'Revelar',
    pending: (n: number) => `${n} participante(s) ainda não votaram.`,
  },

  results: {
    title: 'Resultados',
    avg: 'Média',
    min: 'Mín',
    max: 'Máx',
    none: 'Os resultados aparecerão após a revelação.',
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
    toObserver: '→ Observador',
    toObserverLabel: (n: string) => `Mudar ${n} para observador`,
    kick: 'Remover',
    kickLabel: (n: string) => `Remover ${n}`,
  },

  observers: {
    title: 'Observadores',
    toParticipant: '→ Participante',
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
  },
};

export function translateActivity(
  msg: string,
  target: string,
  t: typeof FR,
): string {
  switch (msg) {
    case 'joined':           return t.activity.joined;
    case 'joined_observer':  return t.activity.joined_observer;
    case 'left':             return t.activity.left;
    case 'voted':            return t.activity.voted;
    case 'unvoted':          return t.activity.unvoted;
    case 'revealed':         return t.activity.revealed;
    case 'new_round':        return t.activity.new_round;
    case 'kicked':           return t.activity.kicked(target);
    case 'to_observer':      return t.activity.to_observer(target);
    case 'to_participant':   return t.activity.to_participant(target);
    default:                 return msg;
  }
}
