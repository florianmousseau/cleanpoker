/**
 * The MCP endpoint an assistant joins a room through. It is served by the same
 * host as the rooms, so it follows the configured API address.
 */
export function mcpUrl(apiUrl: string): string {
  let base = apiUrl;
  while (base.endsWith('/')) base = base.slice(0, -1);
  return `${base}/mcp`;
}

/** The room address without its query: the team colours mean nothing to an assistant. */
export function roomUrl(location: Pick<Location, 'origin' | 'pathname'>): string {
  return `${location.origin}${location.pathname}`;
}
