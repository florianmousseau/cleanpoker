<svelte:head>
  <title>Fibonacci en planning poker: por qué y cómo usarlo | CleanPoker</title>
  <meta name="description" content="¿Por qué los equipos ágiles usan la secuencia de Fibonacci en planning poker? Psicología, selección de cartas y comparación con otras escalas." />
  <link rel="canonical" href="https://cleanpoker.dev/es/fibonacci" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/fibonacci" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/fibonacci" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/fibonacci" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/fibonacci" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/fibonacci" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/fibonacci" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es/a-propos" class="back-link">← Acerca de</a>

    <h1>Fibonacci en planning poker</h1>

    <p>
      La secuencia de Fibonacci es la base del planning poker. Entender <em>por qué</em>
      funciona ayuda a los equipos a usarla mejor y elegir la escala correcta.
    </p>

    <h2>¿Qué es la secuencia de Fibonacci?</h2>
    <p>
      La secuencia de Fibonacci es <strong>1, 1, 2, 3, 5, 8, 13, 21, 34…</strong> donde cada
      número es la suma de los dos anteriores. En planning poker se usa típicamente
      <strong>1, 2, 3, 5, 8, 13, 21</strong> más la carta <strong>?</strong>.
    </p>
    <p>
      La propiedad clave: <strong>las brechas crecen con el número</strong>. Entre 1 y 2 la
      brecha es 1. Entre 13 y 21 es 8. Esto refleja cómo funciona la cognición humana ante
      la incertidumbre.
    </p>

    <h2>¿Por qué Fibonacci en lugar de 1-10?</h2>
    <p>
      Una escala lineal crea una falsa precisión. ¿Es esta tarea un 6 o un 7? Los equipos
      pierden tiempo en distinciones sin valor real. Con Fibonacci la elección es más gruesa:
      ¿es un 5 o un 8? Eso es una diferencia significativa que <strong>impulsa la discusión</strong>.
    </p>

    <h2>La carta ?: una señal infrautilizada</h2>
    <p>
      La carta <strong>?</strong> significa "no puedo estimar esta historia". Razones válidas:
      criterios de aceptación poco claros, dependencias técnicas sin resolver, historia
      demasiado grande para estimar, o falta de contexto. Siempre debe desencadenar una
      discusión de clarificación.
    </p>

    <h2>Fibonacci estándar vs. modificado</h2>
    <table>
      <thead>
        <tr><th>Escala</th><th>Valores</th><th>Mejor para</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Estándar</strong></td><td>1, 2, 3, 5, 8, 13, 21, ?</td><td>La mayoría de equipos Scrum</td></tr>
        <tr><td><strong>Modificado</strong></td><td>0, 0,5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?</td><td>Equipos con tareas muy pequeñas y epics en el mismo backlog</td></tr>
        <tr><td><strong>Potencias de 2</strong></td><td>1, 2, 4, 8, 16, 32, 64, ?</td><td>Equipos técnicos con complejidad predecible</td></tr>
      </tbody>
    </table>

    <h2>Preguntas frecuentes</h2>

    <details>
      <summary>¿Por qué el planning poker usa números de Fibonacci?</summary>
      <p>
        Modelan la incertidumbre creciente: cuanto más grande es una tarea, menos precisamente
        se puede estimar. La brecha creciente entre valores obliga al equipo a posicionarse
        claramente sin pretender una falsa precisión.
      </p>
    </details>

    <details>
      <summary>¿Existe un valor Fibonacci correcto para una tarea dada?</summary>
      <p>
        No. Los story points son relativos al marco de referencia del equipo. Lo que importa
        es la coherencia en el tiempo para que la velocidad sea una herramienta de planificación
        fiable.
      </p>
    </details>

    <div class="cta">
      <a href="/es" class="btn">Probar con CleanPoker →</a>
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
