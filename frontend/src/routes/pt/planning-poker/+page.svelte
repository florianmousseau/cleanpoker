<svelte:head>
  <title>Planning poker: regras, Fibonacci e guia prático | CleanPoker</title>
  <meta name="description" content="O que é o planning poker? Regras, suite de Fibonacci, T-shirt sizing, dicas para estimar histórias de utilizador em equipa ágil. Guia completo gratuito." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/planning-poker" />
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
        name: 'O que é o planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'O planning poker é uma técnica de estimação ágil utilizada em Scrum. Cada membro da equipa escolhe secretamente uma carta com a sua estimação de uma história de utilizador, depois todos a revelam simultaneamente. As divergências desencadeiam uma discussão que afina a estimação coletiva.' },
      },
      {
        '@type': 'Question',
        name: 'Por que usar a suite de Fibonacci no planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'A suite de Fibonacci (1, 2, 3, 5, 8, 13, 21) reflete a incerteza crescente: quanto maior for uma tarefa, menos precisamente pode ser estimada. A diferença entre os valores aumenta, o que obriga a equipa a posicionar-se claramente sem uma sobre-precisão artificial.' },
      },
      {
        '@type': 'Question',
        name: 'Qual é a diferença entre pontos de história e dias?',
        acceptedAnswer: { '@type': 'Answer', text: 'Os pontos de história medem o esforço relativo, não o tempo: o volume de trabalho, a incerteza e a complexidade tomados em conjunto. A escala é relativa, portanto um 5 é claramente maior que um 2 sem afirmar uma proporção exata. Esta abstração permite comparar tarefas sem ficar bloqueado nas durações individuais.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt/a-propos" class="back-link">← Sobre</a>

    <h1>Planning poker: guia completo</h1>

    <p>
      O <strong>planning poker</strong> é a técnica de estimação mais utilizada em
      <strong>Scrum</strong> e agilidade. Em 5 minutos, tudo o que precisa de saber.
    </p>

    <h2>O que é o planning poker?</h2>
    <p>
      O planning poker (também chamado <em>Scrum poker</em>) é uma técnica de estimação
      colaborativa onde cada membro da equipa escolhe <strong>secretamente</strong> uma carta
      com a sua estimação de uma história de utilizador ou tarefa. Todos revelam as suas cartas
      <strong>simultaneamente</strong>. As divergências desencadeiam uma discussão curta,
      depois a equipa volta a votar até convergir.
    </p>

    <h2>As regras em 5 passos</h2>
    <ol>
      <li>O Product Owner apresenta uma história de utilizador ou tarefa.</li>
      <li>A equipa coloca questões de clarificação.</li>
      <li>Cada membro escolhe secretamente uma carta (sem influenciar os outros).</li>
      <li>Todos revelam simultaneamente.</li>
      <li>Se as estimativas convergirem: retemos o valor. Se não: discussão dos extremos, depois nova votação.</li>
    </ol>

    <h2>Por que a suite de Fibonacci?</h2>
    <p>
      A suite <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> é a mais utilizada porque modela
      a incerteza crescente: quanto maior for uma tarefa, menos precisamente pode ser estimada.
      A diferença entre os valores cresce com o tamanho, o que
      <strong>obriga a equipa a posicionar-se claramente</strong> sem pretender uma precisão ilusória.
    </p>

    <h2>Comparação das sequências de cartas</h2>
    <table>
      <thead>
        <tr><th>Sequência</th><th>Valores</th><th>Ideal para</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fibonacci</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Equipas Scrum experientes, estimação em pontos de história</td>
        </tr>
        <tr>
          <td><strong>T-shirt</strong></td>
          <td>XS, S, M, L, XL, XXL, ?</td>
          <td>Estimativas aproximadas, equipas não técnicas, triagem de backlog</td>
        </tr>
        <tr>
          <td><strong>Potências de 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Tarefas técnicas com duplicação de complexidade previsível</td>
        </tr>
      </tbody>
    </table>

    <h2>Perguntas frequentes</h2>

    <details>
      <summary>Qual é a diferença entre pontos de história e dias?</summary>
      <p>
        Os pontos de história medem o <strong>esforço relativo</strong>, não o tempo: o volume
        de trabalho, a incerteza e a complexidade tomados em conjunto. A escala é relativa - um 5
        é claramente maior que um 2, sem afirmar uma proporção exata. Esta abstração permite
        comparar tarefas sem ficar bloqueado nas durações individuais.
      </p>
    </details>

    <details>
      <summary>Como gerir as divergências de estimação?</summary>
      <p>
        Quando as estimativas divergem (por exemplo, um 2 e um 13 na mesma mão), peça as pessoas
        que votaram nos extremos para explicarem a sua escolha. A discussão muitas vezes revela
        hipóteses diferentes ou riscos não identificados. Vote novamente até convergir.
      </p>
    </details>

    <details>
      <summary>O planning poker funciona para equipas remotas?</summary>
      <p>
        Sim, é precisamente para isso que o CleanPoker existe. Crie uma sessão, partilhe o URL,
        cada participante vota no seu próprio dispositivo. Os resultados são revelados em tempo
        real via WebSocket, sem configuração nem conta a criar.
      </p>
    </details>

    <div class="cta">
      <a href="/pt" class="btn">Criar uma sessão gratuita →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Código fonte</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licença MIT</a>
      | <a href="/pt/a-propos">Sobre</a>
      | <a href="/pt/mentions-legales">Aviso legal</a>
      | <a href="/pt/mentions-legales#confidentialite">Privacidade</a>
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
