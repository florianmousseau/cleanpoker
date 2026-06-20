<svelte:head>
  <title>Éco-conception & numérique responsable | CleanPoker</title>
  <meta name="description" content="Déclaration d'éco-conception de CleanPoker. Bundle JS < 50 Ko brotli, zéro trackers, zéro cookies, hébergement 100 % énergie renouvelable, Lighthouse Performance 100, CO₂ < 0,1 g par visite." />
  <link rel="canonical" href="https://cleanpoker.dev/green" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/green" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/green" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/green" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/green" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/green" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/green" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Éco-conception : CleanPoker',
    url: 'https://cleanpoker.dev/green',
    description: 'Déclaration d\'éco-conception de CleanPoker. Bundle JS < 50 Ko brotli, zéro trackers, zéro cookies, hébergement 100 % énergie renouvelable, Lighthouse Performance 100, CO₂ < 0,1 g par visite.',
    keywords: 'éco-conception, green IT, numérique responsable, planning poker écologique, zéro trackers, hébergement vert, énergie renouvelable, Lighthouse 100, bundle léger, CO2 faible',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      sustainabilityNote: 'Hébergé sur énergie renouvelable (Cloudflare Pages + Fly.io CDG Paris). Bundle JS < 50 Ko brotli. Aucun script tiers. CO₂ < 0,1 g par visite.',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">← Retour à l'accueil</a>

    <h1>Éco-conception : CleanPoker, le numérique responsable</h1>

    <p>
      <strong>CleanPoker</strong> est conçu selon les principes du <strong>numérique responsable</strong> :
      chaque décision technique vise à réduire l'empreinte carbone, éliminer les dépendances inutiles
      et respecter la vie privée des utilisateurs. Ce n'est pas un label ajouté après coup,
      c'est l'ADN du projet.
    </p>

    <h2>Chiffres clés</h2>
    <table>
      <thead>
        <tr><th>Métrique</th><th>Valeur</th></tr>
      </thead>
      <tbody>
        <tr><td>Bundle JS partagé (brotli, validé CI)</td><td><strong>&lt; 50 Ko</strong></td></tr>
        <tr><td>CO₂ estimé par visite</td><td><strong>&lt; 0,1 g</strong></td></tr>
        <tr><td>Lighthouse Performance</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Lighthouse Accessibilité</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Requêtes vers des tiers</td><td><strong>0</strong></td></tr>
        <tr><td>Trackers / analytics</td><td><strong>0</strong></td></tr>
        <tr><td>Cookies publicitaires</td><td><strong>0</strong></td></tr>
        <tr><td>Polices Google chargées</td><td><strong>0</strong></td></tr>
        <tr><td>RAM backend</td><td><strong>~15 Mo</strong> (binaire Go)</td></tr>
      </tbody>
    </table>

    <h2>Choix techniques pour réduire l'impact</h2>
    <ul>
      <li><strong>Pas de framework CSS</strong> (Tailwind, Bootstrap...) : CSS vanilla, zéro code mort</li>
      <li><strong>Pas de polices Google</strong> : polices système uniquement, aucune requête réseau</li>
      <li><strong>Pas de DOM virtuel</strong> : SvelteKit compile en JavaScript vanilla, bundle minimal</li>
      <li><strong>Pas de base de données</strong> : sessions en mémoire Go, auto-supprimées après 24 h d'inactivité</li>
      <li><strong>Pas de scripts tiers</strong> : aucun SDK Analytics, Chat, A/B testing ou autre</li>
      <li><strong>Compression Brotli</strong> : plus efficace que gzip, activée par défaut sur Cloudflare</li>
      <li><strong>Backend Go</strong> : binaire natif ~15 Mo RAM, pas de runtime JVM ou Node.js à maintenir</li>
      <li><strong>WebSocket natif</strong> : pas de polling HTTP, connexion persistante légère</li>
      <li><strong>Images système</strong> : favicon SVG, pas de PNG lourd, pas de sprite</li>
    </ul>

    <h2>Hébergement sur énergie renouvelable</h2>
    <ul>
      <li>
        <strong>Frontend : Cloudflare Pages</strong> - CDN mondial, certifié 100 % énergie renouvelable.
        Cloudflare est référencé dans la base The Green Web Foundation.
      </li>
      <li>
        <strong>Backend : Fly.io CDG (Paris, France)</strong> - hébergeur certifié énergie renouvelable,
        résidence des données en France, latence minimale pour les équipes européennes.
      </li>
    </ul>

    <h2>Ce que CleanPoker ne fait pas</h2>
    <ul>
      <li>Pas de Google Analytics ni aucun outil de tracking comportemental</li>
      <li>Pas de publicité, pas de monétisation, pas de freemium</li>
      <li>Pas de cookie tiers (seul Cloudflare peut déposer <code>__cf_bm</code>, cookie de sécurité strictement nécessaire)</li>
      <li>Pas de localStorage contenant des données personnelles (seule la préférence de langue est mémorisée)</li>
      <li>Pas de polices, icônes ou scripts chargés depuis des CDN tiers (jsDelivr, cdnjs, unpkg...)</li>
      <li>Pas d'email marketing, pas de compte utilisateur, pas de base de données permanente</li>
    </ul>

    <h2>Vérification externe</h2>
    <p>Ces outils indépendants permettent de vérifier les engagements ci-dessus :</p>
    <ul>
      <li>
        <a href="https://www.websitecarbon.com/website/cleanpoker-dev/" rel="noopener noreferrer">
          Website Carbon : empreinte CO₂ de cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://www.thegreenwebfoundation.org/green-web-check/?url=cleanpoker.dev" rel="noopener noreferrer">
          The Green Web Foundation : vérifier l'hébergement vert de cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://sonarcloud.io/project/overview?id=florianmousseau_cleanpoker" rel="noopener noreferrer">
          SonarCloud : qualité et sécurité du code
        </a>
      </li>
      <li>
        <a href="https://github.com/florianmousseau/cleanpoker/actions" rel="noopener noreferrer">
          GitHub Actions : résultats Lighthouse CI et audit Eco-CI
        </a>
      </li>
    </ul>

    <h2>Amélioration continue</h2>
    <p>
      L'empreinte numérique est auditée à chaque déploiement via Lighthouse CI et Eco-CI
      (mesure de la consommation énergétique du pipeline CI).
      Toute régression de performance bloque le déploiement en production.
    </p>

    <h2>Date de mise à jour</h2>
    <p>Cette déclaration a été établie en juin 2026.</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/green">Éco-conception</a>
      | <a href="/accessibilite">Accessibilité</a>
      | <a href="/mentions-legales">Mentions légales</a>
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
