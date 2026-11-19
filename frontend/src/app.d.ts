declare global {
  /** The commit this build was made from, set by vite.config.ts. */
  const __COMMIT__: string;

  namespace App {
    /**
     * What the Cloudflare adapter puts on `event.platform`.
     *
     * Without this declaration `platform.env` does not exist for the type
     * checker and the routes that read the bindings fail to compile. Only bindings actually declared on the Pages
     * project belong here: adding one without creating it on Cloudflare would
     * compile code that fails on its first call.
     */
    interface Platform {
      env: {
        /** The Pages binding that serves the built files. */
        ASSETS?: { fetch: (url: URL | string) => Promise<Response> };
      };
      context: { waitUntil: (work: Promise<unknown>) => void };
    }
  }
}

export {};
