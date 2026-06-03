import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';

test('TC-05 Main Text field validation', async ({ page }) => {
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  await news.fillTitle('Test News');
  await news.selectFirstTag();

  await news.mainText.click();
  await news.mainText.fill('Short');
  await news.mainText.blur();
  await expect(news.publishBtn).toBeDisabled();
  console.log('✓ Less than 20 chars — Publish disabled');

  await news.mainText.fill('This text is 20 chars');
  await news.mainText.blur();
  await expect(news.publishBtn).toBeEnabled();
  console.log('✓ 20+ chars — Publish enabled');

  await news.mainText.fill('This is valid content with more than 20 characters');
  await expect(news.publishBtn).toBeEnabled();
  console.log('✓ Valid text — Publish enabled');
});