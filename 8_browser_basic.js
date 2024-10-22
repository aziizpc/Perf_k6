import { chromium } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-vus',
            vus: 2,
            duration: '30s',
        },
    },
};

export default async function () {
    // Launch the browser (Chromium) and create a new context
    const browser = chromium.launch({ headless: false });
    const context = browser.newContext();

    // Create a new page
    const page = await context.newPage();

    // Navigate to Google
    await page.goto('https://www.google.com');

    // Close the page after actions
    await page.close();

    // Close the browser after all tests are done
    await browser.close();
}