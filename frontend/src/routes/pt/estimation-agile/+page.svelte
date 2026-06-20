<svelte:head>
  <title>Estimativa ágil: story points, velocidade e planejamento de sprint | CleanPoker</title>
  <meta name="description" content="Guia completo de estimativa ágil: story points vs horas, como a velocidade funciona, planejamento de capacidade e erros comuns." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/estimation-agile" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/estimation-agile" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/estimation-agile" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/estimation-agile" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/estimation-agile" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/estimation-agile" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/estimation-agile" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Estimativa ágil: story points, velocidade e planejamento de sprint',
    url: 'https://cleanpoker.dev/pt/estimation-agile',
    description: 'Guia completo de estimativa ágil: story points, velocidade, planejamento de capacidade e erros comuns.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qual é a diferença entre story points e horas?',
        acceptedAnswer: { '@type': 'Answer', text: 'Os story points medem complexidade relativa, não tempo. Uma história de 5 pontos é aproximadamente o dobro de complexa que uma de 3 pontos, independentemente de quem a implementa ou quanto tempo leva. As horas variam por desenvolvedor e contexto; a complexidade é relativa à equipe e estável.' },
      },
      {
        '@type': 'Question',
        name: 'O que é velocidade em agile?',
        acceptedAnswer: { '@type': 'Answer', text: 'A velocidade é o número de story points que uma equipe conclui por sprint em média. Após 3-5 sprints, a velocidade se estabiliza e se torna um input confiável para o planejamento de releases e o comprometimento de sprint.' },
      },
      {
        '@type': 'Question',
        name: 'A equipe deve estimar bugs e dívida técnica?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sim. Se um bug exige esforço significativo, estime-o. Se o trabalho de dívida técnica estiver planejado em um sprint, ele deve ser estimado e contado na velocidade. Ignorá-lo produz uma velocidade inflada que engana o planejamento.' },
      },
      {
        '@type': 'Question',
        name: 'Qual é a velocidade correta da equipe?',
        acceptedAnswer: { '@type': 'Answer', text: 'Não há uma velocidade universalmente correta. Uma equipe de 4 entregando 30 pontos por sprint não é melhor ou pior do que uma equipe de 6 entregando 60 pontos. A velocidade é uma métrica interna da equipe para previsões, não um benchmark de desempenho.' },
      },
      {
        '@type': 'Question',
        name: 'Quantos sprints leva para a velocidade se estabilizar?',
        acceptedAnswer: { '@type': 'Answer', text: 'Tipicamente 3 a 5 sprints. O primeiro sprint costuma ser mais baixo enquanto a equipe se calibra. No sprint 4 ou 5, a média se torna confiável o suficiente para prever datas de release.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt/a-propos" class="back-link">← Sobre</a>

    <h1>Estimativa ágil: guia completo</h1>

    <p>
      A estimativa ágil não serve para prever o futuro. Serve para
      <strong>revelar o que a equipe ainda não sabe</strong>. Uma boa sessão de estimativa
      revela complexidade oculta, suposições implícitas e dependências não resolvidas.
    </p>

    <h2>Story points vs. horas</h2>
    <p>
      Os <strong>story points</strong> medem a complexidade relativa dentro da equipe.
      Uma história de 5 pontos é aproximadamente o dobro em complexidade de uma de 3 pontos,
      independentemente de quem a implementa. As horas variam; a complexidade relativa
      é estável.
    </p>

    <h2>Como a velocidade funciona</h2>
    <p>
      A velocidade é o número de story points que uma equipe conclui por sprint em média.
      Após 3 a 5 sprints ela se estabiliza e se torna uma ferramenta confiável para
      planejamento de releases e compromisso de sprint.
    </p>

    <h2>Erros comuns de estimativa</h2>
    <table>
      <thead>
        <tr><th>Erro</th><th>Por que prejudica</th><th>Correção</th></tr>
      </thead>
      <tbody>
        <tr><td>Estimar em horas</td><td>Ancora na velocidade individual, não na complexidade</td><td>Mudar para story points relativos</td></tr>
        <tr><td>Revelar votos não simultaneamente</td><td>Elimina a estimativa independente</td><td>Revelar sempre simultaneamente</td></tr>
        <tr><td>Ignorar bugs na estimativa</td><td>Infla a velocidade e engana o planejamento</td><td>Estimar bugs que exijam esforço real</td></tr>
        <tr><td>Comparar velocidades entre equipes</td><td>Escalas e contextos diferentes</td><td>Velocidade é apenas uma métrica interna</td></tr>
      </tbody>
    </table>

    <h2>Perguntas frequentes</h2>

    <details>
      <summary>Qual é a diferença entre story points e horas?</summary>
      <p>
        Story points medem complexidade relativa, não tempo. Uma história de 5 pontos é
        aproximadamente o dobro em complexidade de uma de 3 pontos, independentemente do
        desenvolvedor.
      </p>
    </details>

    <details>
      <summary>Quantos sprints são necessários para a velocidade se estabilizar?</summary>
      <p>
        Tipicamente de 3 a 5 sprints. O primeiro sprint costuma ser mais baixo enquanto a
        equipe calibra sua estimativa. A partir do sprint 4 ou 5, a média é confiável o
        suficiente para prever datas de entrega.
      </p>
    </details>

    <div class="cta">
      <a href="/pt" class="btn">Criar sessão com CleanPoker →</a>
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
