import { describe, expect, it } from 'vitest';
import { sondePartagee } from './sonde-partagee.ts';

describe('the shared probe', () => {
	it('runs once for calls inside the window, and again after it', async () => {
		let t = 0;
		let runs = 0;
		const partagee = sondePartagee<number>(30_000, () => t);
		const sonde = () => partagee(async () => ++runs);
		expect(await Promise.all([sonde(), sonde(), sonde()])).toEqual([1, 1, 1]);
		t = 29_999;
		expect(await sonde()).toBe(1);
		t = 30_000;
		expect(await sonde()).toBe(2);
		expect(runs).toBe(2);
	});

	it('does not keep a probe that failed', async () => {
		let runs = 0;
		const partagee = sondePartagee<number>(30_000, () => 0);
		const sonde = () =>
			partagee(async () => {
				runs += 1;
				if (runs === 1) throw new Error('down');
				return runs;
			});
		await expect(sonde()).rejects.toThrow('down');
		expect(await sonde()).toBe(2);
	});
});
