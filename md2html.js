let showdown  = require('showdown'),
    converter = new showdown.Converter()


var fs = require('fs-extra');

let readmeText = fs.readFileSync('./README.md','utf8')


let html = converter.makeHtml(readmeText);

if('./index.html'){
  fs.unlink('index.html', function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
}

fs.appendFile('index.html', html, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
