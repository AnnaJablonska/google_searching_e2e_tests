import { Page } from 'playwright';

export async function handleReCaptcha(page: Page): Promise<void> {
    // reCaptcha has to be resolved manually!!!
    console.log('Please resolve reCaptcha manually');
    await page.waitForTimeout(10000);
    // Check if the reCaptcha iframe is visible
    if (await page.locator('iframe[title="reCAPTCHA"]').isVisible()) {
        console.log('reCaptcha still visible, waiting an extra seconds');
        await page.waitForTimeout(12000);
    }
}