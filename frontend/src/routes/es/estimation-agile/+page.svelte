<svelte:head>
  <title>Estimación ágil: story points, velocidad y planificación de sprint | CleanPoker</title>
  <meta name="description" content="Guía completa de estimación ágil: story points vs horas, cómo funciona la velocidad, planificación de capacidad y errores comunes." />
  <link rel="canonical" href="https://cleanpoker.dev/es/estimation-agile" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/estimation-agile" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/estimation-agile" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/estimation-agile" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/estimation-agile" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/estimation-agile" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/estimation-agile" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es/a-propos" class="back-link">← Acerca de</a>

    <h1>Estimación ágil: guía completa</h1>

    <p>
      La estimación ágil no consiste en predecir el futuro, sino en
      <strong>revelar lo que el equipo aún no sabe</strong>. Una buena sesión de estimación
      descubre complejidad oculta, suposiciones implícitas y dependencias no resueltas.
    </p>

    <h2>Story points vs. horas</h2>
    <p>
      Los <strong>story points</strong> miden la complejidad relativa dentro del equipo.
      Una historia de 5 puntos es aproximadamente el doble de compleja que una de 3,
      independientemente de quién la implemente. Las horas varían; la complejidad relativa
      es estable.
    </p>

    <h2>Cómo funciona la velocidad</h2>
    <p>
      La velocidad es el número de story points que un equipo completa por sprint en promedio.
      Después de 3 a 5 sprints se estabiliza y se convierte en una herramienta fiable para
      planificar releases y compromisos de sprint.
    </p>

    <h2>Errores comunes de estimación</h2>
    <table>
      <thead>
        <tr><th>Error</th><th>Por qué perjudica</th><th>Corrección</th></tr>
      </thead>
      <tbody>
        <tr><td>Estimar en horas</td><td>Se ancla en velocidad individual, no en complejidad</td><td>Cambiar a story points relativos</td></tr>
        <tr><td>Anclarse en el primer voto</td><td>Elimina la estimación independiente</td><td>Revelar siempre simultáneamente</td></tr>
        <tr><td>Ignorar bugs en la estimación</td><td>Infla la velocidad y engaña la planificación</td><td>Estimar bugs que requieran esfuerzo real</td></tr>
        <tr><td>Comparar velocidades entre equipos</td><td>Escalas y contextos diferentes</td><td>La velocidad es solo una métrica interna</td></tr>
      </tbody>
    </table>

    <h2>Preguntas frecuentes</h2>

    <details>
      <summary>¿Cuál es la diferencia entre story points y horas?</summary>
      <p>
        Los story points miden complejidad relativa, no tiempo. Una historia de 5 puntos es
        aproximadamente el doble de compleja que una de 3, independientemente de quien la
        implemente.
      </p>
    </details>

    <details>
      <summary>¿Cuántos sprints tarda la velocidad en estabilizarse?</summary>
      <p>
        Típicamente de 3 a 5 sprints. El primer sprint suele ser más bajo mientras el equipo
        calibra su estimación. A partir del sprint 4 o 5, el promedio es suficientemente
        fiable para prever fechas de entrega.
      </p>
    </details>

    <div class="cta">
      <a href="/es" class="btn">Crear una sesión con CleanPoker →</a>
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
