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
  controls: { title: string; newRound: string; reveal: string; voted: (n: number, total: number) => string; autoReveal: string };
  results: { title: string; agreement: (n: number) => string; avg: string; median: string; min: string; max: string; none: string };
  stories: { title: string; onTable: string; none: string; addLabel: string; addPlaceholder: string; addBtn: string; clear: string; clearConfirm: string; colStory: string; colEstimate: string; vote: (t: string) => string; keep: (v: string) => string; keepTitle: string; next: string; copyMd: string; downloadCsv: string; copied: string };
  qr: { show: string; hide: string; alt: string; failed: string };
  ia: { button: string; again: string; running: string; downloading: (n: number) => string; failed: string; private: string; invite: string; inviteHelp: string; prompt: (room: string, mcp: string) => string };
  options: string;
  host: { badge: string; ai: string; lock: string; unlock: string; lockedHint: string; timer: string; timerStop: string; timerLeft: (s: string) => string; timerOver: string; seconds: (n: number) => string };
  participants: { title: string; none: string; colStatus: string; colName: string; colVote: string; colRole: string; colAction: string; me: string; votedSr: string; votePending: string; toObserver: string; toObserverLabel: (n: string) => string; kick: string; kickLabel: (n: string) => string; kickConfirm: (n: string) => string };
  observers: { title: string; toParticipant: string; toParticipantLabel: (n: string) => string };
  activity: { title: string; none: string; colTime: string; colAuthor: string; colAction: string; joined: string; joined_observer: string; left: string; voted: string; unvoted: string; revealed: string; new_round: string; stories_added: string; stories_cleared: string; story_selected: (t: string) => string; estimated: (t: string) => string; locked: string; unlocked: string; timer_started: string; timer_stopped: string; kicked: (t: string) => string; to_observer: (t: string) => string; to_participant: (t: string) => string };
  live: { newRound: (n: number) => string; revealed: string };
  footer: { source: string; license: string; legal: string; privacy: string; about: string; navAriaLabel: string };
}

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
