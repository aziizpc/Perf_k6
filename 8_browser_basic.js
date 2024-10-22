import { browser } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-vus',
            vus: 2,
            duration: '30s',
            options: {
                browser: {
                    type: 'chromium', // Ensure Chromium browser is used
                    headless: false,    
                },
            },
        },
    },
};

export default async function () {
    const page = await browser.newPage(); // Creates a new page
    await page.goto('https://www.google.com'); // Navigates to the URL
    page.close(); // Closes the page after actions are performed
}