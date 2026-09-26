import { describe, expect, it, vi } from 'vitest';
import { expulserApresAccord } from './expulsion';
import { FR, EN, ES, DE, PT } from './i18n';

describe('expulserApresAccord', () => {
  it('asks before removing anyone', () => {
    const demander = vi.fn().mockReturnValue(true);
    const expulser = vi.fn();
    expect(expulserApresAccord('Expulser Amandine ?', demander, expulser)).toBe(true);
    expect(demander).toHaveBeenCalledWith('Expulser Amandine ?');
    expect(expulser).toHaveBeenCalledOnce();
  });

  it('removes nobody when the answer is no', () => {
    const expulser = vi.fn();
    expect(expulserApresAccord('Expulser Amandine ?', () => false, expulser)).toBe(false);
    expect(expulser).not.toHaveBeenCalled();
  });

  it('names the person in every language', () => {
    for (const T of [FR, EN, ES, DE, PT]) {
      expect(T.participants.kickConfirm('Amandine')).toContain('Amandine');
    }
  });
});
