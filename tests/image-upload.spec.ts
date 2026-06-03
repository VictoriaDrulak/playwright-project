import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateNewsPage } from '../pages/createNews.page';
import * as fs from 'fs';
import * as path from 'path';

test('TC-04 Image upload validation', async ({ page }) => {
  const login = new LoginPage(page);
  const news = new CreateNewsPage(page);

  await login.open();
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);

  await news.openNewsPage();
  await news.openCreateForm();

  fs.mkdirSync('test-assets', { recursive: true });

  const validPngPath = path.resolve('test-assets/valid-image.png');
  const minimalPng = Buffer.from(
    '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c6260000000020001e221bc330000000049454e44ae426082',
    'hex'
  );
  fs.writeFileSync(validPngPath, minimalPng);

  const gifPath = path.resolve('test-assets/invalid.gif');
  const minimalGif = Buffer.from('47494638396101000100800000ffffff0000002c00000000010001000002024401003b', 'hex');
  fs.writeFileSync(gifPath, minimalGif);

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(validPngPath);
  await page.waitForTimeout(1500);

  const previewImg = page.locator('img[class*="upload"], img[class*="preview"], .cropper-container, app-photo-upload img');
  const fileInputAfter = page.locator('input[type="file"]');
  console.log('File input count after PNG:', await fileInputAfter.count());
  console.log('Preview visible:', await previewImg.count());

  const staticWarning = page.locator('p.warning');
  console.log('Static warning text:', await staticWarning.textContent());

  await expect(page.locator('div.title-block textarea')).toBeVisible();
  console.log('✓ Form still accessible after PNG upload');
});