const nodeHtmlToImage = require('node-html-to-image')

exports.handler = async function (event) {
  const data = JSON.parse(event.body)
  let timestamp = Date.now()

  const image = await nodeHtmlToImage({
    output: `./public/img/store/${timestamp}.png`,
    transparent: true,
    html: `<html>
    <head>
    <style>
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
    <div class="canvas" style="background-color: {{data.bgColor}}; align-items: {{data.align}}; justify-content: {{data.justify}};">
      <h1 style="font-size: {{data.titleTextSize}}px; color: {{data.titleTextColor}}">
        {{data.title}}
      </h1>
      <h2 style="font-size: {{data.subTitleTextSize}}px; color: {{data.subTitleTextColor}}">
        {{data.subTitle}}
      </h2>
      {{#if data.url}}
        <div>
        <img class="profile-image" src="{{data.url}}"/>
      </div>
      {{/if}}
    </div>
    </body>
    </html>`,
    content: {
      data: data,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify('./img/store/' + timestamp + '.png'),
  }
}
