<svelte:head>
  <title>Fibonacci no planning poker: por que e como usar | CleanPoker</title>
  <meta name="description" content="Por que as equipes ágeis usam a sequência de Fibonacci no planning poker? Psicologia, seleção de cartas e comparação com outras escalas." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/fibonacci" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/fibonacci" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/fibonacci" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/fibonacci" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/fibonacci" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/fibonacci" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/fibonacci" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt/a-propos" class="back-link">← Sobre</a>

    <h1>Fibonacci no planning poker</h1>

    <p>
      A sequência de Fibonacci é a base do planning poker. Entender <em>por que</em> ela
      funciona ajuda as equipes a usá-la melhor e escolher a escala certa para o contexto.
    </p>

    <h2>O que é a sequência de Fibonacci?</h2>
    <p>
      A sequência de Fibonacci é <strong>1, 1, 2, 3, 5, 8, 13, 21, 34…</strong> onde cada
      número é a soma dos dois anteriores. No planning poker usa-se tipicamente
      <strong>1, 2, 3, 5, 8, 13, 21</strong> mais a carta <strong>?</strong>.
    </p>
    <p>
      A propriedade-chave: <strong>as lacunas crescem com o valor</strong>. Isso reflete
      como a cognição humana funciona diante da incerteza.
    </p>

    <h2>Por que Fibonacci em vez de 1-10?</h2>
    <p>
      Uma escala linear cria uma falsa precisão. Com Fibonacci a escolha é mais grossa:
      é um 5 ou um 8? Isso é uma diferença significativa que <strong>estimula a discussão</strong>
      em vez da aritmética de pontos.
    </p>

    <h2>A carta ?: um sinal subutilizado</h2>
    <p>
      A carta <strong>?</strong> significa "não consigo estimar esta história". Razões válidas:
      critérios de aceitação pouco claros, dependências técnicas não resolvidas, história
      grande demais, ou falta de contexto. Deve sempre desencadear uma discussão.
    </p>

    <h2>Fibonacci padrão vs. modificado</h2>
    <table>
      <thead>
        <tr><th>Escala</th><th>Valores</th><th>Ideal para</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Padrão</strong></td><td>1, 2, 3, 5, 8, 13, 21, ?</td><td>A maioria das equipes Scrum</td></tr>
        <tr><td><strong>Modificado</strong></td><td>0, 0,5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?</td><td>Equipes com tarefas muito pequenas e epics no mesmo backlog</td></tr>
        <tr><td><strong>Potências de 2</strong></td><td>1, 2, 4, 8, 16, 32, 64, ?</td><td>Equipes técnicas com complexidade previsível</td></tr>
      </tbody>
    </table>

    <h2>Perguntas frequentes</h2>

    <details>
      <summary>Por que o planning poker usa números de Fibonacci?</summary>
      <p>
        Os números de Fibonacci modelam a incerteza crescente: quanto maior a tarefa, menos
        precisamente pode ser estimada. A lacuna crescente entre valores obriga a equipe a se
        posicionar claramente sem pretender falsa precisão.
      </p>
    </details>

    <details>
      <summary>Existe um valor Fibonacci correto para uma tarefa?</summary>
      <p>
        Não. Os story points são relativos ao quadro de referência da equipe. O que importa
        é a consistência ao longo do tempo para que a velocidade seja uma ferramenta de
        planejamento confiável.
      </p>
    </details>

    <div class="cta">
      <a href="/pt" class="btn">Experimentar com CleanPoker →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Código fonte</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licença MIT</a>
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
