function FontLoader()
{
	this.active = false;

	this.finished = function()
	{
		return this.active;
	};

	this.load = function( callback ) {

		var proxy = this;
		func = function() { proxy.active = true; callback(); };
		conf = {
		  custom: {
			families: ['Alegreya:n4,n9', 'Lato:n4,i4,n9,i9', 'Bevan:n4', 'Arvo:n7'],
			urls: ['css/fonts.css'],
		  },
		  active: func,
		  inactive: func,
		};
		WebFont.load(conf);
	};

}