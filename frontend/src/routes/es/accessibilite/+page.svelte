<svelte:head>
  <title>Accesibilidad & discapacidad | CleanPoker planning poker inclusivo</title>
  <meta name="description" content="CleanPoker es una herramienta de planning poker totalmente accesible para personas con discapacidad. Navegación por teclado, lectores de pantalla (NVDA, VoiceOver, JAWS), conformidad WCAG 2.1 AA." />
  <link rel="canonical" href="https://cleanpoker.dev/es/accessibilite" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/accessibilite" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/accessibilite" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/accessibilite" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/accessibilite" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/accessibilite" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/accessibilite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Declaración de accesibilidad: CleanPoker',
    url: 'https://cleanpoker.dev/es/accessibilite',
    description: 'CleanPoker es una herramienta de planning poker totalmente accesible para personas con discapacidad. Navegación por teclado completa, compatible con lectores de pantalla NVDA, VoiceOver y JAWS. Conformidad WCAG 2.1 AA.',
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
    <a href="/es" class="back-link">← Volver al inicio</a>

    <h1>Accesibilidad: CleanPoker para equipos inclusivos</h1>

    <p>
      <strong>CleanPoker</strong> es una herramienta de planning poker diseñada para ser utilizable por todos,
      incluidas las personas con discapacidad: usuarios de lectores de pantalla,
      personas que navegan solo con el teclado, personas con baja visión o trastornos motores.
      Cumple con las directrices <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 nivel AA.
    </p>

    <h2>¿Para quién?</h2>
    <p>CleanPoker es adecuado para:</p>
    <ul>
      <li>Personas ciegas o con baja visión que usan un lector de pantalla (NVDA, VoiceOver, JAWS)</li>
      <li>Personas con trastornos motores que navegan exclusivamente con el teclado</li>
      <li>Personas sensibles a las animaciones (epilepsia, trastornos vestibulares)</li>
      <li>Personas que usan el zoom del navegador hasta el 200%</li>
      <li>Equipos ágiles que desean incluir a miembros con discapacidad</li>
    </ul>

    <h2>Estado de conformidad</h2>
    <p>CleanPoker tiene <strong>conformidad parcial</strong> con los criterios WCAG 2.1 AA.
    La accesibilidad se integró desde la fase de diseño, no se añadió después.
    La puntuación de Lighthouse Accesibilidad es de <strong>100/100</strong>.</p>

    <h2>Compatibilidad con tecnologías de asistencia</h2>
    <ul>
      <li><strong>NVDA</strong> (Windows): probado con Firefox</li>
      <li><strong>VoiceOver</strong> (macOS / iOS): probado con Safari</li>
      <li><strong>JAWS</strong> (Windows): compatible mediante HTML semántico y ARIA</li>
      <li>Navegación completa por teclado: Tab, Mayús+Tab, Enter, Espacio, flechas</li>
    </ul>

    <h2>Medidas técnicas implementadas</h2>
    <ul>
      <li>Enlace de salto ("Ir al contenido principal") al principio de la página</li>
      <li>Navegación completa por teclado (Tab, Enter, Espacio)</li>
      <li>Zonas <code>aria-live="polite"</code> para actualizaciones de votos en tiempo real</li>
      <li>Estados <code>aria-pressed</code> en las cartas de votación</li>
      <li>Contrastes que cumplen el ratio mínimo de 4,5:1</li>
      <li>Sin <code>user-scalable=no</code> (zoom del navegador libre)</li>
      <li>Compatibilidad con <code>prefers-reduced-motion</code> (sin animaciones impuestas)</li>
      <li>Compatibilidad con modo oscuro (<code>prefers-color-scheme</code>)</li>
      <li>HTML5 semántico: <code>&lt;button&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;table&gt;</code></li>
      <li>Unidades <code>rem</code>: el zoom del navegador funciona correctamente</li>
      <li>Botones y enlaces con etiquetas explícitas (<code>aria-label</code>)</li>
    </ul>

    <h2>Tecnologías utilizadas</h2>
    <ul>
      <li>HTML5 semántico</li>
      <li>CSS con unidades <code>rem</code> (zoom respetado)</li>
      <li>JavaScript (SvelteKit)</li>
      <li>WebSocket para tiempo real</li>
      <li>WAI-ARIA para componentes interactivos</li>
    </ul>

    <h2>Limitaciones conocidas</h2>
    <p>No se han identificado limitaciones importantes hasta la fecha. Este sitio se mantiene activamente y se audita regularmente.</p>

    <h2>Reportar un problema</h2>
    <p>
      Para reportar un problema de accesibilidad o sugerir una mejora:
      <a href="https://github.com/florianmousseau/cleanpoker/issues" rel="noopener noreferrer">
        abrir un issue en GitHub
      </a>
    </p>

    <h2>Fecha de actualización</h2>
    <p>Esta declaración fue establecida en junio de 2026.</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Código fuente</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licencia MIT</a>
      | <a href="/es/green">Eco-diseño</a>
      | <a href="/es/accessibilite">Accesibilidad</a>
      | <a href="/es/mentions-legales">Aviso legal</a>
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
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }

  p, li { line-height: 1.7; }

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
