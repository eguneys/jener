## Jener

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

3. Define final page using the layout:

```html
<!-- #page mypage main article -->
<div>
  Text
</div>
```

4. Run `jener` and, it generates the output file:

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

It has only 2 features, mix-in and layout, to generate a page.

I asked [this question](https://stackoverflow.com/questions/63865108/how-to-code-a-simple-static-page-generator) on Stackoverflow which ended up deleted.

### Usage

In a folder, put all your layouts mix-in and page definitions, in separate `html` files.

Then `cd` into the folder and run `jener outputdirectory`. This will generate all your page definitions into the `outputdirectory`.

### Details

mix-in named `mymixin` is defined with `#mixin` command inside an html comment:
```html
<!-- #mixin mymixin -->
```
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

A page is defined with a `#page` command. Pages don't have to have a layout and can use mix-ins:
```html
<!-- #page mypage -->
```
A page with a `main` layout, named `mypage`, is defined as:
```html
<!-- #page mypage main -->
```
page with a layout must specify which area to replace from the layout.
```html
<!-- #page mypage main -->
<!-- #content article -->
```
That, replaces `#article` area.

There is a shorthand for above two commands:
```html
<!-- #page mypage main article -->
```

A layout can define multiple area's to be replaced and page can specify multiple areas to replace from the layout.

All page definitions export into a separate html file.
Output filename is the same as the filename of the page definition.

Happy blogging 💙
