const chromium = require('chrome-aws-lambda')

let timestamp = Date.now()

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)

  const html = `<html>
    <head>
    <style>
    *{
      margin: 0;
      padding: 0;
    }
    body{
      box-sizing: border-box;
	    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }
    .canvas{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 1200px;
      height: 630px;
      box-sizing: border-box;
      box-shadow: 0px 2px 50px 2px rgb(0 0 0 / 10%);
      overflow: hidden;
      padding: 2rem;
    }
    h1,
    h2 {
      padding: 0;
      margin: 0;
    }

    .profile-image {
      border-radius: 50%;
      object-fit: contain;
      width:200px;
      height:200px;
      margin-top: 1rem;
    }
    </style>
    </head>
    <body style="width:1200px; height: 630px; box-sizing: border-box;">
    <div class="canvas" style="background-color: ${
      data.bgColor
    }; align-items: ${data.align}; justify-content: ${data.justify};">
      <h1 style="font-size: ${data.titleTextSize}px; color: ${
    data.titleTextColor
  }">
        ${data.title}
      </h1>
      <h2 style="font-size: ${data.subTitleTextSize}px; color: ${
    data.subTitleTextColor
  }">
        ${data.subTitle}
      </h2>
      ${
        data.url
          ? `
      <div>
        <img class="profile-image" src="${data.url}"/>
      </div>
    `
          : ``
      }
    </div>
    </body>
    </html>`

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    // executablePath: '/usr/local/bin/chromium',
  })

  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle2' })
  await page.setViewport({
    width: 1200,
    height: 630,
  })

  const screenshot = await page.screenshot({
    encoding: 'base64',
    type: 'png',
    path: `public/img/store/${timestamp}.png`,
    omitBackground: true,
  })

  await browser.close()

  const base64Image = await screenshot.toString('base64');

  return {
    statusCode: 200,
    // body: JSON.stringify('./img/store/' + timestamp + '.png'),
    body: JSON.stringify(base64Image),
  }
}
