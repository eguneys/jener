function steps() {

  console.log('jener test');

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

  let ctx = jener([mixin, layout, page]);

  

  equal('jenerate steps page');

}

function equal(msg, a, b) {
  if (a === b) {
    console.log('Pass', msg);
  } else {
    console.log('Fail', msg);
  }
}

(() => {
  steps();
})();
