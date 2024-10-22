import { browser } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium', // Ensure Chromium browser is used
                },
            },
        },
    },
};

const url = 'https://www.lambdatest.com/selenium-playground/select-dropdown-demo'

export default async function () {
    const page = await browser.newPage();
    await page.goto(url);

    // Directly selecting the value from the dropdown:
    
    const dropdown = page.locator('#select-demo')
    await dropdown.selectOption('Wednesday')
    page.waitForTimeout(5000)

    page.screenshot({                   // Screenshot
        path: 'dropdown/dd1.png'
    })

    // Iterating through all the values and then selecting:

    const values = await page.$$('#select-demo>option')        // Get all values in select-demo > option
    for (const value of values){
        const valueName = await value.textContent()
        if (valueName == 'Friday'){
            await page.selectOption('#select-demo', valueName)
            break;
        }        
    }

    page.screenshot({                   // Screenshot
        path: 'dropdown/dd2.png'
    })

    page.close();
}