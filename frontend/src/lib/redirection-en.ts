/**
 * English lives at the root: `/en/x` answers 301 to `/x`. The target is always
 * a path of this site. `/en//evil.example` would otherwise send `//evil.example`,
 * which a browser reads as another host, and so would `/en/\evil.example`.
 */
const EN_PREFIX = /^\/en(?=\/|$)/;

/** The local path an `/en` address moves to, or null when it carries no `/en` prefix. */
export function sansPrefixeEn(pathname: string): string | null {
	if (!EN_PREFIX.test(pathname)) return null;
	return pathname.replace(EN_PREFIX, '').replace(/^[/\\]+/, '/') || '/';
}
