import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('TC-09 Only author sees Edit news button', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await page.goto('https://www.greencity.cx.ua/#/greenCity/news/12808');
  await page.waitForLoadState('networkidle');

  const editBtn = page.locator('a').filter({ hasText: /edit/i });
  await expect(editBtn).toBeVisible();
});