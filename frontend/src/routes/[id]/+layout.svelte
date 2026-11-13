<script lang="ts">
  import { page } from '$app/state';
  let { children } = $props();
</script>

<!-- A client navigation from one room to another reuses the page: keyed on the
     id, it is rebuilt, so the first room's socket closes and the second opens. -->
{#key page.params.id}
  {@render children()}
{/key}
