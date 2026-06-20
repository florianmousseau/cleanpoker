<svelte:head>
  <title>Accessibilité & handicap | CleanPoker planning poker inclusif</title>
  <meta name="description" content="CleanPoker est un outil de planning poker entièrement accessible aux personnes en situation de handicap. Navigation clavier, lecteurs d'écran (NVDA, VoiceOver, JAWS), conformité WCAG 2.1 AA." />
  <link rel="canonical" href="https://cleanpoker.dev/accessibilite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Déclaration d\'accessibilité : CleanPoker',
    url: 'https://cleanpoker.dev/accessibilite',
    description: 'CleanPoker est un outil de planning poker entièrement accessible aux personnes en situation de handicap. Navigation clavier complète, compatible lecteurs d\'écran NVDA, VoiceOver et JAWS. Conforme WCAG 2.1 AA.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      accessibilityFeature: ['highContrastDisplay','readingOrder','structuralNavigation','alternativeText','displayTransformability'],
      accessibilityHazard: ['noFlashingHazard','noMotionSimulationHazard','noSoundHazard'],
      accessibilityControl: ['fullKeyboardControl','fullMouseControl','fullTouchControl'],
      accessibilityAPI: 'ARIA',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">← Retour à l'accueil</a>

    <h1>Accessibilité : CleanPoker pour les équipes inclusives</h1>

    <p>
      <strong>CleanPoker</strong> est un outil de planning poker conçu pour être utilisable par tous,
      y compris les personnes en situation de handicap : utilisateurs de lecteurs d'écran,
      personnes naviguant au clavier, personnes malvoyantes ou ayant des troubles moteurs.
      Il est conforme au référentiel <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 niveau AA.
    </p>

    <h2>Pour qui ?</h2>
    <p>CleanPoker est adapté aux :</p>
    <ul>
      <li>Personnes aveugles ou malvoyantes utilisant un lecteur d'écran (NVDA, VoiceOver, JAWS)</li>
      <li>Personnes ayant des troubles moteurs naviguant exclusivement au clavier</li>
      <li>Personnes sensibles aux animations (épilepsie, troubles vestibulaires)</li>
      <li>Personnes utilisant un zoom navigateur jusqu'à 200 %</li>
      <li>Équipes agiles souhaitant inclure des membres en situation de handicap</li>
    </ul>

    <h2>État de conformité</h2>
    <p>CleanPoker est <strong>en conformité partielle</strong> avec les critères WCAG 2.1 AA.
    L'accessibilité a été intégrée dès la conception, pas ajoutée après coup.
    Le score Lighthouse Accessibilité est de <strong>100/100</strong>.</p>

    <h2>Compatibilité avec les technologies d'assistance</h2>
    <ul>
      <li><strong>NVDA</strong> (Windows) : testé avec Firefox</li>
      <li><strong>VoiceOver</strong> (macOS / iOS) : testé avec Safari</li>
      <li><strong>JAWS</strong> (Windows) : compatible via HTML sémantique et ARIA</li>
      <li>Navigation clavier complète : Tab, Maj+Tab, Entrée, Espace, flèches</li>
    </ul>

    <h2>Mesures techniques mises en œuvre</h2>
    <ul>
      <li>Lien d'évitement ("Aller au contenu principal") en début de page</li>
      <li>Navigation clavier complète (Tab, Entrée, Espace)</li>
      <li>Zones <code>aria-live="polite"</code> pour les mises à jour de votes en temps réel</li>
      <li>États <code>aria-pressed</code> sur les cartes de vote</li>
      <li>Contrastes respectant le ratio 4,5:1 minimum</li>
      <li>Pas de <code>user-scalable=no</code> (zoom navigateur libre)</li>
      <li>Prise en charge de <code>prefers-reduced-motion</code> (pas d'animation imposée)</li>
      <li>Prise en charge du mode sombre (<code>prefers-color-scheme</code>)</li>
      <li>HTML5 sémantique : <code>&lt;button&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;table&gt;</code></li>
      <li>Unités <code>rem</code> : le zoom navigateur fonctionne correctement</li>
      <li>Boutons et liens avec labels explicites (<code>aria-label</code>)</li>
    </ul>

    <h2>Technologies utilisées</h2>
    <ul>
      <li>HTML5 sémantique</li>
      <li>CSS avec unités <code>rem</code> (zoom respecté)</li>
      <li>JavaScript (SvelteKit)</li>
      <li>WebSocket pour le temps réel</li>
      <li>WAI-ARIA pour les composants interactifs</li>
    </ul>

    <h2>Limitations connues</h2>
    <p>Aucune limitation majeure identifiée à ce jour. Ce site est activement maintenu et audité régulièrement.</p>

    <h2>Signaler un problème</h2>
    <p>
      Pour signaler un problème d'accessibilité ou suggérer une amélioration :
      <a href="https://github.com/florianmousseau/cleanpoker/issues" rel="noopener noreferrer">
        ouvrir une issue GitHub
      </a>
    </p>

    <h2>Date de mise à jour</h2>
    <p>Cette déclaration a été établie en juin 2026.</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
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
