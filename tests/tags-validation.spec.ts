import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';

test('TC-03 Tags validation - min 1 max 3', async ({ page }) => {
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  const tagButtons = page.locator('button.tag-button');

  await tagButtons.nth(0).click();
  await tagButtons.nth(1).click();
  await tagButtons.nth(2).click();

  const activeTagsAfter3 = page.locator('button.tag-button.active, button.tag-button[class*="selected"], button.tag-button[class*="clicked"]');
  console.log('Active tags after 3 clicks:', await activeTagsAfter3.count());

  await tagButtons.nth(3).click();

  const activeTagsAfter4 = await activeTagsAfter3.count();
  console.log('Active tags after 4th click:', activeTagsAfter4);
  expect(activeTagsAfter4).toBeLessThanOrEqual(3);

  await tagButtons.nth(0).click(); 
  await tagButtons.nth(1).click(); 

  await news.fillTitle('Test News');
  await news.fillMainText('This is valid content with more than 20 chars');
  await expect(news.publishBtn).toBeEnabled();
});