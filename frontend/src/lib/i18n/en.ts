import type { Translation } from "#lib/i18n.ts";

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
};
