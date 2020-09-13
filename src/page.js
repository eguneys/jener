const regLayout = /<!-- #layout \b(\w+)\b -->\n([\s\S]*)/;
const regMixin = /<!-- #mixin \b(\w+)\b -->\n([\s\S]*)/;
const regPage0 = /<!-- #page -->\n([\s\S]*)/;
const regPage = /<!-- #page \b(\w+)\b -->\n([\s\S]*)/;
const regPage2 = /<!-- #page \b(\w+)\b \b(\w+)\b -->\n([\s\S]*)/;


const regPageContent = /<!-- #content \b(\w+)\b -->\n([\s\S]*)/;
const regPageContentRest = /([\s\S]*)<!-- #content \b\w+\b -->/;

const regHashCommand = /([\s\S]*)<!-- #\b(\w+)\b \b(\w+)\b -->\n([\s\S]*)/;

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
  fsPage.forEach(f => f(ctx, res));
  return res.res;
}

function layout(layout) {
  let res = [];
  
  let rest = layout;

  let match,
      secondmatch;

  while (rest.length > 0) {
    match = rest.match(regHashCommand);

    if (match) {
      let [_, text, command, argument, _rest] = match;

      if (command === 'content') {
        res.push(fappend(text));
        res.push(fcontent(argument));
      } else if (command === 'include') {
        // TODO
      }

      rest = _rest;

    } else {
      res.push(fappend(rest));
      break;
    }
  }
  
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

  let res = [];
  let rest = page;
  let match,
      secondmatch;

  if (replace) {
    secondmatch = rest.match(regPageContentRest);

    if (secondmatch) {
      res.push(
        freplace(replace, secondmatch[1])
      );
      rest = secondmatch[2];
    } else {
      res.push(
        freplace(replace, rest)
      );
    }
  }

  while (rest.length > 0) {

    match = rest.match(regPageContent);

    if (match) {
      secondmatch = match[2].match(regPageContentRest);

      if (secondmatch) {
        res.push(
          freplace(match[1], secondmatch[1])
        );
        rest = secondmatch[2];
      } else {
        res.push(
          freplace(match[1], match[2])
        );
        break;
      }
    } else {
      break;
    }
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
      body = body.replace(`<!-- #include ${mixin} -->`, mixins[mixin]);
    }

    res.res += body;
  };
}

function flayout(layout) {
  return (ctx, res) => {
    let { layouts } = ctx;
    layout = layouts[layout];

    layout.forEach(f => f(ctx, res));
  };
}

function fcontent(name) {
  return (ctx, res) => {
    fappend(res.replace[name])(ctx, res);
  };
}

module.exports = jener;
