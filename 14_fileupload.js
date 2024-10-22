import { browser } from 'k6/experimental/browser';
import { check } from 'k6'

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

const url = 'https://www.lambdatest.com/selenium-playground/upload-file-demo'

export default async function () {
    const page = await browser.newPage();
    await page.goto(url);

    await page.setInputFiles('#file', {name: '14_fileupload/upload.png'})
    page.waitForTimeout(5000)

    check(page, {
        'Text Validation':p=>p.locator('#error').textContent() == "File Successfully Uploaded"
    });

    page.close();
}