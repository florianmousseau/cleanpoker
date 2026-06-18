import { test, expect } from '@playwright/test';

test('page loads with title and create button', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveTitle(/CleanPoker/);
  await expect(page.getByTestId('create-btn')).toBeVisible();
});

test('fibonacci preset fills correct cards', async ({ page }) => {
  await page.goto('/en');
  const btn = page.getByRole('button', { name: 'Fibonacci' });
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#cards-input')).toHaveValue('1,2,3,5,8,13,21,?');
});

test('t-shirt preset fills correct cards', async ({ page }) => {
  await page.goto('/en');
  const btn = page.getByRole('button', { name: 'T-shirt' });
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#cards-input')).toHaveValue('XS,S,M,L,XL,XXL,?');
});

test('create button disabled with fewer than 2 cards', async ({ page }) => {
  await page.goto('/en');
  await page.locator('#cards-input').fill('1');
  await expect(page.getByTestId('create-btn')).toBeDisabled();
});

test('create button disabled with empty input', async ({ page }) => {
  await page.goto('/en');
  await page.locator('#cards-input').fill('');
  await expect(page.getByTestId('create-btn')).toBeDisabled();
});

test('creating a room redirects to room join page', async ({ page }) => {
  await page.goto('/en');
  await page.getByTestId('create-btn').click();
  await expect(page).toHaveURL(/\/[a-zA-Z0-9-]{6,}/);
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('join-form')).toBeVisible({ timeout: 15000 });
});
