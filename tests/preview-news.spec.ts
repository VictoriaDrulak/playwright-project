import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';

test('TC-08 Preview news content', async ({ page }) => {
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  const title = 'Test Preview';
  const mainText = 'This is a test preview content for news';

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  await news.fillTitle(title);
  await news.fillMainText(mainText);

  await page.getByRole('button', { name: 'Preview' }).click();

  await expect(page.locator('div.news-title')).toContainText(title);

  await expect(page.locator('div.news-content')).toContainText('2026');

  await expect(page.locator('div.news-content')).toContainText('by');

  const backBtn = page.locator('div.button-text');
  await expect(backBtn).toContainText('Back to editing');

  await backBtn.click();
  await expect(page.locator('h2.title-header')).toBeVisible();
});