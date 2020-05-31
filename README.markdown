[![This project is considered stable](https://img.shields.io/badge/Status-stable-green.svg)](https://arp242.net/status/stable)

imgzoom is an image zoomer: it will animate images to the maximum allowable size
by the viewport, but will never make them larger than the image's actual size.
Images are zoomed only if the larger version is actually larger than the
original.

This is a good alternative to "lightbox" and such for many cases. It's snappy,
simple, and looks nice.

Some example usages:

- [Demo](https://arp242.github.io/imgzoom/example.html)
- [bestasciitable.com](https://bestasciitable.com)
- [goatcounter.com](https://www.goatcounter.com)

There are no external dependencies and should work well with pretty much any
browser (including IE11, mobile, etc.)

It's a small library: 4.4k (1.9k gzip'd). If you really want to save bytes you
can minify it to 2.4k (978 bytes gzip'd).

`window.imgzoom` will be exported when loaded via a `<script>` tag, or you can
use `import imgzoom from 'imgzoom'` from WebPack etc.

---

Basic usage:

```html
<img src="http://example.com/image.jpg" style="width: 300px">
```

The `src` attribute is automatically used; images will only be zoomed if the
zoomed version is actually larger.

Use `data-large` to specify a different larger image:

```html
<img src="http://example.com/thumbnail.jpg" data-large="http://example.com/fullsize.jpg">
```

Then bind to the click event with something like:

```javascript
window.addEventListener('load', function() {
    var img = document.querySelectorAll('img')
    for (var i=0; i<img.length; i++) {
        img[i].addEventListener('click', imgzoom)
    }
})
```

With jQuery it's even easier:

```javascript
$(document).ready(function() {
    $('img').on('click', imgzoom)
})
```

For best results you probably want to add a wee bit of styling:

```css
img.imgzoom-loading { cursor: wait !important; }
.imgzoom-large      { cursor: pointer; box-shadow: 0 0 8px rgba(0, 0, 0, .3); }
@media not (prefers-reduced-motion: reduce) {
    .imgzoom-large  { transition: all .4s; }
}
```

And that's it!
