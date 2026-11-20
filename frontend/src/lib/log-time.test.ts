import { describe, expect, it } from 'vitest';
import { logTime } from './log-time';

describe('logTime', () => {
  it('shows a Unix millisecond instant on the local clock', () => {
    const local = new Date(2026, 10, 20, 14, 5, 9);
    expect(logTime(local.getTime())).toBe('14:05:09');
  });

  it('moves with the time zone of the reader', () => {
    // 13:05:09 UTC is 14:05:09 in Paris in winter: the old server text said 13.
    const instant = Date.UTC(2026, 10, 20, 13, 5, 9);
    const before = process.env.TZ;
    try {
      process.env.TZ = 'Europe/Paris';
      expect(logTime(instant)).toBe('14:05:09');
      process.env.TZ = 'America/New_York';
      expect(logTime(instant)).toBe('08:05:09');
    } finally {
      process.env.TZ = before;
    }
  });

  it('reads an RFC 3339 instant the same way', () => {
    const local = new Date(2026, 10, 20, 7, 0, 3);
    expect(logTime(local.toISOString())).toBe('07:00:03');
  });

  it('keeps the clock text of a server not yet updated', () => {
    expect(logTime('13:05:09')).toBe('13:05:09');
  });

  it('never throws on a value it cannot read', () => {
    expect(logTime('soon')).toBe('soon');
  });
});
