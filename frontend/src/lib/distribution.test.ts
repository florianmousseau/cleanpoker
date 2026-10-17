import { describe, expect, it } from 'vitest';
import { barWidth } from './distribution';

describe('barWidth', () => {
  it('measures a count against the votes of the revealed round', () => {
    expect(barWidth(2, { '3': 2, '5': 2 })).toBe(50);
  });

  it('never exceeds 100 whoever left after the reveal', () => {
    expect(barWidth(3, { '8': 3 })).toBe(100);
  });

  it('is 0 on an empty round', () => {
    expect(barWidth(0, {})).toBe(0);
  });
});
