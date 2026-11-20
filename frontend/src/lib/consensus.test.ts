import { describe, expect, it } from 'vitest';
import { agreement, extreme } from './consensus.ts';

describe('agreement', () => {
  it('is the share of the most chosen card', () => {
    expect(agreement({ '3': 1, '5': 3 })).toBe(75);
  });
  it('is null with no vote', () => {
    expect(agreement({})).toBeNull();
  });
});

describe('extreme', () => {
  it('marks the lowest and the highest vote', () => {
    expect(extreme('1', '1', '8')).toBe('min');
    expect(extreme('8', '1', '8')).toBe('max');
    expect(extreme('3', '1', '8')).toBeNull();
  });
  it('marks nothing when everyone agrees or nothing is numeric', () => {
    expect(extreme('5', '5', '5')).toBeNull();
    expect(extreme('?', 'N/A', 'N/A')).toBeNull();
  });
});
