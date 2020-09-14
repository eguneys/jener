let fs = require('fs');

let jener = require('./page');

function readFiles(indir, cb) {
  fs.readdir(indir, (err, files) => {
    if (err) {
      cb(err);
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

function writeFiles(pages, outdir) {
  console.log(outdir);
}

function app() {
  let indir = process.argv[2];
  let outdir = process.argv[3];
  readFiles(indir, (err, defs) => {
    if (err) {
      throw err;
    }

    writeFiles(jener(defs), outdir, err => {
      if (err) {
        throw err;
      }

      console.log('Done.');
    });
  });
}

app();