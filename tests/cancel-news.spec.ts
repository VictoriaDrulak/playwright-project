import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';

test('TC-07 Cancel button confirmation modal', async ({ page }) => {
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  await news.fillTitle('Test');
  await news.fillMainText('Test content with more than 20 chars');

  const cancelBtn = page.locator('button.tertiary-global-button');

  const yesCancelBtn = page.locator('mat-dialog-container button.primary-global-button').last();
  const continueBtn = page.locator('mat-dialog-container button.secondary-global-button').last();

  await cancelBtn.click();
  await expect(continueBtn).toBeVisible({ timeout: 3000 });

  await continueBtn.click();
  await expect(page.locator('div.title-block textarea')).toBeVisible();

  await cancelBtn.click();
  await expect(yesCancelBtn).toBeVisible({ timeout: 3000 });

  await yesCancelBtn.click();
  await expect(page).toHaveURL(/news/, { timeout: 5000 });
});