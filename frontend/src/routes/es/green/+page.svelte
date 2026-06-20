<svelte:head>
  <title>Eco-diseño & tecnología responsable | CleanPoker</title>
  <meta name="description" content="Declaración de eco-diseño de CleanPoker. Bundle JS menor de 50 KB brotli, cero rastreadores, cero cookies, alojamiento 100% energía renovable, Lighthouse Rendimiento 100, CO2 menor de 0,1 g por visita." />
  <link rel="canonical" href="https://cleanpoker.dev/es/green" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/green" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/green" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/green" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/green" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/green" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/green" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Eco-diseño: CleanPoker',
    url: 'https://cleanpoker.dev/es/green',
    description: 'Declaración de eco-diseño de CleanPoker. Bundle JS menor de 50 KB brotli, cero rastreadores, cero cookies, alojamiento 100% energía renovable, Lighthouse Rendimiento 100, CO2 menor de 0,1 g por visita.',
    keywords: 'eco-diseño, green IT, tecnología responsable, planning poker ecológico, cero rastreadores, alojamiento verde, energía renovable, Lighthouse 100, bundle ligero, bajo CO2',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      sustainabilityNote: 'Alojado en energía renovable (Cloudflare Pages + Fly.io CDG París). Bundle JS menor de 50 KB brotli. Sin scripts de terceros. CO2 menor de 0,1 g por visita.',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es" class="back-link">← Volver al inicio</a>

    <h1>Eco-diseño: CleanPoker, tecnología digital responsable</h1>

    <p>
      <strong>CleanPoker</strong> está diseñado según los principios de la <strong>tecnología digital responsable</strong>:
      cada decisión técnica tiene como objetivo reducir la huella de carbono, eliminar dependencias innecesarias
      y respetar la privacidad de los usuarios. No es una etiqueta añadida a posteriori,
      es el ADN del proyecto.
    </p>

    <h2>Cifras clave</h2>
    <table>
      <thead>
        <tr><th>Métrica</th><th>Valor</th></tr>
      </thead>
      <tbody>
        <tr><td>Bundle JS compartido (brotli, validado por CI)</td><td><strong>&lt; 50 KB</strong></td></tr>
        <tr><td>CO₂ estimado por visita</td><td><strong>&lt; 0,1 g</strong></td></tr>
        <tr><td>Lighthouse Rendimiento</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Lighthouse Accesibilidad</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Solicitudes a terceros</td><td><strong>0</strong></td></tr>
        <tr><td>Rastreadores / analíticas</td><td><strong>0</strong></td></tr>
        <tr><td>Cookies publicitarias</td><td><strong>0</strong></td></tr>
        <tr><td>Fuentes de Google cargadas</td><td><strong>0</strong></td></tr>
        <tr><td>RAM del servidor</td><td><strong>~15 MB</strong> (binario Go)</td></tr>
      </tbody>
    </table>

    <h2>Elecciones técnicas para reducir el impacto</h2>
    <ul>
      <li><strong>Sin framework CSS</strong> (Tailwind, Bootstrap...): CSS vanilla, cero código muerto</li>
      <li><strong>Sin Google Fonts</strong>: fuentes del sistema únicamente, sin solicitudes de red</li>
      <li><strong>Sin DOM virtual</strong>: SvelteKit compila a JavaScript vanilla, bundle mínimo</li>
      <li><strong>Sin base de datos</strong>: sesiones en memoria Go, auto-eliminadas tras 24h de inactividad</li>
      <li><strong>Sin scripts de terceros</strong>: sin SDK de Analytics, Chat, A/B testing u otros</li>
      <li><strong>Compresión Brotli</strong>: más eficiente que gzip, activada por defecto en Cloudflare</li>
      <li><strong>Backend Go</strong>: binario nativo ~15 MB RAM, sin JVM ni Node.js que mantener</li>
      <li><strong>WebSocket nativo</strong>: sin polling HTTP, conexión persistente ligera</li>
      <li><strong>Imágenes del sistema</strong>: favicon SVG, sin PNG pesado, sin sprite</li>
    </ul>

    <h2>Alojamiento en energía renovable</h2>
    <ul>
      <li>
        <strong>Frontend: Cloudflare Pages</strong> - CDN mundial, certificado 100% energía renovable.
        Cloudflare figura en la base de datos de The Green Web Foundation.
      </li>
      <li>
        <strong>Backend: Fly.io CDG (París, Francia)</strong> - proveedor certificado en energía renovable,
        datos alojados en Francia, latencia mínima para equipos europeos.
      </li>
    </ul>

    <h2>Lo que CleanPoker NO hace</h2>
    <ul>
      <li>Sin Google Analytics ni ninguna herramienta de seguimiento comportamental</li>
      <li>Sin publicidad, sin monetización, sin freemium</li>
      <li>Sin cookies de terceros (solo Cloudflare puede depositar <code>__cf_bm</code>, una cookie de seguridad estrictamente necesaria)</li>
      <li>Sin localStorage con datos personales (solo se guarda la preferencia de idioma)</li>
      <li>Sin fuentes, iconos ni scripts cargados desde CDNs de terceros (jsDelivr, cdnjs, unpkg...)</li>
      <li>Sin email marketing, sin cuentas de usuario, sin base de datos permanente</li>
    </ul>

    <h2>Verificación externa</h2>
    <p>Estas herramientas independientes permiten verificar los compromisos anteriores:</p>
    <ul>
      <li>
        <a href="https://www.websitecarbon.com/website/cleanpoker-dev/" rel="noopener noreferrer">
          Website Carbon: huella de CO₂ de cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://www.thegreenwebfoundation.org/green-web-check/?url=cleanpoker.dev" rel="noopener noreferrer">
          The Green Web Foundation: verificar el alojamiento verde de cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://sonarcloud.io/project/overview?id=florianmousseau_cleanpoker" rel="noopener noreferrer">
          SonarCloud: calidad y seguridad del código
        </a>
      </li>
      <li>
        <a href="https://github.com/florianmousseau/cleanpoker/actions" rel="noopener noreferrer">
          GitHub Actions: resultados de Lighthouse CI y Eco-CI
        </a>
      </li>
    </ul>

    <h2>Mejora continua</h2>
    <p>
      La huella digital se audita en cada despliegue mediante Lighthouse CI y Eco-CI
      (mide el consumo energético del pipeline de CI).
      Cualquier regresión de rendimiento bloquea el despliegue en producción.
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

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  th, td {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  th {
    background: var(--color-surface);
    font-weight: 700;
  }

  tr:nth-child(even) td {
    background: var(--color-surface);
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
