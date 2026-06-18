<svelte:head>
  <title>Déclaration d'accessibilité | CleanPoker</title>
  <meta name="description" content="Déclaration d'accessibilité de CleanPoker. Conformité WCAG 2.1 AA." />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">← Retour à l'accueil</a>

    <h1>Déclaration d'accessibilité</h1>

    <p>
      <strong>CleanPoker</strong> s'engage à rendre son service accessible conformément
      aux critères du référentiel <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 niveau AA.
    </p>

    <h2>État de conformité</h2>
    <p>CleanPoker est <strong>en conformité partielle</strong> avec les critères WCAG 2.1 AA.
    Le site a été conçu avec l'accessibilité comme priorité dès le départ.</p>

    <h2>Technologies utilisées</h2>
    <ul>
      <li>HTML5 sémantique</li>
      <li>CSS avec unités <code>rem</code> (zoom respecté)</li>
      <li>JavaScript (SvelteKit)</li>
      <li>WebSocket pour le temps réel</li>
    </ul>

    <h2>Mesures techniques prises</h2>
    <ul>
      <li>Lien d'évitement ("Aller au contenu principal") en début de page</li>
      <li>Navigation clavier complète (Tab, Entrée, Espace)</li>
      <li>Zones <code>aria-live="polite"</code> pour les mises à jour en temps réel</li>
      <li>Contrastes respectant le ratio 4,5:1 minimum</li>
      <li>Pas de <code>user-scalable=no</code> (zoom libre)</li>
      <li>Prise en charge de <code>prefers-reduced-motion</code></li>
      <li>Prise en charge du mode sombre (<code>prefers-color-scheme</code>)</li>
      <li>Boutons avec labels explicites</li>
      <li>États <code>aria-pressed</code> sur les cartes de vote</li>
    </ul>

    <h2>Limitations connues</h2>
    <p>Aucune limitation majeure identifiée à ce jour. Ce site est activement maintenu.</p>

    <h2>Contact</h2>
    <p>
      Pour signaler un problème d'accessibilité :
      <a href="https://github.com/florianmousseau/cleanpoker/issues" rel="noopener noreferrer">
        ouvrir une issue GitHub
      </a>
    </p>

    <h2>Date de mise à jour</h2>
    <p>Cette déclaration a été établie en juin 2025.</p>
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

  h1 {
    margin-bottom: 1.5rem;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  p, li {
    line-height: 1.7;
  }

  ul {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
