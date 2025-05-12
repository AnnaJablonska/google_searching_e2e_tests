import { Locator, Page } from "@playwright/test";

export class SearchResultsPage {
  private readonly page: Page;
  public readonly locators: {
    imagesLink: Locator;
    aboutThisImageLink: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = this.initializeLocators();
  }

  private initializeLocators() {
    return {
      imagesLink: this.page.getByRole('link', { name: 'Images' }),
      aboutThisImageLink: this.page.getByRole('link', {
        name: 'About this image',
      }),
    };
  }
}