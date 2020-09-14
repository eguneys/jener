const regLayout = /<!-- #layout \b(\w+)\b -->\n([\s\S]*)/;
const regMixin = /<!-- #mixin \b(\w+)\b -->\n([\s\S]*)/;
const regPage0 = /<!-- #page -->\n([\s\S]*)/;
const regPage = /<!-- #page \b(\w+)\b -->\n([\s\S]*)/;
const regPage2 = /<!-- #page \b(\w+)\b \b(\w+)\b -->\n([\s\S]*)/;


const regPageContent = 
      /<!-- #content \b(\w+)\b -->\n([\s\S]*)/;
const regPageContentNonGreedy = 
      /<!-- #content \b\w+\b -->\n[\s\S]*?(?=<!-- #content|$)/g;
const regPageContentRest =
      /([\s\S]*?)(?=<!-- #content|$)/;

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
    res.push(pages[i], genFromPage(ctx, pages[i+1]));
  }

  return res;
}

function genFromPage(ctx, fsPage) {
  let res = {
    res:``,
    replace: {}
  };
  fsPage.forEach(f => {
    f(ctx, res);
  });
  return res.res;
}

function layout(layout) {
  let res = [];
  
  let prematch = layout.match(regPageContentRest);

  res.push(fappend(prematch[1]));

  let matchs = layout.match(regPageContentNonGreedy);

  matchs.forEach(match => {
    let [_, name, text] = match.match(regPageContent);

    res.push(fcontent(name));
    res.push(fappend(text));
  });

  return res;
}

function mixin(mixin) {
  return mixin;
}

function page(page, layout, replace) {

  if (!layout) {
    return [
      fappend(page)
    ];
  }

  let innerMatch;

  let res = [];

  if (replace) {
    let match = page.match(regPageContentRest);

    res.push(
      freplace(replace, match[1])
    );
  }

  let matchs = page.match(regPageContentNonGreedy);

  if (matchs) {
    matchs.forEach(match => {
      let [_, name, body] = match.match(regPageContent);
      res.push(
        freplace(name, body)
      );
    });
  }

  res.push(flayout(layout));

  return res;
}

function freplace(content, body) {
  return (ctx, res) => {
    res.replace[content] = body;
  };
}

function fappend(body) {
  return (ctx, res) => {
    let { mixins } = ctx;

    for (let mixin in mixins) {
      let regexStr = `<!-- #include ${mixin} -->\n?`;
      body = body.replace(new RegExp(regexStr), mixins[mixin]);
    }

    res.res += body;
  };
}

function flayout(layout) {
  return (ctx, res) => {
    let { layouts } = ctx;
    layout = layouts[layout];

    layout.forEach(f => {
      f(ctx, res);
    });
  };
}

function fcontent(name) {
  return (ctx, res) => {
    fappend(res.replace[name])(ctx, res);
  };
}

module.exports = jener;
