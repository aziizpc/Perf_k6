import { browser } from 'k6/experimental/browser';
import { check } from 'k6'

export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',  // Another one
            options: {
                browser: {
                    type: 'chromium',   // Ensure Chromium browser is used
                    headless: false,    // Doesn't matter for screenshot
                },
            },
        },
    },
};

const networkProfiles = {                       // Creating the profiles (Some versions will work without setting)
    slow3G: {
        offline: false,
        downloadThroughput: 500 * 1024 / 8,     // ~500 kbps
        uploadThroughput: 500 * 1024 / 8,       // ~500 kbps
        latency: 400,                           // ~400 ms
    },
    fast3G: {
        offline: false,
        downloadThroughput: 1600 * 1024 / 8,    // ~1.6 Mbps
        uploadThroughput: 750 * 1024 / 8,       // ~750 kbps
        latency: 150,                           // ~150 ms
    }
};


export default async function () {
    const page = await browser.newPage();

    page.throttleNetwork(networkProfiles.fast3G)        // You can update as 'slow3G' or 'fast3G'

    await page.goto('https://www.microsoft.com/');
    page.close();
}