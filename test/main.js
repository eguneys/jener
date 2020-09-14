let jener = require('../src/page');

let silentlog = false;//true;
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

function singleLayoutShort() {
  console.log('generates page from layout short');

  const layout = `
<!-- #layout main -->
<html>
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
<body>
<div>
  Text
</div>
</body>
</html>
`;

  let [_, genout] = jener(['layout.html', layout,
                           'page.html', page]);

  equal('output is good',
        genout, pageOut);   
}

function singleLayout() {
  console.log('generates page from layout');

  const layout = `
<!-- #layout main -->
<html>
<body>
<!-- #content article -->
</body>
</html>
`;

  const page = `
<!-- #page main -->
<!-- #content article -->
<div>
  Text
</div>
`;

  const pageOut = `<html>
<body>
<div>
  Text
</div>
</body>
</html>
`;

  let [_, genout] = jener(['layout.html', layout,
                           'page.html', page]);

  equal('output is good',
        genout, pageOut);   
}


function singleMixin() {
  console.log('generates page with a mixin');

  const mixin = `
<!-- #mixin head -->
<head>
</head>`;

  const page = `
<!-- #page -->
<html>
<!-- #include head -->
<div>
  Text
</div>
</html>
`;

  const pageOut = `<html>
<head>
</head>
<div>
  Text
</div>
</html>
`;

  let [_, genout] = jener(['mixin.html', mixin,
                           'page.html', page]);

  equal('output is good',
        genout, pageOut);   
}



function steps() {

  console.log('generates steps page');

  const mixin = `
<!-- #mixin head -->
<head>
</head>`;

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

  function multiplePages() {
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
         fname2, out2] =  jener(['mixins.html', mixin,
                                 'layout.html', layout,
                                 'page.html', page,
                                 'page2.html', page2]);

    equal('filenames', 
          fname1 + fname2, 'page.htmlpage2.html');

    equal('output1', out1, pageOut);
    equal('output2', out2, page2Out);
  }

  multiplePages();
  
}

function multipleContent() {

  console.log('generates page with multiple contents');

  const layout = `
<!-- #layout main -->
<html>
<!-- #content head -->
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
<!-- #content head -->
<head>
</head>
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

  let [filename, genout] = jener(['layout.html', layout,
                                  'page.html', page]);

  equal('output is good',
        genout, pageOut);

}

function equal(msg, a, b) {
  let res = msg;
  if (a === b) {
    res += ' ✓ Pass';
  } else {
    res += ' ❌ Fail\n';
    res += a + ' !== ' + b;

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        res += `\ni:${i} ${a[i]} !== ${b[i]}`;
        break;
      }
    }

    failexit = true;
  }
  if (silentlog) {
    return;
  }
  console.log(res);
}

(() => {

  // singlepage();
  // singleLayout();
  // singleMixin();
  // singleLayoutShort();
  // steps();
  multipleContent();
  

  process.exit(failexit ? 1 : 0);
})();
