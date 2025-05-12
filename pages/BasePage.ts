import { Locator, Page } from '@playwright/test';

export class BasePage {
  private readonly page: Page;
  public readonly locators: {
    acceptCookiesButton: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = this.initializeLocators();
  }

  private initializeLocators() {
    return {
      acceptCookiesButton: this.page.getByRole('button', {
        name: 'Accept all',
      }),
    };
  }
}
