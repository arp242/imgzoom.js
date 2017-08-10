imgzoom is a simple image zoomer. It will animate images to the maximum
allowable size by the viewport, but will never make them larger than the
image's actual size.

This is a simple alternative to "lightbox" and such.

The URL for the large version is either 'data-large', or the image's src.

Caveat: this may use a lot of CPU if you're using very large images (e.g.
4500×6200) that need to be resized to fit the viewport.

-----

The imgzoom() function zooms the image. The `img` parameter is a reference to an
image element, either as a jQuery object or as an HTMLElement.

	window.imgzoom = (img) ->

Use the data-large attribute for the large image's src, or fall back to the
original image's src if it's not present.

		src = img.dataset.large or img.src

Don't do anything if there already a larger image open and it's the same as the
current one.

		if document.getElementsByClassName('imgzoom-large')?[0]?.src is src
			return

Construct a new Image object for the larger image.

		large = new Image()
		large.src = src

Add a class to indicate loading status.

		img.className += ' imgzoom-loading'

We use the load event (rather than just displaying it) to make sure the image is
fully loaded.

		large.onload = ->

Remove the loading class.

			img.className = img.className.replace /\s?imgzoom-loading\s?/g, ''

Make the new image as large as possible, but not larger than the viewport.

			width = large.width
			height = large.height

The 25px padding is to make sure that the image isn't right against the
window's edge, which looks a bit ugly.

			padding = 25
			window_width = document.documentElement.clientWidth - padding
			window_height = document.documentElement.clientHeight - padding

			if width > window_width
				height = height / (width / window_width)
				width = window_width
			if height > window_height
				width = width / (height / window_height)
				height = window_height
			else
				# Reset padding; don't need to apply any from here on.
				padding = 0

			offset = get_offset img

Add class for styling.

			large.className = 'imgzoom-large'

Set the new image's position to the same as the original image. We will grow it
later to the full size.

			large.style.position = 'absolute'
			large.style.zIndex = '5000'

			set_geometry large,
				width: img.width
				height: img.height
				top: offset.top
				left: offset.left

			document.body.appendChild large

Now animate it to the new size.

			set_geometry large,
				width: width
				height: height
				top: (window_height - height + padding) / 2 + get_scroll()
				left: (window_width - width) / 2

When closing we want to shrink it back to the original size.

			html = document.getElementsByTagName('html')[0]

			close_key = (e) ->
				return unless e.keyCode is 27
				close()

			close = ->
				html.removeEventListener 'click', close
				html.removeEventListener 'click', close_key
				set_geometry large,
					width: img.width
					height: img.height
					top: offset.top
					left: offset.left

Remove the class after a brief timeout, so that the animation appears fairly
smooth in case of added padding and such.

				# TODO: Detect position?
				setTimeout (-> large.parentNode?.removeChild large), 400

Close when clicking anywhere outside the image.

			html.addEventListener 'click', close

Close when pressing Escape.

			html.addEventListener 'keydown', close_key

Set the geometry of an element. Supported attributes for geom are width,
height, top, and left.

	set_geometry = (elem, geom={}) ->
		elem.style.width = "#{geom.width}px" if geom.width?
		elem.style.heigt = "#{geom.heigt}px" if geom.heigt?
		elem.style.left = "#{geom.left}px" if geom.left?
		elem.style.top = "#{geom.top}px" if geom.top?

Get the offset of an element.

	get_offset = (elem) ->
		rect = elem.getBoundingClientRect()
		doc = elem.ownerDocument
		docElem = doc.documentElement
		win = doc.defaultView
		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		}

Get the body's scroll position.

	get_scroll = -> document.documentElement.scrollTop or document.body.scrollTop
