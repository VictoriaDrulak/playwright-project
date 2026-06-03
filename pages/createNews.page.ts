import { Page, Locator, expect } from '@playwright/test';

export class CreateNewsPage {
  readonly page: Page;

  readonly createNewsBtn: Locator;
  readonly titleInput: Locator;
  readonly mainText: Locator;
  readonly publishBtn: Locator;
  readonly firstTag: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createNewsBtn = page.locator('a.create');
    this.titleInput = page.locator('div.title-block textarea');
    this.mainText = page.locator('div.textarea-wrapper .ql-editor');
    this.publishBtn = page.locator('button[type="submit"].primary-global-button');
    this.firstTag = page.locator('button.tag-button').first();
  }

  async openNewsPage() {
    await this.page.goto('https://www.greencity.cx.ua/#/greenCity/news');
    await this.page.waitForLoadState('networkidle');
  }

  async openCreateForm() {
    await this.createNewsBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectFirstTag() {
    await this.firstTag.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstTag.click();
  }

  async fillTitle(title: string) {
    await this.titleInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.titleInput.fill(title);
  }

  async fillMainText(text: string) {
    await this.mainText.waitFor({ state: 'visible', timeout: 10000 });
    await this.mainText.click();
    await this.mainText.fill(text);
  }

  async checkPublishEnabled() {
    await expect(this.publishBtn).toBeEnabled({ timeout: 5000 });
  }

  async clickPublish() {
    await this.publishBtn.click();
  }
}