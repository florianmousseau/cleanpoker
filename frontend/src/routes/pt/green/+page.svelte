<svelte:head>
  <title>Eco-design & tecnologia responsável | CleanPoker</title>
  <meta name="description" content="Declaração de eco-design do CleanPoker. Bundle JS abaixo de 50 KB brotli, sem rastreio comportamental, zero cookies publicitários, alojamento 100% energia renovável, Lighthouse Performance 100, CO2 abaixo de 0,1 g por visita." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/green" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/green" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/green" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/green" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/green" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/green" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/green" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Eco-design: CleanPoker',
    url: 'https://cleanpoker.dev/pt/green',
    description: 'Declaração de eco-design do CleanPoker. Bundle JS abaixo de 50 KB brotli, sem rastreio comportamental, zero cookies publicitários, alojamento 100% energia renovável, Lighthouse Performance 100, CO2 abaixo de 0,1 g por visita.',
    keywords: 'eco-design, green IT, tecnologia responsável, planning poker ecológico, zero rastreadores, alojamento verde, energia renovável, Lighthouse 100, bundle leve, baixo CO2',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      sustainabilityNote: 'Alojado em energia renovável (Cloudflare Pages + Fly.io CDG Paris). Bundle JS abaixo de 50 KB brotli. Um único script de terceiros, um contador de páginas vistas sem cookies. CO2 abaixo de 0,1 g por visita.',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt" class="back-link">← Voltar ao início</a>

    <h1>Eco-design: CleanPoker, tecnologia digital responsável</h1>

    <p>
      <strong>CleanPoker</strong> é concebido segundo os princípios da <strong>tecnologia digital responsável</strong>:
      cada decisão técnica visa reduzir a pegada de carbono, eliminar dependências desnecessárias
      e respeitar a privacidade dos utilizadores. Não é um rótulo adicionado a posteriori,
      é o ADN do projeto.
    </p>

    <h2>Números-chave</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Métrica</th><th>Valor</th></tr>
        </thead>
        <tbody>
          <tr><td>Bundle JS partilhado (brotli, validado por CI)</td><td><strong>&lt; 50 KB</strong></td></tr>
          <tr><td>CO₂ estimado por visita</td><td><strong>&lt; 0,1 g</strong></td></tr>
          <tr><td>Lighthouse Performance</td><td><strong>100 / 100</strong></td></tr>
          <tr><td>Lighthouse Acessibilidade</td><td><strong>100 / 100</strong></td></tr>
          <tr><td>Pedidos a terceiros</td><td><strong>1</strong> (o contador de páginas vistas)</td></tr>
          <tr><td>Rastreio comportamental</td><td><strong>0</strong> (o contador não cria qualquer identificador)</td></tr>
          <tr><td>Cookies publicitários</td><td><strong>0</strong></td></tr>
          <tr><td>Google Fonts carregadas</td><td><strong>0</strong></td></tr>
          <tr><td>RAM do servidor</td><td><strong>~15 MB</strong> (binário Go)</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Escolhas técnicas para reduzir o impacto</h2>
    <ul>
      <li><strong>Sem framework CSS</strong> (Tailwind, Bootstrap...): CSS vanilla, zero código morto</li>
      <li><strong>Sem Google Fonts</strong>: apenas fontes do sistema, sem pedidos de rede</li>
      <li><strong>Sem DOM virtual</strong>: SvelteKit compila para JavaScript vanilla, bundle mínimo</li>
      <li><strong>Sem base de dados</strong>: sessões em memória Go, eliminadas automaticamente após 24h de inatividade</li>
      <li><strong>Um único script de terceiros</strong>: um contador de páginas vistas sem cookies, e nenhum SDK de Analytics, Chat ou A/B testing</li>
      <li><strong>Compressão Brotli</strong>: mais eficiente que gzip, ativada por defeito no Cloudflare</li>
      <li><strong>Backend Go</strong>: binário nativo ~15 MB RAM, sem JVM ou Node.js para manter</li>
      <li><strong>WebSocket nativo</strong>: sem polling HTTP, ligação persistente leve</li>
      <li><strong>Imagens do sistema</strong>: favicon SVG, sem PNG pesado, sem sprite</li>
    </ul>

    <h2>Alojamento em energia renovável</h2>
    <ul>
      <li>
        <strong>Frontend: Cloudflare Pages</strong> - CDN mundial, certificado 100% energia renovável.
        O Cloudflare está listado na base de dados da The Green Web Foundation.
      </li>
      <li>
        <strong>Backend: Fly.io CDG (Paris, França)</strong> - fornecedor certificado em energia renovável,
        dados alojados em França, latência mínima para equipas europeias.
      </li>
    </ul>

    <h2>O que o CleanPoker NÃO faz</h2>
    <ul>
      <li>Sem Google Analytics nem qualquer ferramenta de rastreamento comportamental</li>
      <li>Sem publicidade, sem monetização, sem freemium</li>
      <li>Sem cookies de terceiros (apenas o Cloudflare pode depositar <code>__cf_bm</code>, um cookie de segurança estritamente necessário)</li>
      <li>Sem dados pessoais guardados no seu navegador (apenas as suas preferências de idioma e tema)</li>
      <li>Sem fontes, ícones ou scripts carregados de CDNs de terceiros (jsDelivr, cdnjs, unpkg...)</li>
      <li>Sem email marketing, sem contas de utilizador, sem base de dados permanente</li>
    </ul>

    <h2>Verificação externa</h2>
    <p>Estas ferramentas independentes permitem verificar os compromissos acima:</p>
    <ul>
      <li>
        <a href="https://www.websitecarbon.com/website/cleanpoker-dev/" rel="noopener noreferrer">
          Website Carbon: pegada de CO₂ de cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://www.thegreenwebfoundation.org/green-web-check/?url=cleanpoker.dev" rel="noopener noreferrer">
          The Green Web Foundation: verificar o alojamento verde de cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://sonarcloud.io/project/overview?id=florianmousseau_cleanpoker" rel="noopener noreferrer">
          SonarCloud: qualidade e segurança do código
        </a>
      </li>
      <li>
        <a href="https://github.com/florianmousseau/cleanpoker/actions" rel="noopener noreferrer">
          GitHub Actions: resultados do Lighthouse CI e Eco-CI
        </a>
      </li>
    </ul>

    <h2>Melhoria contínua</h2>
    <p>
      O tamanho do bundle JS é verificado a cada mudança e bloqueia o deployment se exceder
      o limite. As pontuações Lighthouse e o consumo energético do pipeline (Eco-CI) são
      medidos a cada deployment e publicados nos resultados da CI.
    </p>

    <h2>Data de atualização</h2>
    <p>Esta declaração foi estabelecida em junho de 2026.</p>
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
  .page {
    padding-top: 2rem;
    padding-bottom: 4rem;
    max-width: 48rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }

  p, li { line-height: 1.7; }

  ul {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  th, td {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  th {
    background: var(--color-surface);
    font-weight: 700;
  }

  tr:nth-child(even) td {
    background: var(--color-surface);
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
