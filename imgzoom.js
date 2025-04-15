// imgzoom is an image zoomer. It will animate images to the maximum allowable
// size by the viewport, but will never make them larger than the image's actual
// size.
//
// https://github.com/arp242/imgzoom | MIT license applies, see LICENSE.
;(function() {
	'use strict';

	let padding  = 25,  // Padding from the window edge.
	    min_size = 1.2  // The larger image must be 20% larger to do anything.

	// The imgzoom() function zooms the image on click. img_or_ev can either be
	// a reference to an image as a HTMLElement or a ClickEvent on the image.
	window.imgzoom = (img_or_ev) => {
		let img      = (img_or_ev instanceof Event) ? img_or_ev.target : img_or_ev,
		    src      = img.dataset.large || img.src,
		    existing = document.getElementsByClassName('imgzoom-large')
		if (existing.length > 0 && existing[0].src === src)
			return

		img.classList.add('imgzoom-loading')

		let large = new Image()

		// We use the load event (rather than just displaying it) to make sure
		// the image is fully loaded.
		large.onload = () => {
			img.classList.remove('imgzoom-loading')

			// Make the new image as large as possible but not larger than the viewport.
			let width         = large.width  * (1 / window.devicePixelRatio),
			    height        = large.height * (1 / window.devicePixelRatio),
			    padding       = 25,
			    window_width  = document.documentElement.clientWidth  - padding,
			    window_height = document.documentElement.clientHeight - padding
			if (width > window_width) {
				height = height / (width / window_width)
				width  = window_width
			}
			if (height > window_height) {
				width  = width / (height / window_height)
				height = window_height
			}

			// The large image isn't going to be much larger than the original.
			if (img.width*min_size >= width-padding/2 && img.height*min_size >= height - padding/2)
				return

			[large.className, large.style.position, large.style.zIndex] = ['imgzoom-large', 'absolute', '5000'];

			// Set the position to the same as the original.
			let offset = get_offset(img)
			set_geometry(large, {
				width:  img.width,
				height: img.height,
				top:    offset.top,
				left:   offset.left,
			})
			document.body.appendChild(large)

			// Animate it to the new size.
			set_geometry(large, {
				width:  width,
				height: height,
				left:   (window_width  - width  + padding) / 2,
				top:    (window_height - height + padding) / 2 +
				            (document.documentElement.scrollTop || document.body.scrollTop),
			})

			let close_key = (e) => {
				if (e.keyCode === 27)
					close()
			}

			let html  = document.getElementsByTagName('html')[0]
			let close = () => {
				html.removeEventListener('click', close)
				html.removeEventListener('click', close_key)

				set_geometry(large, {
					width:  img.width,
					height: img.height,
					top:    offset.top,
					left:   offset.left,
				})

				// Remove the class after a brief timeout, so that the animation
				// appears fairly smooth in case of added padding and such.
				// TODO: Detect position instead of using a timeout?
				setTimeout(() => {
					if (large.parentNode)
						large.parentNode.removeChild(large)
				}, 400)
			}
			html.addEventListener('click', close)
			html.addEventListener('keydown', close_key)
		}
		large.src = src
	}

	let set_geometry = (elem, geom) => {
		if (geom.width != null)
			[elem.style.width, elem.style.maxWidth, elem.style.minWidth] = [`${geom.width}px`, 'unset', 'unset'];
		if (geom.height != null)
			[elem.style.height, elem.style.maxHeight, elem.style.minHeight] = [`${geom.height}px`, 'unset', 'unset'];
		if (geom.left != null)
			elem.style.left = geom.left + 'px'
		if (geom.top != null)
			elem.style.top = geom.top + 'px'
	}

	let get_offset = (elem) => {
		let rect    = elem.getBoundingClientRect(),
		    doc     = elem.ownerDocument,
		    docElem = doc.documentElement,
		    win     = doc.defaultView
		return {
			top:  rect.top  + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		}
	}
}());
