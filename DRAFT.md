<!-- #layout main -->
    <html>
    <!-- #include head -->
    <body>
      <!-- #content article -->
    </body>
    </html>

    template: {
        append: '<html>\n',
        include: 'head',
        append: '<body>\n',
        content: 'article',
        append: '</body>\n</html>'
    }

<!-- #page main article -->
<div>
  Text
</div>

    {
        layout: main,
        replace: { article { append: 'div' } }
    }
