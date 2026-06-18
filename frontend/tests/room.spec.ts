import { test, expect } from '@playwright/test';

function uid() {
  return `e2e-${Math.random().toString(36).slice(2, 10)}`;
}

test('join form visible, submit disabled without name', async ({ page }) => {
  await page.goto(`/${uid()}`);
  await expect(page.getByTestId('join-form')).toBeVisible();
  await expect(page.getByTestId('join-btn')).toBeDisabled();
});

test('whitespace-only name keeps join button disabled', async ({ page }) => {
  await page.goto(`/${uid()}`);
  await page.locator('#name-input').fill('   ');
  await expect(page.getByTestId('join-btn')).toBeDisabled();
});

test('single player: join shows cards', async ({ page }) => {
  await page.goto(`/${uid()}`);
  await page.locator('#name-input').fill('Alice');
  await page.getByTestId('join-btn').click();
  await expect(page.getByTestId('cards-list')).toBeVisible();
});

test('single player: vote toggles on and off', async ({ page }) => {
  await page.goto(`/${uid()}`);
  await page.locator('#name-input').fill('Alice');
  await page.getByTestId('join-btn').click();

  const card = page.getByTestId('cards-list').getByRole('button').first();
  await card.click();
  await expect(card).toHaveAttribute('aria-pressed', 'true');

  await card.click();
  await expect(card).toHaveAttribute('aria-pressed', 'false');
});

test('single player: vote then reveal shows results', async ({ page }) => {
  await page.goto(`/${uid()}`);
  await page.locator('#name-input').fill('Alice');
  await page.getByTestId('join-btn').click();

  // Vote
  await page.getByTestId('cards-list').getByRole('button').first().click();

  // Reveal enabled for solo player
  const revealBtn = page.getByTestId('reveal-btn');
  await expect(revealBtn).toBeEnabled();
  await revealBtn.click();

  // Results data visible
  await expect(page.getByTestId('results-data')).toBeVisible();

  // Cards disabled after reveal
  const card = page.getByTestId('cards-list').getByRole('button').first();
  await expect(card).toBeDisabled();
});

test('single player: new round clears votes', async ({ page }) => {
  await page.goto(`/${uid()}`);
  await page.locator('#name-input').fill('Alice');
  await page.getByTestId('join-btn').click();

  const card = page.getByTestId('cards-list').getByRole('button').first();
  await card.click();
  await page.getByTestId('reveal-btn').click();
  await expect(page.getByTestId('results-data')).toBeVisible();

  await page.getByTestId('new-round-btn').click();

  // Card deselected, results gone
  await expect(card).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByTestId('results-data')).not.toBeVisible();
});

test('observer join: no cards visible', async ({ page }) => {
  await page.goto(`/${uid()}`);
  await page.locator('#name-input').fill('Observer');
  await page.getByTestId('observer-checkbox').check();
  await page.getByTestId('join-btn').click();

  await expect(page.getByTestId('cards-list')).not.toBeVisible();
});
