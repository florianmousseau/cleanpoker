<svelte:head>
  <title>Mentions légales & Confidentialité | CleanPoker</title>
  <meta name="description" content="Mentions légales, politique de confidentialité et informations d'hébergement de CleanPoker." />
  <link rel="canonical" href="https://cleanpoker.dev/mentions-legales" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">← Retour à l'accueil</a>

    <h1>Mentions légales & Confidentialité</h1>

    <!-- ── Éditeur ── -->
    <h2>Éditeur du site</h2>
    <p>
      Ce site est édité à titre personnel par :<br />
      <strong>Florian Mousseau</strong>, particulier<br />
      France<br />
      Contact : <a href="mailto:florian.mousseau@gmail.com">florian.mousseau@gmail.com</a>
    </p>

    <!-- ── Hébergement ── -->
    <h2>Hébergement</h2>
    <p>
      <strong>Interface (frontend)</strong><br />
      Cloudflare, Inc.<br />
      101 Townsend St, San Francisco, CA 94107, États-Unis<br />
      <a href="https://www.cloudflare.com" rel="noopener noreferrer">cloudflare.com</a>
    </p>
    <p>
      <strong>Serveur temps réel (backend)</strong><br />
      Fly.io, Inc.<br />
      2261 Market Street #4099, San Francisco, CA 94114, États-Unis<br />
      Données hébergées en région <strong>Europe (Paris, France)</strong><br />
      <a href="https://fly.io" rel="noopener noreferrer">fly.io</a>
    </p>

    <!-- ── Données personnelles ── -->
    <h2>Données personnelles (RGPD)</h2>
    <p>
      <strong>Responsable du traitement :</strong> Florian Mousseau —
      <a href="mailto:florian.mousseau@gmail.com">florian.mousseau@gmail.com</a>
    </p>

    <h3>Données collectées</h3>
    <p>
      CleanPoker collecte uniquement le <strong>pseudonyme</strong> que vous saisissez librement
      pour rejoindre une session. Ce pseudonyme est affiché aux autres participants de la même session.
      Aucune adresse e-mail, aucun numéro de téléphone, aucune donnée d'identification réelle
      n'est demandée ni stockée.
    </p>

    <h3>Finalité et base légale</h3>
    <p>
      Le traitement a pour seule finalité la fourniture du service de planning poker collaboratif
      (base légale : exécution du service demandé par l'utilisateur — art. 6.1.b RGPD).
    </p>

    <h3>Durée de conservation</h3>
    <p>
      Les sessions et pseudonymes associés sont automatiquement supprimés
      <strong>24 heures après la dernière activité</strong>. Aucune archive n'est conservée au-delà.
    </p>

    <h3>Transfert de données</h3>
    <p>
      Les données du backend (pseudonymes, activité de vote) sont hébergées
      <strong>exclusivement en France (Paris)</strong> chez Fly.io.
      Le frontend est servi via le réseau mondial Cloudflare, qui adhère au
      <em>EU-US Data Privacy Framework</em> depuis juillet 2023.
    </p>

    <h3>Vos droits</h3>
    <p>
      Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'effacement
      de vos données. Pour exercer ces droits ou pour toute question :
      <a href="mailto:florian.mousseau@gmail.com">florian.mousseau@gmail.com</a>
    </p>
    <p>
      Vous pouvez également introduire une réclamation auprès de la
      <a href="https://www.cnil.fr" rel="noopener noreferrer">CNIL</a>.
    </p>

    <!-- ── Cookies & localStorage ── -->
    <h2>Cookies et stockage local</h2>
    <p>
      CleanPoker <strong>n'utilise aucun cookie publicitaire ni outil de tracking</strong>.
    </p>
    <p>
      Le site utilise uniquement le <strong>localStorage</strong> de votre navigateur pour mémoriser
      votre préférence de langue (<code>lang</code>). Ce stockage est strictement fonctionnel,
      ne contient aucune donnée personnelle et ne nécessite pas de consentement préalable
      conformément aux lignes directrices de la CNIL.
    </p>
    <p>
      Cloudflare peut déposer des cookies techniques de sécurité (<code>__cf_bm</code>) strictement
      nécessaires au bon fonctionnement du service (protection anti-DDoS). Ces cookies sont exemptés
      de consentement.
    </p>

    <!-- ── Propriété intellectuelle ── -->
    <h2>Propriété intellectuelle</h2>
    <p>
      Le code source de CleanPoker est publié sous
      <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">licence MIT</a>.
      Vous êtes libre de le réutiliser, modifier et distribuer dans les conditions de cette licence.
    </p>

    <!-- ── Responsabilité ── -->
    <h2>Limitation de responsabilité</h2>
    <p>
      CleanPoker est un service gratuit fourni sans garantie. L'éditeur ne pourra être tenu
      responsable des dommages directs ou indirects résultant de l'utilisation ou de l'indisponibilité
      du service.
    </p>

    <h2>Droit applicable</h2>
    <p>Les présentes mentions sont soumises au droit français. Tout litige relève de la compétence
    des juridictions françaises.</p>

    <p class="updated">Dernière mise à jour : juin 2026</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      · <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
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
