import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DE, EN, ES, FR, PT } from './i18n/all';
import { mcpUrl, roomUrl } from './invite-ai';

const ROOM = 'https://pokeragile.com/1a2b3c4d';
const MCP = 'https://salles.pokeragile.com/mcp';

describe('invite your AI', () => {
  it('derives the MCP address from the configured API address', () => {
    expect(mcpUrl('https://salles.pokeragile.com')).toBe(MCP);
    expect(mcpUrl('http://localhost:8080/')).toBe('http://localhost:8080/mcp');
  });

  it('gives the room address without the team query', () => {
    expect(roomUrl({ origin: 'https://pokeragile.com', pathname: '/1a2b3c4d' })).toBe(ROOM);
  });

  it('writes a prompt with the room, the server and the six tools in each language', () => {
    for (const t of [FR, EN, ES, DE, PT]) {
      const prompt = t.ia.prompt(ROOM, MCP);
      expect(prompt).toContain(ROOM);
      expect(prompt).toContain(MCP);
      expect(prompt).toContain('join_room, get_room, add_stories, vote, get_estimates, leave_room');
      expect(t.ia.invite.length).toBeGreaterThan(0);
      expect(t.ia.inviteHelp.length).toBeGreaterThan(0);
    }
    expect(new Set([FR, EN, ES, DE, PT].map((t) => t.ia.prompt(ROOM, MCP))).size).toBe(5);
  });

  it('says it in English as the owner wrote it', () => {
    expect(EN.ia.prompt(ROOM, MCP)).toBe(
      `Join my planning poker room ${ROOM} through the MCP server ${MCP} (tools: join_room, get_room, add_stories, vote, get_estimates, leave_room). Read the story on the table, vote with one card from the deck and give your reason in one sentence. Do not reveal your card in the chat.`
    );
  });

  it('lives in the Options panel only', () => {
    // The button sits in the options, and the options are mounted in one place.
    const page = readFileSync(new URL('../routes/[id]/+page.svelte', import.meta.url), 'utf8');
    const body = readFileSync(new URL('./RoomOptions.svelte', import.meta.url), 'utf8');
    const options = page.slice(page.indexOf('<details class="panel options"'), page.indexOf('</details>'));
    expect(options).toContain('<RoomOptions.current ');
    expect(page.split('<RoomOptions.current ')).toHaveLength(2);
    expect(page).not.toContain('data-testid="invite-ai"');
    expect(body.split('data-testid="invite-ai"')).toHaveLength(2);
  });
});
