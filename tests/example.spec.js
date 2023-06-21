// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test('Download file', async ({ page }) => {
  // Set the download directory path
  const downloadDirectory = path.resolve(__dirname, 'downloads');

  // Create the download directory if it doesn't exist
  if (!fs.existsSync(downloadDirectory)) {
    fs.mkdirSync(downloadDirectory, { recursive: true });
  }

  await page.goto(process.env.GHOST_LAB_URL);
  await page.locator('[autocomplete="username"]').type(process.env.GHOST_LAB_USERNAME);
  await page.locator('[autocomplete="current-password"]').type(process.env.GHOST_LAB_PASSWORD);
  await page.locator('#ember11').click();

  // Set the download directory for the current browser context
  // await page.context().setDefaultDownloadOptions({ directory: downloadDirectory });

  await page.locator(`'[data-ember-action-328="328"]'`).click();

  // Wait for the download event to occur
  const download = await page.waitForEvent('download');

  // Save the downloaded file
  console.log(await download.path());

  const filePath = path.join(downloadDirectory, download.suggestedFilename);
  await download.saveAs(filePath);
});
