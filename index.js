let fs = require('fs');

let jener = require('./page');

function readFiles(indir, cb) {
  fs.readdir(indir, (err, files) => {
    if (err) {
      cb(err);
      return;
    }

    let res = [];
    files.forEach(file => {
      fs.readFile(`${indir}/${file}`, 'utf8', function (err, data) {
        if (err) {
          console.warn(`Couldn't read ${file} skipping. [${err.message}]`);
        }

        res.push(file, data);

        if (res.length === files.length * 2) {
          cb(null, res);
        }
      });
    });
  });
}

function writeFiles(pages, outdir, cb) {
  let c = 0,
      w = 0;

  for (let i = 0; i < pages.length; i += 2) {
    let filename = pages[i],
        content = pages[i + 1];
    fs.writeFile(`${outdir}/${filename}`, content, err => {
      if (err) {
        console.log(`skipping ${filename}, ${err.code}`);
      } else {
        console.log('✓ ' + filename);
        w++;
      }

      c++;

      if (c * 2 === pages.length) {
        cb(!w, w);
      }
    });
  }
}

function app(indir, outdir) {
  readFiles(indir, (err, defs) => {
    if (err) {
      console.error(`${err.code}`);
      return;
    }

    writeFiles(jener(defs), outdir, (err, c) => {
      if (err) {
        console.error(`Couldn't write any files`);
      } else {
        console.log(`Generated ${c} files.`);
      }
    });
  });
}

module.exports = app;