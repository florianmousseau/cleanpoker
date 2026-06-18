<script lang="ts">
  import HomepageTemplate from '$lib/HomepageTemplate.svelte';
</script>

<HomepageTemplate
  locale="fr"
  redirectOnMount={true}
  pageTitle="CleanPoker | Planning poker gratuit, sans compte"
  metaDesc="Outil de planning poker collaboratif. Créez une session, partagez l'URL, estimez en équipe. Sans compte, sans tracking. Accessible WCAG 2.1 AA."
  canonical="https://cleanpoker.dev"
  ogLocale="fr_FR"
  ogTitle="CleanPoker | Planning poker gratuit, sans compte"
  ogDesc="Créez une session, partagez l'URL, estimez en équipe. Aucun compte requis."
  twitterTitle="CleanPoker | Planning poker gratuit, sans compte"
  twitterDesc="Créez une session, partagez l'URL, estimez en équipe. Aucun compte requis."
  jsonLdUrl="https://cleanpoker.dev"
  jsonLdDesc="Outil de planning poker collaboratif, gratuit et sans compte."
  navAriaLabel="Langue"
  h1Accent="créer · voter · décider"
  lead="Créez une session, partagez l'URL, estimez en équipe. Aucun compte requis."
  cardsLabel="Cartes"
  cardsSepHint="(séparées par des virgules)"
  presetsAriaLabel="Présélections"
  minCardsError="Minimum 2 cartes"
  createBtnLabel="Créer une session"
  creatingLabel="Création…"
  hintText="Partage le lien. C'est prêt."
  createError="Impossible de créer la salle. Réessaie."
  footerSource="Code source"
  footerLicense="Licence MIT"
  footerLegal="Mentions légales"
/>
