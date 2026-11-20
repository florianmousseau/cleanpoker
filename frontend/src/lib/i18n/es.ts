import type { Translation } from "#lib/i18n.ts";

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
};
