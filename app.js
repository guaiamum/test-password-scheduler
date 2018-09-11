const DEBUG = false;
const { URL, USER, USER_FIELD, PASS, PASS_FIELD, SUBMIT_BUTTON, SUCCESS_SELECTOR } = require('./info.js');
const { getParagraphsContent, getDate } = require('./helpers.js');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  const browser = await puppeteer.launch({ headless: !DEBUG });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(URL);

  //populates fields
  await page.focus(USER_FIELD);
  await page.keyboard.type(USER);
  await page.focus(PASS_FIELD);
  await page.keyboard.type(PASS);

  //submitting form
  await Promise.all([page.evaluate((SUBMIT_BUTTON) => {
      return document.querySelector(SUBMIT_BUTTON).click();
    }, SUBMIT_BUTTON),
    page.waitForNavigation()
  ]);

  //fetching  result
  const success = await page.$eval(SUCCESS_SELECTOR, (el) => el.outerHTML || null).catch((err) => false);

  if (process.platform === 'linux') {
    let shell = '/usr/bin/notify-send';
    let title = '';
    let message = 'Tap this to close';
    
    if(!success){
      title = 'Login ERROR! Review your credentials!';
    } else {
      let paragraphs = getParagraphsContent(success);
      let expiringDate = getDate(paragraphs);
      let now = new Date(), nextWeek = now.setDate(now.getDate()+7);
      title = expiringDate <= nextWeek ? `Your password expires SOON (${expiringDate.toUTCString().substring(0,16)})!` : paragraphs[1];
    }

    exec(`${shell} '${title}' '${message}'`);
  }

  if (!DEBUG){
    await browser.close();
  }

  console.log('Bye :)');
  return;
})()