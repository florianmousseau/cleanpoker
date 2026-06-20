<svelte:head>
  <title>Alternativas al planning poker: tallas de camiseta, dot voting y más | CleanPoker</title>
  <meta name="description" content="Comparativa de las mejores alternativas al planning poker: tallas de camiseta, affinity mapping, dot voting y bucket system." />
  <link rel="canonical" href="https://cleanpoker.dev/es/alternatives" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/alternatives" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/alternatives" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/alternatives" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/alternatives" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/alternatives" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/alternatives" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es/a-propos" class="back-link">← Acerca de</a>

    <h1>Alternativas al planning poker</h1>

    <p>El planning poker no es la única forma de estimar. Según el tamaño de tu equipo, la profundidad del backlog y tus objetivos, otra técnica puede ser más rápida e igualmente efectiva.</p>

    <h2>Técnica</h2>
    <table>
      <thead>
        <tr><th>Técnica</th><th>Velocidad</th><th>Precisión</th><th>Ideal para</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Planning poker</strong></td><td>Medio</td><td>Alta</td><td>Estimación de sprint de historias bien definidas</td></tr>
        <tr><td><strong>Tallas de camiseta</strong></td><td>Rápido</td><td>Baja-media</td><td>Grooming rápido, partes interesadas no técnicas</td></tr>
        <tr><td><strong>Affinity mapping</strong></td><td>Muy rápido</td><td>Media</td><td>Backlogs grandes (20+ historias)</td></tr>
        <tr><td><strong>Bucket system</strong></td><td>Muy rápido</td><td>Media</td><td>Backlogs muy grandes (50+ historias)</td></tr>
        <tr><td><strong>Dot voting</strong></td><td>Rápido</td><td>Baja</td><td>Priorización, no estimación</td></tr>
      </tbody>
    </table>

    <h2>FAQ</h2>

    <details>
      <summary>¿Cuáles son las principales alternativas al planning poker?</summary>
      <p>Las principales alternativas son: tallas de camiseta (XS a XXL), affinity mapping, dot voting y bucket system. Cada una sacrifica algo de precisión para ganar velocidad.</p>
    </details>

    <details>
      <summary>¿Cuándo usar tallas de camiseta en lugar de planning poker?</summary>
      <p>Usa tallas de camiseta para estimaciones rápidas, con partes interesadas no técnicas, o para refinar un backlog grande al inicio del proyecto. Cambia a planning poker Fibonacci cuando necesites seguimiento de velocidad.</p>
    </details>

    <div class="cta">
      <a href="/es" class="btn">Probar planning poker con CleanPoker →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Código fuente</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licencia MIT</a>
      | <a href="/es/a-propos">Acerca de</a>
      | <a href="/es/mentions-legales">Aviso legal</a>
    </p>
  </footer>
</div>

<style>
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p { line-height: 1.7; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 0.5rem 0; }
  th, td { padding: 0.5rem 0.75rem; border: 1px solid var(--color-border); text-align: left; }
  th { background: var(--color-surface); font-weight: 700; }
  tr:nth-child(even) td { background: var(--color-surface); }
  details { border: 1px solid var(--color-border); border-radius: var(--radius); padding: 0.75rem 1rem; margin-bottom: 0.5rem; }
  details[open] { background: var(--color-surface); }
  summary { font-weight: 600; cursor: pointer; font-size: 0.95rem; }
  details p { margin: 0.75rem 0 0; font-size: 0.9rem; }
  .cta { margin-top: 2.5rem; text-align: center; }
  .btn { display: inline-block; padding: 0.875rem 2rem; background: var(--color-primary); color: #fff; border-radius: var(--radius-lg); text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.15s; }
  .btn:hover { opacity: 0.85; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
