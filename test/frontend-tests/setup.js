const path = require('path');
const { promisify } = require('util');
const puppeteer = require('puppeteer');

function gotoPage(page) {
  return new Promise(resolve => {
    const navigater = setInterval(async () => {
      let failed = false;
      try {
        await page.goto('http://localhost:3213', { waitUntil: 'networkidle2' });
      } catch (e) {
        failed = true;
      }

      if (!failed) {
        clearInterval(navigater);
        resolve();
      }
    }, 1000);
  });
}

async function frontend_tests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('waiting for navigation....');
  await gotoPage(page);

  // change the size of the browser for better screenshots
  await page.setViewport({
    width: 1240,
    height: 900
  });

  const { testFiles } = global;
  const testPromises = [];
  testFiles.forEach(file => {
    const { browserTest, puppeteerTest } = require(file);
    const promises = [];
    if (browserTest) {
      promises.push(page.evaluate(browserTest));
    }

    if (puppeteerTest) {
      promises.push(puppeteerTest(page));
    }

    testPromises.push(...promises);
  });

  await Promise.all(testPromises);
  await browser.close();
}

module.exports = frontend_tests;
