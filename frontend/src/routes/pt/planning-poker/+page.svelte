<svelte:head>
  <title>Planning poker: regras, Fibonacci e guia pratico | CleanPoker</title>
  <meta name="description" content="O que e o planning poker? Regras, suite de Fibonacci, T-shirt sizing, dicas para estimar historias de utilizador em equipa agil. Guia completo gratuito." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/planning-poker" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/planning-poker" />
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
        name: 'O que e o planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'O planning poker e uma tecnica de estimacao agil utilizada em Scrum. Cada membro da equipa escolhe secretamente uma carta com a sua estimacao de uma historia de utilizador, depois todos a revelam simultaneamente. As divergencias desencadeiam uma discussao que afina a estimacao coletiva.' },
      },
      {
        '@type': 'Question',
        name: 'Por que usar a suite de Fibonacci no planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'A suite de Fibonacci (1, 2, 3, 5, 8, 13, 21) reflete a incerteza crescente: quanto maior for uma tarefa, menos precisamente pode ser estimada. A diferenca entre os valores aumenta, o que obriga a equipa a posicionar-se claramente sem uma sobre-precisao artificial.' },
      },
      {
        '@type': 'Question',
        name: 'Qual e a diferenca entre pontos de historia e dias?',
        acceptedAnswer: { '@type': 'Answer', text: 'Os pontos de historia medem a complexidade relativa, nao o tempo. Um 5 e aproximadamente 2,5 vezes mais complexo do que um 2, independentemente da duracao real. Esta abstracao permite comparar tarefas sem ficar bloqueado nas duracoes individuais.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt/a-propos" class="back-link">← Sobre</a>

    <h1>Planning poker: guia completo</h1>

    <p>
      O <strong>planning poker</strong> e a tecnica de estimacao mais utilizada em
      <strong>Scrum</strong> e agilidade. Em 5 minutos, tudo o que precisa de saber.
    </p>

    <h2>O que e o planning poker?</h2>
    <p>
      O planning poker (tambem chamado <em>Scrum poker</em>) e uma tecnica de estimacao
      colaborativa onde cada membro da equipa escolhe <strong>secretamente</strong> uma carta
      com a sua estimacao de uma historia de utilizador ou tarefa. Todos revelam as suas cartas
      <strong>simultaneamente</strong>. As divergencias desencadeiam uma discussao curta,
      depois a equipa volta a votar ate convergir.
    </p>

    <h2>As regras em 5 passos</h2>
    <ol>
      <li>O Product Owner apresenta uma historia de utilizador ou tarefa.</li>
      <li>A equipa coloca questoes de clarificacao.</li>
      <li>Cada membro escolhe secretamente uma carta (sem influenciar os outros).</li>
      <li>Todos revelam simultaneamente.</li>
      <li>Se as estimativas convergirem: retemos o valor. Se nao: discussao dos extremos, depois nova votacao.</li>
    </ol>

    <h2>Por que a suite de Fibonacci?</h2>
    <p>
      A suite <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> e a mais utilizada porque modela
      a incerteza crescente: quanto maior for uma tarefa, menos precisamente pode ser estimada.
      A diferenca entre os valores cresce com o tamanho, o que
      <strong>obriga a equipa a posicionar-se claramente</strong> sem pretender uma precisao ilusoria.
    </p>

    <h2>Comparacao das sequencias de cartas</h2>
    <table>
      <thead>
        <tr><th>Sequencia</th><th>Valores</th><th>Ideal para</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fibonacci</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Equipas Scrum experientes, estimacao em pontos de historia</td>
        </tr>
        <tr>
          <td><strong>T-shirt</strong></td>
          <td>XS, S, M, L, XL, XXL, ?</td>
          <td>Estimativas aproximadas, equipas nao tecnicas, triagem de backlog</td>
        </tr>
        <tr>
          <td><strong>Potencias de 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Tarefas tecnicas com duplicacao de complexidade previsivel</td>
        </tr>
      </tbody>
    </table>

    <h2>Perguntas frequentes</h2>

    <details>
      <summary>Qual e a diferenca entre pontos de historia e dias?</summary>
      <p>
        Os pontos de historia medem a <strong>complexidade relativa</strong>, nao o tempo.
        Um 5 e aproximadamente 2,5 vezes mais complexo do que um 2, independentemente da duracao
        real. Esta abstracao permite comparar tarefas sem ficar bloqueado nas duracoes individuais.
      </p>
    </details>

    <details>
      <summary>Como gerir as divergencias de estimacao?</summary>
      <p>
        Quando as estimativas divergem (por exemplo, um 2 e um 13 na mesma mao), peca as pessoas
        que votaram nos extremos para explicarem a sua escolha. A discussao muitas vezes revela
        hipoteses diferentes ou riscos nao identificados. Vote novamente ate convergir.
      </p>
    </details>

    <details>
      <summary>O planning poker funciona para equipas remotas?</summary>
      <p>
        Sim, e precisamente para isso que o CleanPoker existe. Crie uma sessao, partilhe o URL,
        cada participante vota no seu proprio dispositivo. Os resultados sao revelados em tempo
        real via WebSocket, sem configuracao nem conta a criar.
      </p>
    </details>

    <div class="cta">
      <a href="/pt" class="btn">Criar uma sessao gratuita →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Codigo fonte</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licenca MIT</a>
      | <a href="/pt/a-propos">Sobre</a>
      | <a href="/pt/mentions-legales">Aviso legal</a>
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
