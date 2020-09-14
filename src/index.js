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

function writeFiles(pages, outdir, cb) {
  let c = 0;
  for (let i = 0; i < pages.length; i+= 2) {
    let filename = pages[i],
        content = pages[i+1];

    fs.writeFile(`${outdir}/${filename}`, content, (err) => {
      if (err) {
        console.log(`Error writing output file ${filename} skipping, ${err.message}`);
      } else {
        console.log('✓ ' + filename);
      }
      c++;

      if (c * 2 === pages.length) {
        cb(null, c);
      }      
    });
  }
}

function app() {
  let indir = process.argv[2];
  let outdir = process.argv[3];


  readFiles(indir, (err, defs) => {
    if (err) {
      throw err;
    }

    writeFiles(jener(defs), outdir, (err, c) => {
      if (err) {
        throw err;
      }
      console.log(`Generated ${c} files.`);
    });
  });
}

app();
