const info = require('./info.js')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(info.URL)

  //populates fields
  await page.focus(info.USER_FIELD)
  await page.keyboard.type(info.USER)
  await page.focus(info.PASS_FIELD)
  await page.keyboard.type(info.PASS)
  
  // await page.$eval('form', form => form.submit());
  // const text = page.evaluate(() => document.querySelector('div.msg_yes').textContent);
  // console.log(text);

  // await browser.close()
})()