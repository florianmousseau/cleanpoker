import type { Translation } from "#lib/i18n.ts";

export const ES: Translation = {
  homeLabel: 'PokerAgile, inicio',
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
    voted: (n: number, total: number) => `${n} de ${total} ${n === 1 ? 'ha' : 'han'} votado`,
  },

  results: {
    title: 'Resultados',
    agreement: (n: number) => `Acuerdo ${n} %`,
    avg: 'Media',
    median: 'Mediana',
    min: 'Mín',
    max: 'Máx',
    none: 'Los resultados aparecerán tras la revelación.',
    copy: 'Copiar el resultado',
    credit: 'Estimado con PokerAgile: https://pokeragile.com',
  },

  stories: {
    onTable: 'Historia en curso:',
    colStory: 'Historia',
    colEstimate: 'Estimación',
    keep: (v: string) => `Quedarse con ${v}`,
    keepTitle: 'Estimación elegida',
    next: 'Siguiente historia',
    copied: 'Copiado',
  },
  options: 'Opciones',
  host: {
    badge: 'anfitrión',
    ai: 'IA',
    lockedHint: 'Sala bloqueada, solo el anfitrión dirige la ronda.',
    timerLeft: (s: string) => `Tiempo restante ${s}`,
    timerOver: 'Tiempo agotado',
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
};
