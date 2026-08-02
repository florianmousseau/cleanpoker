<svelte:head>
  <title>Planning poker: reglas, Fibonacci y guía práctica | CleanPoker</title>
  <meta name="description" content="¿Qué es el planning poker? Reglas, suite de Fibonacci, T-shirt sizing, consejos para estimar historias de usuario en equipo ágil. Guía completa gratuita." />
  <link rel="canonical" href="https://cleanpoker.dev/es/planning-poker" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/planning-poker" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/planning-poker" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/planning-poker" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/planning-poker" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué es el planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'El planning poker es una técnica de estimación ágil usada en Scrum. Cada miembro del equipo elige secretamente una carta con su estimación de una historia de usuario, luego todos la revelan simultáneamente. Las diferencias provocan una discusión que afina la estimación colectiva.' },
      },
      {
        '@type': 'Question',
        name: '¿Por qué usar la serie de Fibonacci en el planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'La serie de Fibonacci (1, 2, 3, 5, 8, 13, 21) refleja la incertidumbre creciente: cuanto más grande es una tarea, menos precisamente se puede estimar. La diferencia entre los valores aumenta, lo que obliga al equipo a posicionarse claramente sin una sobre-precisión artificial.' },
      },
      {
        '@type': 'Question',
        name: '¿Cuál es la diferencia entre puntos de historia y días?',
        acceptedAnswer: { '@type': 'Answer', text: 'Los puntos de historia miden el esfuerzo relativo, no el tiempo: el volumen de trabajo, la incertidumbre y la complejidad tomados juntos. La escala es relativa, así que un 5 es claramente mayor que un 2 sin pretender una proporción exacta. Esta abstracción permite comparar tareas sin quedarse bloqueado en las duraciones individuales.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es/a-propos" class="back-link">← Acerca de</a>

    <h1>Planning poker: guía completa</h1>

    <p>
      El <strong>planning poker</strong> es la técnica de estimación más utilizada en
      <strong>Scrum</strong> y en agilidad. En 5 minutos, aquí está todo lo que necesitas saber.
    </p>

    <h2>¿Qué es el planning poker?</h2>
    <p>
      El planning poker (también llamado <em>Scrum poker</em>) es una técnica de estimación
      colaborativa donde cada miembro del equipo elige <strong>secretamente</strong> una carta
      con su estimación de una historia de usuario o tarea. Todos revelan sus cartas
      <strong>simultáneamente</strong>. Las diferencias desencadenan una discusión corta,
      luego el equipo vuelve a votar hasta la convergencia.
    </p>

    <h2>Las reglas en 5 pasos</h2>
    <ol>
      <li>El Product Owner presenta una historia de usuario o tarea.</li>
      <li>El equipo hace preguntas de clarificación.</li>
      <li>Cada miembro elige secretamente una carta (sin influenciar a los demás).</li>
      <li>Todos revelan simultáneamente.</li>
      <li>Si las estimaciones convergen: se retiene el valor. Si no: discusión de los extremos, luego nuevo voto.</li>
    </ol>

    <h2>¿Por qué la suite de Fibonacci?</h2>
    <p>
      La suite <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> es la más extendida porque modela
      la incertidumbre creciente: cuanto más grande es una tarea, menos se puede estimar con
      precisión. La diferencia entre los valores crece con el tamaño, lo que
      <strong>obliga al equipo a posicionarse claramente</strong> sin pretender una precisión ilusoria.
    </p>

    <h2>Comparación de secuencias de cartas</h2>
    <table>
      <thead>
        <tr><th>Secuencia</th><th>Valores</th><th>Ideal para</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fibonacci</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Equipos Scrum con experiencia, estimación en puntos de historia</td>
        </tr>
        <tr>
          <td><strong>T-shirt</strong></td>
          <td>XS, S, M, L, XL, XXL, ?</td>
          <td>Estimaciones aproximadas, equipos no técnicos, clasificación de backlog</td>
        </tr>
        <tr>
          <td><strong>Potencias de 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Tareas técnicas con duplicación de complejidad previsible</td>
        </tr>
      </tbody>
    </table>

    <h2>Preguntas frecuentes</h2>

    <details>
      <summary>¿Cuál es la diferencia entre puntos de historia y días?</summary>
      <p>
        Los puntos de historia miden el <strong>esfuerzo relativo</strong>, no el tiempo: el
        volumen de trabajo, la incertidumbre y la complejidad tomados juntos. La escala es
        relativa - un 5 es claramente mayor que un 2, sin pretender una proporción exacta.
        Esta abstracción permite comparar tareas sin quedarse bloqueado en las duraciones
        individuales.
      </p>
    </details>

    <details>
      <summary>¿Cómo gestionar las divergencias de estimación?</summary>
      <p>
        Cuando las estimaciones divergen (por ejemplo, un 2 y un 13 en la misma mano),
        pide a las personas que votaron en los extremos que expliquen su elección.
        La discusión a menudo revela diferentes hipótesis o riesgos no identificados.
        Vuelve a votar hasta la convergencia.
      </p>
    </details>

    <details>
      <summary>¿El planning poker funciona para equipos remotos?</summary>
      <p>
        Sí, precisamente para eso existe CleanPoker. Crea una sesión, comparte la URL,
        cada participante vota desde su propio dispositivo. Los resultados se revelan en
        tiempo real via WebSocket, sin ninguna configuración ni cuenta que crear.
      </p>
    </details>

    <div class="cta">
      <a href="/es" class="btn">Crear una sesión gratuita →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Código fuente</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licencia MIT</a>
      | <a href="/es/a-propos">Acerca de</a>
      | <a href="/es/mentions-legales">Aviso legal</a>
      | <a href="/es/mentions-legales#confidentialite">Privacidad</a>
    </p>
  </footer>
</div>

<style>
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p, li { line-height: 1.7; }
  ol { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; }
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
