// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

test('Download file', async ({ page }) => {
  // Set the download directory path
  const downloadDirectory = path.resolve(__dirname, 'downloads');

  await page.goto(process.env.ghost_lab_url);
  await page.locator('[autocomplete="username"]').type(process.env.ghost_lab_username);
  await page.locator('[autocomplete="current-password"]').type(process.env.ghost_lab_password);
  await page.locator('#ember11').click();

  // Set the download directory for the current browser context
  await page.context().setDefaultDownloadOptions({ directory: downloadDirectory });

  await page.locator(`'[data-ember-action-328="328"]'`).click();

  // Wait for the download event to occur
  const download = await page.waitForEvent('download');

  // Save the downloaded file
  const filePath = path.join(downloadDirectory, download.suggestedFilename);
  await download.saveAs(filePath);
});