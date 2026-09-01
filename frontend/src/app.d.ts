declare global {
	namespace App {
		/**
		 * What the Cloudflare adapter puts on `event.platform`.
		 *
		 * Without this declaration `platform.env` does not exist for the type
		 * checker and the visitor counter fails to compile, while running
		 * perfectly in production. Only bindings actually declared on the Pages
		 * project belong here: adding one without creating it on Cloudflare would
		 * compile code that fails on its first call.
		 */
		interface Platform {
			env: {
				SEL_COMPTEUR?: string;
				VISITEURS?: {
					writeDataPoint: (point: {
						indexes?: string[];
						blobs?: string[];
						doubles?: number[];
					}) => void;
				};
			};
			context: { waitUntil: (work: Promise<unknown>) => void };
		}
	}
}

export {};
