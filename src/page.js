const regLayout = /<!-- #layout \b(\w+)\b -->\n([\s\S]*)/;
const regMixin = /<!-- #mixin \b(\w+)\b -->\n([\s\S]*)/;
const regPage0 = /<!-- #page -->\n([\s\S]*)/;
const regPage = /<!-- #page \b(\w+)\b -->\n([\s\S]*)/;
const regPage2 = /<!-- #page \b(\w+)\b \b(\w+)\b -->\n([\s\S]*)/;


function jener(defs) {

  let layouts = {},
      mixins = {},
      ctx = {
        layouts,
        mixins
      },
      res = [];

  let pages = [];

  for (let i = 0; i < defs.length; i+=2) {
    let filename = defs[i],
        content = defs[i+1];

    let match;

    if ((match = content.match(regPage))) {
      pages.push(filename);
      pages.push(page(match[2], match[1]));
    } else if ((match = content.match(regPage0))) {
      pages.push(filename);
      pages.push(page(match[1]));
    } else if ((match = content.match(regPage2))) {
      pages.push(filename);
      pages.push(page(match[3],
                      match[1], 
                      match[2]));
    } else if ((match = content.match(regLayout))) {
      layouts[match[1]] = layout(match[2]);
    } else if ((match = content.match(regMixin))) {
      mixins[match[1]] = mixin(match[2]);
    }    
  }

  for (let i = 0; i < pages.length; i+=2) {
    res.push(pages[i], genPage(ctx, pages[i+1]));
  }

  return res;
}

function genPage(ctx, fsPage) {
  let res = {
    res:``
  };
  fsPage.forEach(f => f(ctx, res));
  return res.res;
}

function layout(layout) {
  return {
  };
}

function mixin(mixin) {
  return {
  };
}

function page(page, layout, replace) {
  return [
    fappend(page)
  ];
}

function fappend(content) {
  return (ctx, res) => {
    res.res += content;
  };
}

module.exports = jener;
