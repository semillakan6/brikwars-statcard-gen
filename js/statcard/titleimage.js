function TitleImage(dragEle, drawEle, coords)
{
	this.coords = coords;

	this.picture = null; // user picture
	this.image = null; // picture that is drawn
	this.imageZoom = 0;
	this.imageOffsetX = 0;
	this.imageOffsetY = 0;

	this.grabbed = false;
	this.grabStartX = 0;
	this.grabStartY = 0;
	this.imageOffsetStartX = 0;
	this.imageOffsetStartY = 0;
		
	this.init = function( )
	{
		var proxy = this;

		dragEle.addEventListener('dragover',  function(evt) { proxy.handleDragOverImage(evt); }, false);
		dragEle.addEventListener('drop',      function(evt) { proxy.handleDropImage(evt); }, false);
		dragEle.addEventListener('wheel',     function(evt) { proxy.handleZoomWheel(evt); }, false);
		dragEle.addEventListener('mousedown', function(evt) { proxy.handleStartGrabImage(evt); }, false);
		dragEle.addEventListener('mousemove', function(evt) { proxy.handleGrabMoveImage(evt); }, false);
		dragEle.addEventListener('mouseup',   function(evt) { proxy.handleStopGrabImage(evt); }, false);
		dragEle.addEventListener('mouseout',  function(evt) { proxy.handleStopGrabImage(evt); }, false);
		
		this.image = new Image();
		this.image.onload = function() { proxy.draw(); };
		this.setDefaultPicture();
	};
	
	this.handleZoomWheel = function(evt)
	{
		evt.stopPropagation();
		evt.preventDefault();
		this.imageZoom -= evt.deltaY / Math.abs(evt.deltaY) / 20.0 ;
		this.draw();
	};
	
	this.handleStartGrabImage = function(evt)
	{
		this.grabbed = true;
		this.grabStartX = evt.clientX;
		this.grabStartY = evt.clientY;
		this.imageOffsetStartX = this.imageOffsetX;
		this.imageOffsetStartY = this.imageOffsetY;
		
		dragEle.style.cursor = "grab";
	};

	this.handleGrabMoveImage = function(evt)
	{
		if(!this.grabbed) return;

		this.imageOffsetX = this.imageOffsetStartX - (evt.clientX - this.grabStartX);
		this.imageOffsetY = this.imageOffsetStartY - (evt.clientY - this.grabStartY);
		
		this.draw();
	};

	this.handleStopGrabImage = function(evt)
	{
		this.grabbed = false;
		dragEle.style.cursor = "inherit";
	};

	this.handleDropImage = function(evt)
	{
		evt.stopPropagation();
		evt.preventDefault();

		this.changeImage(evt.dataTransfer.files[0]);
	};

	this.handleDragOverImage = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	};
		
	this.handleImageChange = function(fileItem)
	{
		return this.changeImage(fileItem.file);
	};

	this.changeImage = function(f)
	{
		if (!f.type.match('image.*')) return;

		// reset zoom and offsets
		this.resetZoomAndOffset();
		
		var reader = new FileReader();

		reader.onload = (function(proxy)
		{
			return function(e)
			{
				proxy.picture = proxy.image.src = e.target.result;
			};
		})(this);

		reader.readAsDataURL(f);
	};
	
	this.resetZoomAndOffset = function()
	{
		this.imageOffsetX = 0;
		this.imageOffsetY = 0;
		this.imageZoom = 0;
	};
	
	this.setDefaultPicture = function () {};
	
	this.updateDefaultPicture = function( )
	{
		if(!this.picture)
		{
			this.setDefaultPicture();
		}
	};
	
	this.isImageLoaded = function()
	{
		return this.image.complete && !(typeof this.image.naturalWidth != "undefined" && this.image.naturalWidth == 0);
	};
	
	this.draw = function( )
	{
		if(!this.isImageLoaded()) return;
		
		var ctx = drawEle.getContext("2d");
		
		// aspect ratios
		var aspectImage = this.image.width / this.image.height;
		var aspectCanvas = this.coords.wdt / this.coords.hgt;
		var zoomLimit;
		// image is more landscape-ish than the canvas
		// -> fit image height to canvas height 
		if(aspectImage > aspectCanvas)
		{
			zoomLimit = this.coords.hgt / this.image.height;
		}
		// image is more portray-ish than the canvas
		// -> fit image width to canvas width 
		else
		{
			zoomLimit = this.coords.wdt / this.image.width;
		}
		
		// limit zoom (dynamic to this.image size)
		this.imageZoom = Math.max(Math.min( this.image.width / this.coords.wdt, this.imageZoom), zoomLimit);
		
		var xDiff = (this.image.width - this.coords.wdt / this.imageZoom)/2; 
		var yDiff = (this.image.height - this.coords.hgt / this.imageZoom)/2;
		
		// limit x and y offset, image zoom before drawing
		this.imageOffsetX = Math.max(Math.min( xDiff, this.imageOffsetX ), -xDiff);
		this.imageOffsetY = Math.max(Math.min( yDiff, this.imageOffsetY ), -yDiff);
		
		var x = xDiff + this.imageOffsetX;
		var y = yDiff + this.imageOffsetY;
		var w = Math.min(this.coords.wdt / this.imageZoom, this.image.width);
		var h = Math.min(this.coords.hgt / this.imageZoom, this.image.height);

		ctx.clearRect(this.coords.x,this.coords.y,this.coords.wdt,this.coords.hgt);
		ctx.drawImage(this.image,x,y,w,h,this.coords.x,this.coords.y,this.coords.wdt,this.coords.hgt);
	};
	
	this.changeLayout = function(coords)
	{
		this.coords = coords;
		this.resetZoomAndOffset();
	};
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};