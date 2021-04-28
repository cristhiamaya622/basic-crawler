const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const url = 'http://www.merckgroup.com/en/research/science-space/presentations/joachim-kaiser-imid-2018.html';
// 'http://www.merckgroup.com/en/research/science-space/presentations/joachim-kaiser-imid-2018.html';
// 'https://www.merckgroup.com/en/publications/download-gallery/sites-and-buildings/headquarters-darmstadt/180329-162855-mda-drohne-0117-final.html'

const CLASSES = {
  authorInfo: "text-block-content"
};

function getAuthorName(authorWrapper) {
  const firstParagraph = authorWrapper.getElementsByTagName('p')[0];
  firstParagraph.getElementsByTagName('strong')[0].remove();
  return firstParagraph.innerHTML;
}

function getAgenda(authorWrapper) {
  const agendaInfo = authorWrapper.getElementsByTagName('li');
  return Object.values(agendaInfo).map(info => info.innerHTML).join(" ");
}

(async function crawler(url) {
  const data = await fetch(url, {});
  const body = await data.text();
  const document = new JSDOM(body).window.document;
  const authorWrapper = document.getElementsByClassName(CLASSES.authorInfo)[0];

  fs.writeFile('output.html', body, function (err) {
    if (err) throw err;
  });

  const crawledInfo = {
    author: getAuthorName(authorWrapper),
    agenda: getAgenda(authorWrapper)
  }

  console.log("Crawled Info: ", crawledInfo);

  return crawledInfo;
})(url);