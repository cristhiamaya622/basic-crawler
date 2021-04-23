const fetch = require('node-fetch');
const fs = require('fs');
const url = 'http://www.merckgroup.com/en/research/science-space/presentations/joachim-kaiser-imid-2018.html';
// 'http://www.merckgroup.com/en/research/science-space/presentations/joachim-kaiser-imid-2018.html';
// 'https://www.merckgroup.com/en/publications/download-gallery/sites-and-buildings/headquarters-darmstadt/180329-162855-mda-drohne-0117-final.html'

(async function crawler() {
  const data = await fetch(url, {});
  const body = await data.text();

  fs.writeFile('output.html', body, function (err) {
    if (err) throw err;
  });
})();