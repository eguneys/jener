let jener = require('../src/page');

let failexit = false;

function singlepage() {
  console.log('generates single page');

  const page = `
<!-- #page -->
<div>
  Text
</div>
`;

  const pageOut = `<div>
  Text
</div>
`;

  let [_, genout] = jener(['page.html', page]);

  equal('output is good',
        genout, pageOut);  
}

function steps() {

  console.log('generates steps page');

  const mixin = `
<!-- #mixin testmixin -->
<head>
</head>
`;

  const layout = `
<!-- #layout main -->
<html>
<!-- #include head -->
<body>
  <!-- #content article -->
</body>
</html>
`;

  const page = `
<!-- #page main article -->
<div>
  Text
</div>
`;

  const pageOut = `<html>
  <head>
  </head>
  <body>
    <div>
     Text
    </div>
  </body>
</html>
`;

  let [filename, genout] = jener(['mixin.html', mixin,
                                  'layout.html', layout,
                                  'page.html', page]);

  equal('filename is the same for page', 
        filename, 'page.html');

  equal('output is good',
        genout, pageOut);


  const page2 = `
<!-- #page main -->
<!-- #content article -->
<div>
  Text
</div>
`;

  const page2Out = `<html>
  <head>
  </head>
  <body>
    <div>
     Text
    </div>
  </body>
</html>
`;  

  console.log('generate multiple pages');

  let [fname1, out1,
       fname2, out2] =  jener(['page.html', page,
                               'page2.html', page2]);

  equal('filenames', 
        fname1 + fname2, 'page.htmlpage2.html');

  equal('output1', out1, pageOut);
  equal('output2', out2, page2Out);

}

function equal(msg, a, b) {
  let res = msg;
  if (a === b) {
    res += ' ✓ Pass';
  } else {
    res += ' ❌ Fail\n';
    res += a + ' !== ' + b;
    failexit = true;
  }
  console.log(res);
}

(() => {
  singlepage();
  steps();

  process.exit(failexit ? 1 : 0);
})();
