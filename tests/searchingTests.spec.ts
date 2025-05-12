import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { BasePage } from '../pages/BasePage';

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
    const currentUrl = await page.url();
    await expect(currentUrl).toContain('Duco');
  });

  test('Search text and check results', async ({ page }) => {
    await searchPage.performSearch('Duco company');

    //reCaptcha has to be resolved manually!!!
    await console.log('Please resolve reCaptcha manually');
    await page.waitForTimeout(10000);
    // Check if the reCaptcha iframe is visible
    if (await page.locator('iframe[title="reCAPTCHA"]').isVisible()) {
      await console.log('reCaptcha still visible, waiting an extra 10 seconds');
      await page.waitForTimeout(10000);
    }

    //some examples of results to check
    await expect(searchResultsPage.locators.imagesLink).toBeVisible();
    await expect(page.locator('a h3').first()).toHaveText(
      'Duco: AI Data Automation Software for Financial Markets',
    );
  });

  test('Search graphic and check results', async ({ page }) => {
    await searchPage.locators.searchByGraphicButton.click();
    await searchPage.locators.pasteImageLink.fill(imageLink);
    await searchPage.locators.searchGraphicLinkButton.click();

    //reCaptcha has to be resolved manually!!!
    await console.log('Please resolve reCaptcha manually');
    await page.waitForTimeout(10000);
    // Check if the reCaptcha iframe is visible
    if (await page.locator('iframe[title="reCAPTCHA"]').isVisible()) {
      await console.log('reCaptcha still visible, waiting an extra seconds');
      await page.waitForTimeout(13000);
    }

    //some examples of results to check
    await expect(
      page.getByRole('button', { name: 'Visually searched image' }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Labrador Retriever' }).first(),
    ).toBeVisible();

    await expect(searchResultsPage.locators.aboutThisImageLink).toBeVisible();
  });
});
