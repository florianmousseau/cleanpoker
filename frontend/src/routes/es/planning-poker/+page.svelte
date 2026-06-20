<svelte:head>
  <title>Planning poker: reglas, Fibonacci y guia practica | CleanPoker</title>
  <meta name="description" content="Que es el planning poker? Reglas, suite de Fibonacci, T-shirt sizing, consejos para estimar historias de usuario en equipo agil. Guia completa gratuita." />
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
        name: 'Que es el planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'El planning poker es una tecnica de estimacion agil usada en Scrum. Cada miembro del equipo elige secretamente una carta con su estimacion de una historia de usuario, luego todos la revelan simultaneamente. Las diferencias provocan una discusion que afina la estimacion colectiva.' },
      },
      {
        '@type': 'Question',
        name: 'Por que usar la serie de Fibonacci en el planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'La serie de Fibonacci (1, 2, 3, 5, 8, 13, 21) refleja la incertidumbre creciente: cuanto mas grande es una tarea, menos precisamente se puede estimar. La diferencia entre los valores aumenta, lo que obliga al equipo a posicionarse claramente sin una sobre-precision artificial.' },
      },
      {
        '@type': 'Question',
        name: 'Cual es la diferencia entre puntos de historia y dias?',
        acceptedAnswer: { '@type': 'Answer', text: 'Los puntos de historia miden la complejidad relativa, no el tiempo. Un 5 es aproximadamente 2,5 veces mas complejo que un 2, independientemente de la duracion real. Esta abstraccion permite comparar tareas sin quedarse bloqueado en las duraciones individuales.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es/a-propos" class="back-link">← Acerca de</a>

    <h1>Planning poker: guia completa</h1>

    <p>
      El <strong>planning poker</strong> es la tecnica de estimacion mas utilizada en
      <strong>Scrum</strong> y en agilidad. En 5 minutos, aqui esta todo lo que necesitas saber.
    </p>

    <h2>Que es el planning poker?</h2>
    <p>
      El planning poker (tambien llamado <em>Scrum poker</em>) es una tecnica de estimacion
      colaborativa donde cada miembro del equipo elige <strong>secretamente</strong> una carta
      con su estimacion de una historia de usuario o tarea. Todos revelan sus cartas
      <strong>simultaneamente</strong>. Las diferencias desencadenan una discusion corta,
      luego el equipo vuelve a votar hasta la convergencia.
    </p>

    <h2>Las reglas en 5 pasos</h2>
    <ol>
      <li>El Product Owner presenta una historia de usuario o tarea.</li>
      <li>El equipo hace preguntas de clarificacion.</li>
      <li>Cada miembro elige secretamente una carta (sin influenciar a los demas).</li>
      <li>Todos revelan simultaneamente.</li>
      <li>Si las estimaciones convergen: se retiene el valor. Si no: discusion de los extremos, luego nuevo voto.</li>
    </ol>

    <h2>Por que la suite de Fibonacci?</h2>
    <p>
      La suite <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> es la mas extendida porque modela
      la incertidumbre creciente: cuanto mas grande es una tarea, menos se puede estimar con
      precision. La diferencia entre los valores crece con el tamano, lo que
      <strong>obliga al equipo a posicionarse claramente</strong> sin pretender una precision ilusoria.
    </p>

    <h2>Comparacion de secuencias de cartas</h2>
    <table>
      <thead>
        <tr><th>Secuencia</th><th>Valores</th><th>Ideal para</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fibonacci</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Equipos Scrum con experiencia, estimacion en puntos de historia</td>
        </tr>
        <tr>
          <td><strong>T-shirt</strong></td>
          <td>XS, S, M, L, XL, XXL, ?</td>
          <td>Estimaciones aproximadas, equipos no tecnicos, clasificacion de backlog</td>
        </tr>
        <tr>
          <td><strong>Potencias de 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Tareas tecnicas con duplicacion de complejidad previsible</td>
        </tr>
      </tbody>
    </table>

    <h2>Preguntas frecuentes</h2>

    <details>
      <summary>Cual es la diferencia entre puntos de historia y dias?</summary>
      <p>
        Los puntos de historia miden la <strong>complejidad relativa</strong>, no el tiempo.
        Un 5 es aproximadamente 2,5 veces mas complejo que un 2, independientemente de la
        duracion real. Esta abstraccion permite comparar tareas sin quedarse bloqueado en
        las duraciones individuales.
      </p>
    </details>

    <details>
      <summary>Como gestionar las divergencias de estimacion?</summary>
      <p>
        Cuando las estimaciones divergen (por ejemplo, un 2 y un 13 en la misma mano),
        pide a las personas que votaron en los extremos que expliquen su eleccion.
        La discusion a menudo revela diferentes hipotesis o riesgos no identificados.
        Vuelve a votar hasta la convergencia.
      </p>
    </details>

    <details>
      <summary>El planning poker funciona para equipos remotos?</summary>
      <p>
        Si, precisamente para eso existe CleanPoker. Crea una sesion, comparte la URL,
        cada participante vota desde su propio dispositivo. Los resultados se revelan en
        tiempo real via WebSocket, sin ninguna configuracion ni cuenta que crear.
      </p>
    </details>

    <div class="cta">
      <a href="/es" class="btn">Crear una sesion gratuita →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Codigo fuente</a>
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
