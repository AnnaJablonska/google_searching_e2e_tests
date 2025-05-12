import { Locator, Page } from '@playwright/test';

export class SearchPage {
  private readonly page: Page;
  public readonly locators: {
    searchInput: Locator;
    clearButton: Locator;
    searchByGraphicButton: Locator;
    pasteImageLink: Locator;
    searchGraphicLinkButton: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = this.initializeLocators();
  }

  private initializeLocators() {
    return {
      searchInput: this.page.getByRole('combobox', { name: 'Search' }),
      clearButton: this.page.getByRole('button', { name: 'Clear' }),
      searchByGraphicButton: this.page.getByRole('button', {
        name: 'Search by image',
      }),
      pasteImageLink: this.page.getByRole('textbox', {
        name: 'Paste image link',
      }),
      searchGraphicLinkButton: this.page.getByRole('button', {
        name: 'Search',
        exact: true,
      }),
    };
  }

  async performSearch(text: string) {
    await this.locators.searchInput.fill(text);
    await this.page.keyboard.press('Enter');
  }
}
