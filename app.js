const DEBUG = false;
const info = require('./info.js');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  const browser = await puppeteer.launch({ headless: !DEBUG });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(info.URL);

  //populates fields
  await page.focus(info.USER_FIELD);
  await page.keyboard.type(info.USER);
  await page.focus(info.PASS_FIELD);
  await page.keyboard.type(info.PASS);

  //submitting form
  await Promise.all([page.evaluate((info) => {
      return document.querySelector(info.SUBMIT_BUTTON).click();
    }, info),
    page.waitForNavigation()
  ]);

  //fetching  result
  const success = await page.$eval(info.SUCCESS_SELECTOR, (el) => el.outerHTML || null).catch((err) => {
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

  if (!DEBUG)
    await browser.close();

  return;
})()

function getParagraphs(str) {
  return str.match(/<p>.*?<\/p>/g);
}

function getParagraphsContent(str) {
  return getParagraphs(str).map((e)=>e.replace(/<p>|<\/p>/g,''));
}

function getDate(str) {
  const contentArray = getParagraphsContent(str);
  return contentArray[1].substr(contentArray.length-12);
}