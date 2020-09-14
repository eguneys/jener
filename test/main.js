let jener = require('../src/page');

let silentlog = false;
let failexit = false;


(() => {

  inlineContent();

  singlepage();
  singleLayout();
  singleMixin();
  singleLayoutShort();
  steps();
  multipleContent();
  emptyBodyExample();
  exampleexample();

  process.exit(failexit ? 1 : 0);
})();

function inlineContent() {

  console.log('inline content');

const layout = `
<!-- #layout main -->
<html>
  <head><!-- #content header --></head>
<body>
<date><!-- #content date --></date>
</body>
</html>
`;

const page = `
<!-- #page main header -->
Page Header
<!-- #content date -->
September`;

const out = `<html>
  <head>Page Header</head>
<body>
<date>September</date>
</body>
</html>
`;


  let [_, genout] = jener(['', layout,
                           '', page]);

  equal('gen is ok', out, genout);

}

function emptyBodyExample() {

  console.log('empty body example');

    let layout = `
<!-- #layout home -->
<html>
  <head>
    <!-- #include head -->
    <!-- #content head -->
  </head>
  <body>
    <!-- #include header -->

    <!-- #content body -->

    <!-- #include footer -->
  </body>
</html>
`;

let mixin = `
<!-- #mixin head -->
<title>Steps Example</title>
<script src="index.js"></script>
`;

let about = `
<!-- #page home -->
<!-- #content head -->
<link rel="stylesheet" src="about.css"/>

<!-- #content body -->
<section>
  Steps About Body
</section>
`;

let pageOut = `<html>
  <head>
    <title>Steps Example</title>
<script src="index.js"></script>
    <link rel="stylesheet" src="about.css"/>

  </head>
  <body>
    <!-- #include header -->

    <section>
  Steps About Body
</section>

    <!-- #include footer -->
  </body>
</html>
`;

  let [_, genOut] = jener(['', layout,
                           '', mixin,
                           '', about]);

  equal('output is good',
        genOut, pageOut);
}

function exampleexample() {

  console.log('example example');
  
  let layout = `
<!-- #layout home -->
<html>
  <head>
    <!-- #include head -->
    <!-- #content head -->
  </head>
  <body>
    <!-- #include header -->
    <!-- #content body -->
    <!-- #include footer -->
  </body>
</html>
`;

let mixin = `
<!-- #mixin head -->
<title>Steps Example</title>
<script src="index.js"></script>
`;

let footermixin = `
<!-- #mixin footer -->
<footer>
  Steps Footer
</footer>
`;

let headermixin = `
<!-- #mixin header -->
<header>
  Steps Header
</header>
`;

  let page = `
<!-- #page home head -->
<link rel="stylesheet" src="index.css"/>
<!-- #content body -->
<section>
  Steps Body
</section>
`;

let about = `
<!-- #page home -->
<!-- #content head -->
<link rel="stylesheet" src="about.css"/>

<!-- #content body -->
<section>
  Steps About Body
</section>
`;

  let pageOut = `<html>
  <head>
    <title>Steps Example</title>
<script src="index.js"></script>
    <link rel="stylesheet" src="index.css"/>  </head>
  <body>
    <header>
  Steps Header
</header>
    <section>
  Steps Body
</section>
    <footer>
  Steps Footer
</footer>
  </body>
</html>
`;

let aboutOut = `<html>
  <head>
    <title>Steps Example</title>
<script src="index.js"></script>
    <link rel="stylesheet" src="about.css"/>

  </head>
  <body>
    <header>
  Steps Header
</header>
    <section>
  Steps About Body
</section>
    <footer>
  Steps Footer
</footer>
  </body>
</html>
`;

  let [_, genout, __, genabout] = jener(['', layout,
                           '', mixin,
                           '', footermixin,
                           '', headermixin,
                           'page.html', page,
                           'about.html', about]);

  equal('output is good',
        genout, pageOut);

  equal('about is good',
        genabout, aboutOut);
  
}


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
</head>
`;

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
</div></body>
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

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        res += `\ni:${i} [${a[i]}!=${b[i]}]`;
        a = a.substring(i-2, i + 20);
        b = b.substring(i-2, i + 20);
        res += a + ' !== ' + b;
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
