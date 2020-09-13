## Jener

Bare simple static site generator ever.

1. Define a mix-in:

    <!-- #mixin mymixin -->
    <head>
    </head>

2. Define a layout and use the mixin:

    <!-- #layout main -->
    <html>
    <!-- #include head -->
    <body>
      <!-- #content article -->
    </body>
    </html>

3. Define final page using the layout:

    <!-- #page mypage main article -->
    <div>
      Text
    </div>

4. Run `jener` and, it generates the output file:

   <html>
     <head>
     </head>
     <body>
       <div>
        Text
       </div>
     </body>
   </html>
    

It has only 2 features, mix-in and layout, to generate a page.

I asked [this question](https://stackoverflow.com/questions/63865108/how-to-code-a-simple-static-page-generator) on Stackoverflow which ended up deleted.

### Usage

In a folder, put all your layouts mix-in and page definitions, in separate `html` files.

Then `cd` into the folder and run `jener outputdirectory`. This will generate all your page definitions into the `outputdirectory`.

### Details

mix-in named `mymixin` is defined with `#mixin` command inside an html comment:
    <!-- #mixin mymixin -->

layout named `main` is defined the same:

    <!-- #layout main -->

mix-in's are included with a #include command:

    <!-- #include head -->

a layout defines area (named `article`) to replace with content with `#content` command:

    <!-- #content article -->

a page is defined with a #page command. Pages don't have to have a layout and can use mix-ins:

    <!-- #page mypage -->

a page with a `main` layout, named `mypage`, is defined as:

    <!-- #page mypage main -->

page with a layout must specify which area to replace from the layout.

    <!-- #page mypage main -->
    <!-- #content article -->

replaces `#article` area.

There is a shorthand for above two commands:

    <!-- #page mypage main article -->

All page definitions export into a separate html file.
Output filename is the same as the filename of the page definition.

Happy blogging <3
