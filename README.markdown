[![This project is considered stable](https://img.shields.io/badge/Status-stable-green.svg)](https://arp242.net/status/stable)

imgzoom is a simple image zoomer. It will animate images to the maximum
allowable size by the viewport, but will never make them larger than the image's
actual size. Images are zoomed only if the larger version is actually larger
than the original.

[Demo](https://arp242.github.io/imgzoom/example.html)

This is a simpler (and IMHO, better) alternative to "lightbox" scripts. This
script has no external dependencies and should work well with pretty much any
browser (including IE11, but not tested with versions).

Basic usage:

    <img src="http://example.com/image.jpg" style="width: 300px">

or:

    <img src="http://example.com/thumbnail.jpg" data-large="http://example.com/fullsize.jpg">

Then bind to the click event with e.g.

```javascript
window.addEventListener('load', function() {
    var img = document.querySelectorAll('img');
    for (var i=0; i<img.length; i++) {
        img[i].addEventListener('click', function() { imgzoom(this); }, false);
    }
});
```

With jQuery it's even easier:

```javascript
$(document).ready(function() {
    $('img').on('click', function() { imgzoom(this); });
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
