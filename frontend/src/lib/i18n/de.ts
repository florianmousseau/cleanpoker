import type { Translation } from "#lib/i18n.ts";

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
};
