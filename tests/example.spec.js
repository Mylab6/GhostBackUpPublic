// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test('Download file', async ({ page, context }) => {

  // Set the download directory path
  page.on('console', msg => console.log(msg.text()))

  const downloadDirectory = path.resolve(path.dirname(__dirname), 'downloads');

  // Create the download directory if it doesn't exist
  if (!fs.existsSync(downloadDirectory)) {
    fs.mkdirSync(downloadDirectory, { recursive: true });
  }

  await page.goto(process.env.GHOST_LAB_URL + '/ghost/#/signin');
  await page.locator('[autocomplete="username"]').type(process.env.GHOST_LAB_USERNAME);
  await page.locator('[autocomplete="current-password"]').type(process.env.GHOST_LAB_PASSWORD);
 // await page.locator('#ember11').click();
  await page.locator('.gh-btn-login').click();
 // await page.evaluate(() => $('#ember11').click());
  await page.locator('[href="#/settings/"]').click(); 
  // Set the download directory for the current browser context
  // await page.context().setDefaultDownloadOptions({ directory: downloadDirectory });
  await page.locator('[href="#/settings/labs/"]').click();

  await page.locator('span:text("Export")').click();
  // Wait for the download event to occur
  const download = await page.waitForEvent('download');

  // Save the downloaded file
 // console.log(await download.path());
  //

  const filePath = path.join(downloadDirectory, download.suggestedFilename());
  await download.saveAs(filePath);
});
