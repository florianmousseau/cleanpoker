<svelte:head>
  <title>Fibonacci en planning poker : pourquoi et comment l'utiliser | CleanPoker</title>
  <meta name="description" content="Pourquoi les équipes agiles utilisent-elles la suite de Fibonacci en planning poker ? Psychologie, choix des cartes et comparaison avec d'autres échelles." />
  <link rel="canonical" href="https://cleanpoker.dev/fr/fibonacci" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/fibonacci" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/fibonacci" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/fibonacci" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/fibonacci" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/fibonacci" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/fibonacci" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fibonacci en planning poker : pourquoi et comment l'utiliser",
    "url": "https://cleanpoker.dev/fr/fibonacci",
    "description": "Guide complet sur la suite de Fibonacci en estimation agile : psychologie, choix des cartes et comparaison avec autres échelles.",
    "isPartOf": { "@type": "WebApplication", "name": "CleanPoker", "url": "https://cleanpoker.dev" },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pourquoi le planning poker utilise-t-il les nombres de Fibonacci ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Les nombres de Fibonacci (1, 2, 3, 5, 8, 13, 21) modélisent incertitude croissante : plus une tâche est grande, moins on peut estimer précisément. écart croissant entre valeurs force équipe à prendre position sans fausse précision." },
      },
      {
        "@type": "Question",
        "name": "Que signifie la carte ? en planning poker ?",
        "acceptedAnswer": { "@type": "Answer", "text": "La carte ? signale que je ne peux pas estimer cette tâche. Indicateur sain que la story manque de clarté, est trop grande ou comporte des dépendances non résolues. Elle déclenche une discussion de clarification." },
      },
      {
        "@type": "Question",
        "name": "Fibonacci standard ou modifié : lequel choisir ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Fibonacci standard (1, 2, 3, 5, 8, 13, 21) convient à la plupart des équipes Scrum. Fibonacci modifié avec 0, 0,5 et valeurs au-delà de 21 est utile si équipe mélange très petites tâches et épopées. Commencer par le standard." },
      },
      {
        "@type": "Question",
        "name": "Existe-t-il une valeur Fibonacci correcte pour une tâche donnée ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Non. Les story points sont relatifs au référentiel de votre équipe. Objectif : cohérence dans le temps pour que vélocité devienne outil de planification fiable." },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/a-propos" class="back-link">← À propos</a>

    <h1>Fibonacci en planning poker</h1>

    <p>
      La suite de Fibonacci est le socle du planning poker. Comprendre <em>pourquoi</em> elle
      fonctionne aide les équipes à mieux l'utiliser, éviter les pièges courants et choisir
      la bonne échelle selon leur contexte.
    </p>

    <h2>Qu'est-ce que la suite de Fibonacci ?</h2>
    <p>
      La suite de Fibonacci est <strong>1, 1, 2, 3, 5, 8, 13, 21, 34…</strong> où chaque nombre
      est la somme des deux précédents. En planning poker, la suite est généralement réduite à
      <strong>1, 2, 3, 5, 8, 13, 21</strong> plus une carte <strong>?</strong>.
    </p>
    <p>
      La propriété clé : <strong>les écarts grandissent avec la valeur</strong>. Entre 1 et 2,
      l'écart est 1. Entre 13 et 21, il est 8. Ce n'est pas arbitraire, cela reflète la façon
      dont la cognition humaine fonctionne face à l'incertitude.
    </p>

    <h2>Pourquoi Fibonacci plutôt que 1 à 10 ?</h2>
    <p>
      Une échelle linéaire (1, 2, 3, 4, 5, 6, 7, 8, 9, 10) crée une fausse précision. Cette
      tâche est-elle un 6 ou un 7 ? Les équipes perdent du temps sur des distinctions sans
      valeur informationnelle réelle.
    </p>
    <p>
      Avec Fibonacci, le choix est toujours plus grossier : est-ce un 5 ou un 8 ? C'est une
      différence significative. <strong>La granularité forcée évite la paralysie d'analyse</strong>
      et pousse vers la discussion plutôt que l'arithmétique de points.
    </p>

    <h2>La carte ? : un signal sous-utilisé</h2>
    <p>
      La carte <strong>?</strong> est l'une des plus précieuses du jeu. Elle signifie :
      "Je ne peux pas estimer cette story." Raisons valides :
    </p>
    <ul>
      <li>Les critères d'acceptation ne sont pas clairs.</li>
      <li>La story dépend d'une décision technique non résolue.</li>
      <li>La story est trop grande pour être estimée telle quelle (nécessite un découpage).</li>
      <li>Le membre de l'équipe manque du contexte pour juger la complexité.</li>
    </ul>
    <p>
      Un vote <strong>?</strong> doit toujours déclencher une discussion. C'est un garde-fou
      qualité, pas un échec.
    </p>

    <h2>Fibonacci standard vs. modifié</h2>
    <table>
      <thead>
        <tr><th>Échelle</th><th>Valeurs</th><th>Idéal pour</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Standard</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>La plupart des équipes Scrum, estimation au sprint</td>
        </tr>
        <tr>
          <td><strong>Modifié</strong></td>
          <td>0, 0,5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?</td>
          <td>Équipes avec très petites tâches et grandes épopées dans le même backlog</td>
        </tr>
        <tr>
          <td><strong>Puissances de 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Équipes techniques où la complexité double de façon prévisible</td>
        </tr>
      </tbody>
    </table>

    <h2>Comment choisir sa carte</h2>
    <p>
      Les bons estimateurs pensent en tâches de référence. Avant votre première session,
      identifiez 2 ou 3 stories ancres que l'équipe connaît bien : une clairement à 1, une à 5,
      une à 13. Chaque nouvelle story est comparée à ces ancres plutôt qu'estimée isolément.
    </p>

    <h2>Questions fréquentes</h2>

    <details>
      <summary>Pourquoi le planning poker utilise-t-il les nombres de Fibonacci ?</summary>
      <p>
        Les nombres de Fibonacci modélisent l'incertitude croissante : plus une tâche est
        grande, moins on peut l'estimer précisément. L'écart croissant entre les valeurs force
        l'équipe à prendre position sans prétendre à une fausse précision.
      </p>
    </details>

    <details>
      <summary>Que signifie la carte ? en planning poker ?</summary>
      <p>
        La carte ? signale "je ne peux pas estimer cette tâche". C'est un indicateur sain que
        la story manque de clarté, est trop grande, ou comporte des dépendances non résolues.
        Elle déclenche une discussion de clarification avant tout chiffrage.
      </p>
    </details>

    <details>
      <summary>Faut-il utiliser Fibonacci standard ou modifié ?</summary>
      <p>
        Commencez avec le standard (1, 2, 3, 5, 8, 13, 21). Ajoutez 0 et 0,5 seulement si
        votre équipe débat régulièrement pour savoir si une tâche est "quasi-rien". Ajoutez des
        valeurs au-delà de 21 seulement si vous estimez des épopées aux côtés de stories de
        sprint. La simplicité préserve la fiabilité de la vélocité.
      </p>
    </details>

    <details>
      <summary>Existe-t-il une valeur Fibonacci correcte pour une tâche donnée ?</summary>
      <p>
        Non. Les story points sont relatifs au référentiel de votre équipe, pas au temps réel.
        Ce qui importe, c'est la cohérence : un 5 aujourd'hui doit sembler aussi complexe qu'un 5
        dans six mois. C'est cette cohérence qui rend la vélocité utile pour la planification.
      </p>
    </details>

    <div class="cta">
      <a href="/fr" class="btn">Essayer avec CleanPoker →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/fr/a-propos">À propos</a>
      | <a href="/fr/mentions-legales">Mentions légales</a>
    </p>
  </footer>
</div>

<style>
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p, li { line-height: 1.7; }
  ul { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; }
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
