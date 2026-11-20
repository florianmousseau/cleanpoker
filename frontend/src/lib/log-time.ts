const two = (n: number) => String(n).padStart(2, '0');

/**
 * The time of an activity entry, on the reader's clock. The server sends the
 * instant in Unix milliseconds; it used to send its own UTC clock as text,
 * which a reader in Paris saw one or two hours off. A server not yet updated
 * still sends that text, shown as it comes.
 */
export function logTime(timestamp: number | string): string {
  if (typeof timestamp === 'string' && /^\d{1,2}:\d{2}/.test(timestamp)) return timestamp;
  const at = new Date(timestamp);
  if (Number.isNaN(at.getTime())) return String(timestamp);
  return `${two(at.getHours())}:${two(at.getMinutes())}:${two(at.getSeconds())}`;
}
