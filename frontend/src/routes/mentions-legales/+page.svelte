<svelte:head>
  <title>Legal notice & Privacy policy | CleanPoker</title>
  <meta name="description" content="Legal notice, privacy policy and hosting information for CleanPoker." />
  <link rel="canonical" href="https://cleanpoker.dev/mentions-legales" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/mentions-legales" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/mentions-legales" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/mentions-legales" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/mentions-legales" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/mentions-legales" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/mentions-legales" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">← Back to home</a>

    <h1>Legal notice & Privacy policy</h1>

    <!-- ── Publisher ── -->
    <h2>Site publisher</h2>
    <p>
      This site is published personally by:<br />
      <strong>Florian Mousseau</strong>, private individual<br />
      France<br />
      Contact: <a href="mailto:florian.mousseau@gmail.com">florian.mousseau@gmail.com</a>
    </p>

    <!-- ── Hosting ── -->
    <h2>Hosting</h2>
    <p>
      <strong>Interface (frontend)</strong><br />
      Cloudflare, Inc.<br />
      101 Townsend St, San Francisco, CA 94107, United States<br />
      <a href="https://www.cloudflare.com" rel="noopener noreferrer">cloudflare.com</a>
    </p>
    <p>
      <strong>Real-time server (backend)</strong><br />
      Fly.io, Inc.<br />
      2261 Market Street #4099, San Francisco, CA 94114, United States<br />
      Data hosted in region <strong>Europe (Paris, France)</strong><br />
      <a href="https://fly.io" rel="noopener noreferrer">fly.io</a>
    </p>

    <!-- ── Personal data ── -->
    <h2>Personal data (GDPR)</h2>
    <p>
      <strong>Data controller:</strong> Florian Mousseau,
      <a href="mailto:florian.mousseau@gmail.com">florian.mousseau@gmail.com</a>
    </p>

    <h3>Data collected</h3>
    <p>
      CleanPoker only collects the <strong>pseudonym</strong> you freely enter
      to join a session. This pseudonym is displayed to other participants in the same session.
      No email address, phone number, or real identification data is requested or stored.
    </p>

    <h3>Purpose and legal basis</h3>
    <p>
      The sole purpose of processing is to provide the collaborative planning poker service
      (legal basis: performance of the service requested by the user, Art. 6.1.b GDPR).
    </p>

    <h3>Retention period</h3>
    <p>
      Sessions and associated pseudonyms are automatically deleted
      <strong>24 hours after the last activity</strong>. No archive is retained beyond this.
    </p>

    <h3>Data transfers</h3>
    <p>
      Backend data (pseudonyms, voting activity) is hosted
      <strong>exclusively in France (Paris)</strong> at Fly.io.
      The frontend is served via the global Cloudflare network, which has adhered to the
      <em>EU-US Data Privacy Framework</em> since July 2023.
    </p>

    <h3>Your rights</h3>
    <p>
      In accordance with the GDPR, you have the right of access, rectification and erasure
      of your data. To exercise these rights or for any questions:
      <a href="mailto:florian.mousseau@gmail.com">florian.mousseau@gmail.com</a>
    </p>
    <p>
      You may also lodge a complaint with the
      <a href="https://www.cnil.fr" rel="noopener noreferrer">CNIL</a> (French data protection authority).
    </p>

    <!-- ── Cookies & localStorage ── -->
    <h2>Cookies and local storage</h2>
    <p>
      CleanPoker <strong>does not use any advertising cookies or tracking tools</strong>.
    </p>
    <p>
      The site uses only your browser's <strong>localStorage</strong> to remember
      your language preference (<code>lang</code>). This storage is strictly functional,
      contains no personal data and does not require prior consent.
    </p>
    <p>
      Cloudflare may set technical security cookies (<code>__cf_bm</code>) strictly
      necessary for the service to function (anti-DDoS protection). These cookies are exempt
      from consent.
    </p>

    <!-- ── Intellectual property ── -->
    <h2>Intellectual property</h2>
    <p>
      The CleanPoker source code is published under the
      <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT licence</a>.
      You are free to reuse, modify and distribute it under the terms of this licence.
    </p>

    <!-- ── Liability ── -->
    <h2>Limitation of liability</h2>
    <p>
      CleanPoker is a free service provided without warranty. The publisher cannot be held
      liable for direct or indirect damages resulting from the use or unavailability of the service.
    </p>

    <h2>Applicable law</h2>
    <p>These notices are subject to French law. Any dispute falls within the jurisdiction of French courts.</p>

    <p class="updated">Last updated: June 2026</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT Licence</a>
      | <a href="/a-propos">About</a>
      | <a href="/mentions-legales">Legal notice</a>
    </p>
  </footer>
</div>

<style>
  .page {
    padding-top: 2rem;
    padding-bottom: 4rem;
    max-width: 48rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2.5rem; margin-bottom: 0.75rem; }
  h3 { margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1rem; }

  p { line-height: 1.7; margin-bottom: 0.75rem; }

  .updated {
    margin-top: 3rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-align: center;
  }
</style>
