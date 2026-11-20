/**
 * Something fetched the first time it is wanted, and kept. A fetch that fails
 * is tried again the next time it is wanted.
 */
export function fetchedOnce<T>(load: () => Promise<{ default: T }>) {
  let loaded = $state.raw<T | null>(null);
  let pending = false;
  return {
    get current(): T | null { return loaded; },
    want(): void {
      if (loaded || pending) return;
      pending = true;
      load()
        .then((m) => (loaded = m.default), () => {})
        .finally(() => (pending = false));
    },
  };
}

/**
 * A component fetched when `wanted` first turns true. Most people in a room
 * only vote: what sits behind the options is not theirs to download.
 */
export function lazily<T>(wanted: () => boolean, load: () => Promise<{ default: T }>) {
  const part = fetchedOnce(load);
  $effect(() => {
    if (wanted()) part.want();
  });
  return part;
}
