import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { BasePage } from '../pages/BasePage';
import { handleReCaptcha } from '../utils/recaptchaHelper';

let searchPage: SearchPage, basePage: BasePage, searchResultsPage: SearchResultsPage;
const imageLink = 'https://picsum.photos/id/237/200/300';

test.describe('Testing searching functionality', async () => {
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    basePage = new BasePage(page);
    searchResultsPage = new SearchResultsPage(page);
    await page.goto('/');
    await basePage.locators.acceptCookiesButton.click();
  });

  test('Check if search input is empty after clearing', async () => {
    await searchPage.locators.searchInput.fill('Duco company');
    await searchPage.locators.clearButton.click();
    const searchInputValue = await searchPage.locators.searchInput.inputValue();
    await expect(searchInputValue).toBe('');
  });
  
  test('Check If URL is changed after triggering search', async ({ page }) => {
    await searchPage.performSearch('Duco company');
    await expect(page).toHaveURL(/q=Duco/i);
  });

  test('Search text and check results', async ({ page }) => {
    await searchPage.performSearch('Duco company');

    await handleReCaptcha(page);

    //some example of results to check
    await expect(searchResultsPage.locators.imagesLink).toBeVisible();
    await expect(page.locator('a h3').first()).toHaveText(
      'Duco: AI Data Automation Software for Financial Markets',
    );
  });

  test('Search graphic and check results', async ({ page }) => {
    await searchPage.locators.searchByGraphicButton.click();
    await searchPage.locators.pasteImageLink.fill(imageLink);
    await searchPage.locators.searchGraphicLinkButton.click();

    await handleReCaptcha(page);

    //some example of results to check
    await expect(
      page.getByRole('button', { name: 'Visually searched image' }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Labrador Retriever' }).first(),
    ).toBeVisible();

    await expect(searchResultsPage.locators.aboutThisImageLink).toBeVisible();
  });

  test('Should be allowed doing multiple searches in one session', async ({ page }) => {
    await test.step('Perform search for the first time', async () => {
      await searchPage.performSearch('Duco company');

      await handleReCaptcha(page);

      const headingsText = await searchResultsPage.getHeadingsText();
      await expect(headingsText).toContain("Duco: AI Data Automation Software for Financial Markets");
    });

    await test.step('Clear the search input', async () => {
      await searchPage.locators.clearButton.click({force: true});
      await expect(searchPage.locators.searchInput).toHaveValue('');
    });

    await test.step('Search for "Microsoft"', async () => {
      await searchPage.performSearch('Microsoft');

      // Handle reCaptcha is not needed for this search

      await page.waitForLoadState('networkidle');
      await expect(
        page.getByRole('heading', {
          name: 'Microsoft – AI, Cloud, Productivity, Computing, Gaming & Apps',
        }),
      ).toBeVisible();
    });
  });
  
});
