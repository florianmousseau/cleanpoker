import { test, expect } from '@playwright/test';

function uid() {
  return `e2e-multi-${Math.random().toString(36).slice(2, 10)}`;
}

test('two players see each other after joining', async ({ browser }) => {
  const id = uid();
  const ctx1 = await browser.newContext();
  const ctx2 = await browser.newContext();
  const p1 = await ctx1.newPage();
  const p2 = await ctx2.newPage();

  await p1.goto(`/${id}`);
  await p1.locator('#name-input').fill('Alice');
  await p1.getByTestId('join-btn').click();
  await expect(p1.getByTestId('cards-list')).toBeVisible();

  await p2.goto(`/${id}`);
  await p2.locator('#name-input').fill('Bob');
  await p2.getByTestId('join-btn').click();
  await expect(p2.getByTestId('cards-list')).toBeVisible();

  await expect(p1.getByRole('cell', { name: 'Bob' })).toBeVisible({ timeout: 5000 });
  await expect(p2.getByRole('cell', { name: 'Alice' })).toBeVisible({ timeout: 5000 });

  await ctx1.close();
  await ctx2.close();
});

test('reveal disabled until all players voted', async ({ browser }) => {
  const id = uid();
  const ctx1 = await browser.newContext();
  const ctx2 = await browser.newContext();
  const p1 = await ctx1.newPage();
  const p2 = await ctx2.newPage();

  await p1.goto(`/${id}`);
  await p1.locator('#name-input').fill('Alice');
  await p1.getByTestId('join-btn').click();

  await p2.goto(`/${id}`);
  await p2.locator('#name-input').fill('Bob');
  await p2.getByTestId('join-btn').click();

  // Alice votes, Bob hasn't — reveal still disabled
  await p1.getByTestId('cards-list').getByRole('button').first().click();
  await expect(p1.getByTestId('reveal-btn')).toBeDisabled({ timeout: 3000 });

  // Bob votes — reveal enabled for both
  await p2.getByTestId('cards-list').getByRole('button').nth(1).click();
  await expect(p1.getByTestId('reveal-btn')).toBeEnabled({ timeout: 5000 });
  await expect(p2.getByTestId('reveal-btn')).toBeEnabled({ timeout: 5000 });

  await ctx1.close();
  await ctx2.close();
});

test('full round: two players vote, reveal, new round', async ({ browser }) => {
  const id = uid();
  const ctx1 = await browser.newContext();
  const ctx2 = await browser.newContext();
  const p1 = await ctx1.newPage();
  const p2 = await ctx2.newPage();

  await p1.goto(`/${id}`);
  await p1.locator('#name-input').fill('Alice');
  await p1.getByTestId('join-btn').click();

  await p2.goto(`/${id}`);
  await p2.locator('#name-input').fill('Bob');
  await p2.getByTestId('join-btn').click();

  await p1.getByTestId('cards-list').getByRole('button').first().click();
  await p2.getByTestId('cards-list').getByRole('button').nth(2).click();

  // Alice reveals
  await p1.getByTestId('reveal-btn').click();

  // Both see results
  await expect(p1.getByTestId('results-data')).toBeVisible({ timeout: 5000 });
  await expect(p2.getByTestId('results-data')).toBeVisible({ timeout: 5000 });

  // Alice starts new round
  await p1.getByTestId('new-round-btn').click();

  // Both back to voting state
  await expect(p1.getByTestId('results-data')).not.toBeVisible({ timeout: 5000 });
  await expect(p2.getByTestId('results-data')).not.toBeVisible({ timeout: 5000 });
  await expect(p1.getByTestId('cards-list').getByRole('button').first()).toHaveAttribute('aria-pressed', 'false');

  await ctx1.close();
  await ctx2.close();
});
