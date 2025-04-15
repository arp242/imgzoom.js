imgzoom.js is an image zoomer: it will animate images to the maximum allowable
size by the viewport, but will never make them larger than the image's actual
size. Images are zoomed only if the larger version is actually larger than the
original.

This is an alternative to "lightbox" and such for many cases. It's snappy,
simple, and looks nice.

Some example usages:

- [Demo](https://arp242.github.io/imgzoom.js/example.html)
- [bestasciitable.com](https://bestasciitable.com)
- [goatcounter.com](https://www.goatcounter.com)

There are no external dependencies and should work well with pretty much any
modern-ish browser.

---

The simplest usage is to just use an `<img>` tag:

    <img src="http://example.com/image.jpg" style="width: 300px">
    <script>
        imgzoom(window.my_img)
    </script>

The `src` attribute is automatically used; images will only be zoomed if the
zoomed version is actually larger.




Use `data-large` to specify a different large image:

    <img src="http://example.com/thumbnail.jpg" data-large="http://example.com/fullsize.jpg">

You can bind to all images with something like:

	<script>
		window.addEventListener('load', () => {
			document.querySelectorAll('img').forEach((img) => img.addEventListener('click', imgzoom))
		})
	</script>


For best results you probably want to add a wee bit of styling:

    img.imgzoom-loading { cursor:wait !important; }
    .imgzoom-large      { cursor:pointer; box-shadow:0 0 8px rgba(0, 0, 0, .3); }
    @media not (prefers-reduced-motion: reduce) {
        .imgzoom-large  { transition:all .4s; }
    }


And that's it!
