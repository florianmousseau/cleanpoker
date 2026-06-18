<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Erreur {$page.status} | CleanPoker</title>
</svelte:head>

<div class="container error-page">
  <main id="main">
    <h1>{$page.status}</h1>
    <p>{$page.error?.message ?? 'Page introuvable.'}</p>
    <a href="/" class="btn btn-primary">Retour à l'accueil</a>
  </main>
</div>

<style>
  .error-page {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-align: center;
  }

  h1 {
    font-size: 5rem;
    color: var(--color-primary);
  }
</style>
