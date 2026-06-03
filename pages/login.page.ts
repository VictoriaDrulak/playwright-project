import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator('input[type="email"]').nth(1);
    this.passwordInput = page.locator('input[type="password"]').nth(0);
    this.submitBtn = page.locator('app-sign-in button[type="submit"]');
  }

  async open() {
    await this.page.setViewportSize({ width: 1280, height: 720 });
    await this.page.goto('https://www.greencity.cx.ua/#/greenCity');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email: string, password: string) {
    await this.page.evaluate(() => {
      const btn = document.querySelector('a.header_sign-in-link') as HTMLElement;
      if (btn) btn.click();
    });

    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(300);

    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(password);

    await this.submitBtn.click();

    await this.page.locator('app-sign-in').waitFor({ state: 'hidden', timeout: 15000 });
  }
}