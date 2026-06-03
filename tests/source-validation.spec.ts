import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';

test('TC-06 Source field validation', async ({ page }) => {
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  await news.fillTitle('Test News');
  await news.selectFirstTag();
  await news.fillMainText('This is valid content with more than 20 chars');

  const sourceInput = page.locator('div.source-block input');

  await expect(news.publishBtn).toBeEnabled();
  console.log('✓ Empty source — Publish enabled');

  await sourceInput.fill('www.example.com');
  await sourceInput.blur();
  await expect(news.publishBtn).toBeDisabled();
  console.log('✓ Invalid URL — Publish disabled');

  await sourceInput.fill('https://example.com');
  await sourceInput.blur();
  await expect(news.publishBtn).toBeEnabled();
  console.log('✓ Valid URL — Publish enabled');
});