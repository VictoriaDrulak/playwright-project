import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';

test('TC-01 Create News basic flow', async ({ page }) => {
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  await news.fillTitle('Test News');
  await news.selectFirstTag();
  await news.fillMainText('This is test content with more than 20 chars');

  await news.checkPublishEnabled();
  await news.clickPublish();
});