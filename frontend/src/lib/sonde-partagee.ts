/**
 * One probe for a burst of `/health` calls. A probe renders two pages, reads
 * every built file they name and asks the room server: twenty anonymous calls
 * a second would run it twenty times. Calls that arrive while a probe runs, or
 * within `duree` after it, get its report.
 */
export function sondePartagee<T>(duree: number, horloge: () => number = Date.now): (sonde: () => Promise<T>) => Promise<T> {
	let enCours: { depuis: number; rapport: Promise<T> } | null = null;
	// The probe is the caller's own: a Worker cannot do I/O with another request's readers.
	return (sonde) => {
		const maintenant = horloge();
		if (enCours && maintenant - enCours.depuis < duree) return enCours.rapport;
		const rapport = sonde();
		const celle = { depuis: maintenant, rapport };
		enCours = celle;
		// A probe that throws is not kept: the next call tries again.
		rapport.catch(() => {
			if (enCours === celle) enCours = null;
		});
		return rapport;
	};
}
