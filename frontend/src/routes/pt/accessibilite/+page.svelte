<svelte:head>
  <title>Acessibilidade & deficiencia | CleanPoker planning poker inclusivo</title>
  <meta name="description" content="CleanPoker e uma ferramenta de planning poker totalmente acessivel a pessoas com deficiencia. Navegacao por teclado, leitores de ecra (NVDA, VoiceOver, JAWS), conformidade WCAG 2.1 AA." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/accessibilite" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/accessibilite" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/accessibilite" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/accessibilite" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/accessibilite" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/accessibilite" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/accessibilite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Declaração de acessibilidade: CleanPoker',
    url: 'https://cleanpoker.dev/pt/accessibilite',
    description: 'CleanPoker é uma ferramenta de planning poker totalmente acessível a pessoas com deficiência. Navegação por teclado completa, compatível com leitores de ecrã NVDA, VoiceOver e JAWS. Conformidade WCAG 2.1 AA.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      accessibilityFeature: ['highContrastDisplay','readingOrder','structuralNavigation','alternativeText','displayTransformability'],
      accessibilityHazard: ['noFlashingHazard','noMotionSimulationHazard','noSoundHazard'],
      accessibilityControl: ['fullKeyboardControl','fullMouseControl','fullTouchControl'],
      accessibilityAPI: 'ARIA',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt" class="back-link">← Voltar ao início</a>

    <h1>Acessibilidade: CleanPoker para equipas inclusivas</h1>

    <p>
      <strong>CleanPoker</strong> é uma ferramenta de planning poker concebida para ser utilizável por todos,
      incluindo pessoas com deficiência: utilizadores de leitores de ecrã,
      pessoas que navegam exclusivamente com o teclado, pessoas com baixa visão ou perturbações motoras.
      Está em conformidade com as diretrizes <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 nível AA.
    </p>

    <h2>Para quem?</h2>
    <p>O CleanPoker é adequado para:</p>
    <ul>
      <li>Pessoas cegas ou com baixa visão que utilizam um leitor de ecrã (NVDA, VoiceOver, JAWS)</li>
      <li>Pessoas com perturbações motoras que navegam exclusivamente com o teclado</li>
      <li>Pessoas sensíveis a animações (epilepsia, perturbações vestibulares)</li>
      <li>Pessoas que utilizam o zoom do navegador até 200%</li>
      <li>Equipas ágeis que desejam incluir membros com deficiência</li>
    </ul>

    <h2>Estado de conformidade</h2>
    <p>O CleanPoker está em <strong>conformidade parcial</strong> com os critérios WCAG 2.1 AA.
    A acessibilidade foi integrada desde a fase de conceção, não adicionada posteriormente.
    A pontuação do Lighthouse Acessibilidade é de <strong>100/100</strong>.</p>

    <h2>Compatibilidade com tecnologias de apoio</h2>
    <ul>
      <li><strong>NVDA</strong> (Windows): testado com Firefox</li>
      <li><strong>VoiceOver</strong> (macOS / iOS): testado com Safari</li>
      <li><strong>JAWS</strong> (Windows): compatível via HTML semântico e ARIA</li>
      <li>Navegação completa por teclado: Tab, Shift+Tab, Enter, Espaço, setas</li>
    </ul>

    <h2>Medidas técnicas implementadas</h2>
    <ul>
      <li>Hiperligação de salto ("Ir para o conteúdo principal") no início da página</li>
      <li>Navegação completa por teclado (Tab, Enter, Espaço)</li>
      <li>Zonas <code>aria-live="polite"</code> para atualizações de votos em tempo real</li>
      <li>Estados <code>aria-pressed</code> nas cartas de votação</li>
      <li>Contrastes que cumprem o rácio mínimo de 4,5:1</li>
      <li>Sem <code>user-scalable=no</code> (zoom do navegador livre)</li>
      <li>Suporte de <code>prefers-reduced-motion</code> (sem animações impostas)</li>
      <li>Suporte do modo escuro (<code>prefers-color-scheme</code>)</li>
      <li>HTML5 semântico: <code>&lt;button&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;table&gt;</code></li>
      <li>Unidades <code>rem</code>: o zoom do navegador funciona corretamente</li>
      <li>Botões e hiperligações com labels explícitas (<code>aria-label</code>)</li>
    </ul>

    <h2>Tecnologias utilizadas</h2>
    <ul>
      <li>HTML5 semântico</li>
      <li>CSS com unidades <code>rem</code> (zoom respeitado)</li>
      <li>JavaScript (SvelteKit)</li>
      <li>WebSocket para tempo real</li>
      <li>WAI-ARIA para componentes interativos</li>
    </ul>

    <h2>Limitações conhecidas</h2>
    <p>Não foram identificadas limitações importantes até à data. Este site é mantido ativamente e auditado regularmente.</p>

    <h2>Reportar um problema</h2>
    <p>
      Para reportar um problema de acessibilidade ou sugerir uma melhoria:
      <a href="https://github.com/florianmousseau/cleanpoker/issues" rel="noopener noreferrer">
        abrir um issue no GitHub
      </a>
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
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
