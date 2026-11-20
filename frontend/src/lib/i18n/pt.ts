import type { Translation } from "#lib/i18n.ts";

export const PT: Translation = {
  homeLabel: 'PokerAgile, início',
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
  },

  stories: {
    onTable: 'História em curso:',
    colStory: 'História',
    colEstimate: 'Estimativa',
    keep: (v: string) => `Ficar com ${v}`,
    keepTitle: 'Estimativa escolhida',
    next: 'Próxima história',
    copied: 'Copiado',
  },
  options: 'Opções',
  host: {
    badge: 'anfitrião',
    ai: 'IA',
    lockedHint: 'Sala bloqueada, só o anfitrião conduz a rodada.',
    timerLeft: (s: string) => `Tempo restante ${s}`,
    timerOver: 'Tempo esgotado',
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
