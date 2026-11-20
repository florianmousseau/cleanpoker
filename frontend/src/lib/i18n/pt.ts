import type { Translation } from "#lib/i18n.ts";

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
    copy: 'Copiar o resultado',
    credit: 'Estimado com PokerAgile: https://pokeragile.com',
    creditOption: 'Adicionar a linha do PokerAgile aos resultados copiados',
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
};
