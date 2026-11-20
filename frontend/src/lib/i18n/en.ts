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
  },

  results: {
    title: 'Results',
    agreement: (n: number) => `Agreement ${n}%`,
    avg: 'Average',
    median: 'Median',
    min: 'Min',
    max: 'Max',
    none: 'Results will appear after the reveal.',
    copy: 'Copy the result',
    credit: 'Estimated with PokerAgile: https://pokeragile.com',
  },

  stories: {
    onTable: 'Story on the table:',
    colStory: 'Story',
    colEstimate: 'Estimate',
    keep: (v: string) => `Keep ${v}`,
    keepTitle: 'Estimate kept',
    next: 'Next story',
    copied: 'Copied',
  },
  options: 'Options',
  host: {
    badge: 'host',
    ai: 'AI',
    lockedHint: 'Room locked, only the host runs the round.',
    timerLeft: (s: string) => `Time left ${s}`,
    timerOver: "Time's up",
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
