const URL = require('./info.js')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL)
  await page.focus('oldPassword')
  await page.keyboard.type('keyboard.png' )
  
  const content = await page.content();
  console.log(content);

  await browser.close()
})()