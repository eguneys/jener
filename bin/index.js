#!/usr/bin/env node

let fs = require('fs');
let jener = require('../src');

let indir = process.argv[2];
let outdir = process.argv[3];

if (!indir || !outdir) {
  console.log('Usage: jener in-dir out-dir');
} else {

  fs.access(indir, err => {
    if (err) {
      console.log(err.message);
      return;
    }

    fs.access(outdir, err => {
      if (err) {
        console.log(err.message);
        return;
      }
      jener(indir, outdir);      
    });
  });
}
