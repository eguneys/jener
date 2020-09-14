## Jener [![Build Status](https://travis-ci.com/eguneys/jener.svg?branch=master)](https://travis-ci.com/eguneys/jener)

Bare simple static site generator ever.

1. Define a mix-in:

```html
<!-- #mixin mymixin -->
<head>
</head>
```

2. Define a layout and use the mixin:

```html
<!-- #layout main -->
<html>
<!-- #include mymixin -->
<body>
  <!-- #content article -->
</body>
</html>
```

3. Define a page using the layout:

```html
<!-- #page main article -->
<div>
  Text
</div>
```

4. Run `jener in-directory out-directory` and, it generates the output file for the page:

```html
<html>
  <head>
  </head>
  <body>
    <div>
     Text
    </div>
  </body>
</html>
```

It has only 2 features, mix-in and layout, to generate pages.

I asked [this question](https://stackoverflow.com/questions/63865108/how-to-code-a-simple-static-page-generator) on Stackoverflow which ended up deleted.

### Usage

Instal `jener` globally using `yarn global jener`.

In a folder, put all your layout, mix-in and page definitions, in separate `html` files.

Then run `jener in-directory out-directory`. This will generate all your page definitions inside in-directory into the `out-directory`.

### Details

mix-in named `mymixin` is defined with `#mixin` command inside an html comment:
```html
<!-- #mixin mymixin -->
```

mix-ins cannot include other mix-ins.

layout named `main` is defined the same:
```html
<!-- #layout main -->
```
mix-in's are included with a #include command:
```html
<!-- #include head -->
```
A layout defines area (named `article`) to replace with content with `#content` command:
```html
<!-- #content article -->
```

A page is defined with a `#page` command. Pages might not have a layout and can use mix-ins:
```html
<!-- #page -->
```

Pages don't have a name. All pages are exported with the same name as their definition file.

A page with a `main` layout, is defined as:
```html
<!-- #page main -->
```
page with a layout must specify which area to replace from the layout.
```html
<!-- #page main -->
<!-- #content article -->
```
That, replaces `#article` area.

There is a shorthand for above two commands:
```html
<!-- #page main article -->
```

A layout can define multiple area's to be replaced and page can specify multiple areas to replace from the layout.

All page definitions export into a separate html file.
Output filename is the same as the filename of the page definition.

## Contribute

Install dependencies: `yarn install`.
Run the tests: `yarn test`.
Run the examples: `yarn example`.

Happy blogging 💙
