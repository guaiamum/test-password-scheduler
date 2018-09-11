const DEBUG = false;
const { URL, USER, USER_FIELD, PASS, PASS_FIELD, SUBMIT_BUTTON, SUCCESS_SELECTOR} = require('./info.js');
const { getParagraphsContent } = require('./helpers.js');
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
  const success = await page.$eval(SUCCESS_SELECTOR, (el) => el.outerHTML || null).catch((err) => {
    console.log('\nErro ao fazer Login! Reveja suas credenciais!');
    return false;
  });

  if (success) {
    let message = 'Hi';
    let shell = '';

    if(process.platform === 'linux') {
      shell = 'notify-send';
      message = getParagraphsContent(success)[1];
    }
    
    exec(`${shell} \'${message}\'`)
  }

  if (!DEBUG){
    await browser.close();
  }

  console.log('Bye :)');
  return;
})()