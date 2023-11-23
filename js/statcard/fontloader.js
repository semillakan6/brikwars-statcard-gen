class FontLoader {
    constructor() {
        this.active = false;
    }
	
    finished() {
        return this.active;
    }

    load(callback) {
        const func = () => {
            this.active = true;
            callback();
        };
        const conf = {
            custom: {
                families: ['Alegreya:n4,n9', 'Lato:n4,i4,n9,i9', 'Bevan:n4', 'Arvo:n7'],
                urls: ['css/fonts.css'],
            },
            active: func,
            inactive: func,
        };
        WebFont.load(conf);
    }
}