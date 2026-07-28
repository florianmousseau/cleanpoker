<svelte:head>
  <title>Alternativas ao planning poker: estimativas de camiseta, dot voting e mais | CleanPoker</title>
  <meta name="description" content="Comparativo das melhores alternativas ao planning poker: estimativas de camiseta, affinity mapping, dot voting e bucket system." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/alternatives" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/alternatives" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/alternatives" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/alternatives" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/alternatives" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/alternatives" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/alternatives" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Alternativas ao planning poker: estimativas de camiseta, dot voting e mais',
    url: 'https://cleanpoker.dev/pt/alternatives',
    description: 'Comparativo das principais alternativas ao planning poker: estimativas de camiseta, affinity mapping, dot voting e bucket system.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quais são as principais alternativas ao planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'As principais alternativas ao planning poker são: estimativas de tamanho de camiseta (XS a XXL), affinity mapping (agrupamento de histórias por tamanho), dot voting (alocação de votos) e o bucket system (classificação de histórias em buckets de tamanho predefinidos). Cada uma troca precisão por velocidade.' },
      },
      {
        '@type': 'Question',
        name: 'Quando usar estimativas de camiseta em vez de planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use estimativas de camiseta quando precisar de estimativas rápidas, quando estimar com partes interessadas não técnicas ou quando refinar um backlog grande no início de um projeto. Mude para planning poker (Fibonacci) quando precisar de rastreamento de velocidade ao longo dos sprints.' },
      },
      {
        '@type': 'Question',
        name: 'O que é affinity mapping em agile?',
        acceptedAnswer: { '@type': 'Answer', text: 'O affinity mapping é uma técnica silenciosa e colaborativa onde os membros da equipe colocam simultaneamente histórias em buckets de tamanho (XS a XL). Os desacordos são discutidos apenas para os valores extremos. É mais rápido que o planning poker para backlogs grandes.' },
      },
      {
        '@type': 'Question',
        name: 'O que é o bucket system na estimativa ágil?',
        acceptedAnswer: { '@type': 'Answer', text: 'O bucket system usa buckets numéricos predefinidos (ex. 1, 2, 3, 5, 8, 13, 20, 40, 100). As histórias são classificadas em buckets por comparação com uma história de referência. É muito mais rápido que o planning poker para backlogs grandes (50+ histórias).' },
      },
      {
        '@type': 'Question',
        name: 'O planning poker é sempre a melhor técnica de estimativa ágil?',
        acceptedAnswer: { '@type': 'Answer', text: 'Não. O planning poker é melhor para estimativas em nível de sprint de histórias bem definidas em equipes estabelecidas. Para backlogs grandes, projetos em estágio inicial ou públicos não técnicos, o affinity mapping ou as estimativas de camiseta são mais rápidos e igualmente precisos.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt/a-propos" class="back-link">← Sobre</a>

    <h1>Alternativas ao planning poker</h1>

    <p>O planning poker não é a única forma de estimar. Dependendo do tamanho da equipe, da profundidade do backlog e dos objetivos, outra técnica pode ser mais rápida e igualmente eficaz.</p>

    <h2>Técnica</h2>
    <table>
      <thead>
        <tr><th>Técnica</th><th>Velocidade</th><th>Precisão</th><th>Ideal para</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Planning poker</strong></td><td>Médio</td><td>Alta</td><td>Estimativa de sprint de histórias bem definidas</td></tr>
        <tr><td><strong>Estimativas de camiseta</strong></td><td>Rápido</td><td>Baixa-média</td><td>Grooming rápido do backlog, stakeholders não técnicos</td></tr>
        <tr><td><strong>Affinity mapping</strong></td><td>Muito rápido</td><td>Média</td><td>Backlogs grandes (20+ histórias)</td></tr>
        <tr><td><strong>Bucket system</strong></td><td>Muito rápido</td><td>Média</td><td>Backlogs muito grandes (50+ histórias)</td></tr>
        <tr><td><strong>Dot voting</strong></td><td>Rápido</td><td>Baixa</td><td>Priorização, não estimativa</td></tr>
      </tbody>
    </table>

    <h2>FAQ</h2>

    <details>
      <summary>Quais são as principais alternativas ao planning poker?</summary>
      <p>As principais alternativas são: estimativas de camiseta (XS a XXL), affinity mapping, dot voting e bucket system. Cada uma troca alguma precisão por velocidade.</p>
    </details>

    <details>
      <summary>Quando usar estimativas de camiseta em vez de planning poker?</summary>
      <p>Use estimativas de camiseta para estimativas rápidas, com stakeholders não técnicos, ou para refinar um backlog grande no início do projeto. Mude para planning poker Fibonacci quando precisar de rastreamento de velocidade.</p>
    </details>

    <div class="cta">
      <a href="/pt" class="btn">Experimentar planning poker com CleanPoker →</a>
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
