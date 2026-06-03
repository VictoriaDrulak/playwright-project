import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('TC-10 Author can edit their own news', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await page.goto('https://www.greencity.cx.ua/#/greenCity/news/12808');
  await page.waitForLoadState('networkidle');

  await page.locator('a').filter({ hasText: /edit/i }).click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/create-news\?id=12808/);

  const titleField = page.locator('div.title-block textarea');
  await titleField.waitFor({ state: 'visible' });
  await titleField.clear();
  await titleField.fill('Updated Title TC-10');

  await page.locator('button[type="submit"].primary-global-button').click();
  await page.waitForLoadState('networkidle');

  await page.goto('https://www.greencity.cx.ua/#/greenCity/news/12808');
  await page.waitForLoadState('networkidle');

  const titleLocator = page.locator('div.news-title-container');
  await titleLocator.waitFor({ state: 'visible', timeout: 10000 });
  await expect(titleLocator).toContainText('Updated Title TC-10');
});