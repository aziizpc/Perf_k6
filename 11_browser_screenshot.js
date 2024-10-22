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

export default async function () {
    const page = await browser.newPage(); // Creates a new page
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    page.locator('#input-firstname').type('K6')
    page.locator('#input-lastname').type('Demo')
    page.locator('#input-email').type('demo@demo.com')
    page.locator('#input-telephone').type('123456789')
    page.locator('#input-password').type('helloworld@123')
    page.locator('#input-confirm').type('helloworld@123')
    page.check('input[type="checkbox"]')
    
    const submit = page.locator('input[type="submit"]')
    await Promise.all([page.waitForNavigation(), submit.click()])

    page.screenshot({                   // Screenshot
        path: 'screenshots/test1.png'
    })

    page.screenshot({                   // Full page screenshot
        fullPage: true,
        path: 'screenshots/test2.png'
    })

    page.setViewportSize({              // Changed the dimension
        width: 768,
        height: 1024
    })

    page.screenshot({                   // Take screenshot again
        path: 'screenshots/test3.png'
    })

    check(page, {
        'Text Validation':p=>p.locator('h1').textContent() == "Your Account Has Been Created!"
    });

    page.close(); // Closes the page after actions are performed
}