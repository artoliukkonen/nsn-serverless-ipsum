let Parser = require('rss-parser');
let parser = new Parser();

let textsCache = [];

const randomItem = items => {
  return items[Math.floor(Math.random() * items.length)].trim() || randomItem(items); // Epic infinite loop on invalid content ^^
}

const handler = async (event) => {
  if (!textsCache.length) {
    let feed = await parser.parseURL('https://serverless.com/blog/feed.xml');
    console.log(feed.title);

    let texts = '';

    feed.items.forEach(item => {
      texts = `${texts} ${item['content:encoded']}`;
    });

    texts = texts.replace(/<(?:.|\n)*?>/gm, '').replace(/\n/g, ' ').replace(['.', ','], '').split(' ');
    textsCache = texts;
  }

  console.log(textsCache);

  const paragraphs = Math.min(event.queryStringParameters && event.queryStringParameters.paragraphs || 3, 10);

  const result = [];
  for (let i = 0; i < paragraphs; i++) {
    let p = '';
    const sentences = Math.max(Math.ceil(Math.random() * 20), 10);
    for (let k = 0; k < sentences; k++) {
      const sentenceLength = Math.max(Math.ceil(Math.random() * 10), 4);
      for (let j = 0; j < sentenceLength; j++) {
        p += ` ${randomItem(textsCache)}`;
      }
      p += ". ";
    }
    result.push(p);
  }

  console.log(result);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ result })

  };
};

module.exports.handler = handler;