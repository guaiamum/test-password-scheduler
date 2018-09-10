const DEBUG = false;
const info = require('./info.js');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: !DEBUG });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(info.URL);

  //populates fields
  await page.focus(info.USER_FIELD)
  await page.keyboard.type(info.USER)
  await page.focus(info.PASS_FIELD)
  await page.keyboard.type(info.PASS)

  //submitting form
  await Promise.all([page.evaluate((info) => {
      return document.querySelector(info.SUBMIT_BUTTON).click();
    }, info),
    page.waitForNavigation()
  ])

  //fetching  result
  const success = await page.$eval(info.SUCCESS_SELECTOR, (el) => el.outerHTML || null).catch((err) => {
    console.log('\nErro ao fazer Login! Reveja suas credenciais!');
    return false;
  });

  if (success) {
    console.log('\n\n', success);
  }

  if (!DEBUG)
    await browser.close();

  return;
})()