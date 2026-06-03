import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';

test('TC-02 Title field validation', async ({ page }) => {
  test.setTimeout(60000);
  
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  await expect(news.publishBtn).toBeDisabled();

  await news.titleInput.fill('A'.repeat(171));
  await news.titleInput.blur();

  const titleLength = (await news.titleInput.inputValue()).length;
  console.log('Title length after 171 input:', titleLength);

  await news.titleInput.fill('Test News');
  await expect(news.publishBtn).toBeDisabled();

  await news.selectFirstTag();
  await news.fillMainText('This is valid content with more than 20 chars');
  await expect(news.publishBtn).toBeEnabled();
});