class Statcard {
	constructor() {

		this.layout = layouts.classic;

		this.fontLoader = new FontLoader();

		this.attributesArea = new AttributesArea();

		this.backsideArea = new BacksideArea();

		this.specialitiesInfo = null;

		const createTitleImage = (elementId1, elementId2, layoutRect, imageUrl1, imageUrl2, moc = null) => {
			let titleImage = new TitleImage(document.getElementById(elementId1),
				document.getElementById(elementId2),
				layoutRect);
			if (moc) {
				titleImage.moc = moc;
				titleImage.setDefaultPicture = function () {
					this.image.src = moc.mind.active ? imageUrl1 : imageUrl2;
				};
			}
			titleImage.init();
			return titleImage;
		}

		this.titleImage = createTitleImage(
			'statcard_front',
			'statcard_title_image',
			this.layout.titleImageRect,
			"images/creature.png",
			"images/vehicle.png",
			moc
		);

		this.watermarkImage = createTitleImage(
			'statcard_back',
			'statcard_watermark_image',
			this.layout.watermarkImageRect
		);

		this.init = function () {
			this.drawBackground();
			this.fontLoader.load(() => this.drawForeground());
		};

		const createContext = (id) => document.getElementById(id)?.getContext("2d");

		this.drawImage = (ctx, imgSrc, htmlColor) => {
			const img = new Image();

			const drawImageCallback = htmlColor
				? () => ctx.drawImage(colorizeImage(img, parseColor(htmlColor)), 0, 0)
				: () => ctx.drawImage(img, 0, 0);

			img.onload = drawImageCallback;
			img.src = `images/${this.layout?.name}/${imgSrc}`;
		};

		this.drawStaticBackground = () => {
			const ctx = createContext("statcard_watermark_background");
			ctx.fillStyle = "#fffbf2";
			ctx.fillRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);

			this.drawImage(createContext("statcard_front_background"), "card_front.png");
			this.drawImage(createContext("statcard_back_background"), "card_back.png");
		};

		this.drawStaticForeground = () => {
			this.drawImage(createContext("statcard_front_frame"), "frame.png");
			this.drawImage(createContext("statcard_back_frame"), "frame.png");
		};

		this.drawColoredArea1 = () => {
			const clearAndDrawImage = (id, imageFile, color) => {
				const ctx = createContext(id);
				ctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);
				this.drawImage(ctx, imageFile, color);
			};

			clearAndDrawImage("statcard_front_color_area1", "card_color1_front.png", moc.color1);
			clearAndDrawImage("statcard_back_color_area1", "card_color1_back.png", moc.color1);
		};

		const clearCanvas = (ctx, layout) => ctx.clearRect(0, 0, layout.dimensions.wdt, layout.dimensions.hgt);

		const drawTitleText = (ctx, { size, font, text, x, y, maxWdt }) => {
			ctx.font = `bold ${size}pt ${font}`;
			ctx.fillStyle = 'white';
			ctx.textBaseline = 'top';
			ctx.shadowColor = 'black';
			ctx.shadowBlur = 5;
			ctx.lineWidth = size / 30;
			ctx.fillText(text, x, y, maxWdt);
			ctx.shadowBlur = 0;
			ctx.strokeStyle = 'rgba(0,0,0,0.5)';
			ctx.strokeText(text, x, y, maxWdt);
		};

		this.drawColoredArea2 = () => {
			const ctx = createContext("statcard_front_color_area2");
			clearCanvas(ctx, this.layout);
			this.drawImage(ctx, "card_color2_front.png", moc.color2);
		};

		this.drawColoredArea3 = () => {
			const clearAndDrawImage = (canvasId, imageName, color) => {
				const ctx = createContext(canvasId);
				clearCanvas(ctx, this.layout);
				this.drawImage(ctx, imageName, color);
			};

			clearAndDrawImage("statcard_front_color_area3", "brick_front_new.png", moc.color3);
			clearAndDrawImage("statcard_back_color_area3", "", moc.color3);
		};

		this.drawBackground = () => {
			this.titleImage.draw();
			this.watermarkImage.draw();
			this.drawStaticBackground();
			this.drawStaticForeground();
			this.drawColoredArea1();
			this.drawColoredArea2();
			this.drawColoredArea3();
		};

		this.drawWhiteTitleText = (ctx, text, size, x, y, maxWdt, font) =>
			drawTitleText(ctx, { size, font, text, x, y, maxWdt });

		const clearCanvasAndReturnCtx = (id) => {
			const ctx = createContext(id);
			clearCanvas(ctx, this.layout);
			return ctx;
		};

		const drawTextProperties = (ctx, align, titleText, size, x, y, wdt, font) => {
			ctx.textAlign = align;
			this.drawWhiteTitleText(ctx, titleText, size, x, y, wdt, font);
		}

		this.drawForegroundFront = () => {
			const ctx = clearCanvasAndReturnCtx("statcard_front_foreground");
			const p = this.layout.front;

			drawTextProperties(ctx, "left", moc.name, p.title.size, p.title.x, p.title.y, p.title.wdt, this.layout.serif);
			drawTextProperties(ctx, "center", moc.cost + 'ü', p.cost.size, p.cost.x, p.cost.y, p.cost.wdt, this.layout.serif);
			drawTextProperties(ctx, "center", "", p.costTitle.size, p.costTitle.x, p.costTitle.y, p.costTitle.wdt, this.layout.sansSerif);

			this.attributesArea.draw(ctx);
			this.drawSpecialities(ctx);
		};

		this.drawForegroundBack = () => {
			const ctx = clearCanvasAndReturnCtx("statcard_back_foreground");
			const p = this.layout.back;

			drawTextProperties(ctx, "center", moc.cost, p.cost.size, '', p.cost.y, p.cost.wdt, this.layout.serif);

			ctx.shadowBlur = 0;
			ctx.font = `bold ${p.title.size}pt ${this.layout.sansSerif}`;
			ctx.textBaseline = "bottom";
			ctx.textAlign = "left";
			ctx.fillStyle = "black";
			ctx.fillText(moc.name, p.title.x, p.title.y, p.title.wdt);

			this.backsideArea.draw(ctx);
		};

		this.drawForeground = () => {
			if (!this.fontLoader.finished()) return;

			this.specialitiesInfo = this.buildSpecialitiesInfo();

			this.drawForegroundFront();
			this.drawForegroundBack();
		};

		this.buildSpecialitiesInfo = function () {
			const specialitiesInfo = moc.specialities.stuff
				.filter(item => item)
				.map(item => ({ title: item.name, name: item.name, description: item.description }));
			  
			if (moc.superNatural.active) {
				const superNaturalDice = moc.superNatural.getDieTypes();
				
				if (superNaturalDice.length > 0) {
					const titleExtension = superNaturalDice.length == 1 
						? ` (${superNaturalDice[0].amount}${superNaturalDice[0].die()} ${superNaturalDice[0].name()})` 
						: ` (${moc.superNatural.getDiceCount()} dice)`;
		
					const description = formatSuperNaturalDiceDescription(superNaturalDice);
		
					const superNaturalSpeciality = {
						title: `SuperNatural${titleExtension}`,
						name: 'SuperNatural',
						description
					};
		
					specialitiesInfo.push(superNaturalSpeciality);
				}
			}
		
			if (moc.mind.active) {
				if (moc.mind.extraMinds > 0) {
					const extraMindsSpeciality = buildExtraMindsSpeciality(moc.mind.extraMinds);
					specialitiesInfo.push(extraMindsSpeciality);
				}
		
				if (moc.mind.isHalfMind) {
					const halfmindSpeciality = buildHalfmindSpeciality(moc.mind);
					specialitiesInfo.push(halfmindSpeciality);
				}
		
				if (mind_types[moc.mind.mindTypeId].isIncompetent) {
					const incompetentSpeciality = buildIncompetentSpeciality(moc.mind);
					specialitiesInfo.push(incompetentSpeciality);
				}
			}
		
			return specialitiesInfo;
		};
		
		function formatSuperNaturalDiceDescription(superNaturalDice) {
			const description = superNaturalDice.reduce((acc, die, i, arr) => {
				const comma = i == 0 ? "" : (i + 1 == arr.length ? " and " : ", ");
				return acc += `${comma}${die.amount}${die.die()} ${die.name()}`;
			}, "Allows this unit to roll ");
		
			return description + " to produce SuperNatural effects appropriate to its Cliché each turn.";
		}

		this.drawSpecialities = function (ctx) {
			var p = this.layout.front.specialities;

			ctx.textBaseline = "top";
			ctx.fillStyle = "#84634b";
			ctx.textAlign = "left";
			ctx.shadowBlur = 0;

			ctx.font = p.title.size + "pt " + this.layout.serif;
			ctx.fillText("SPECIALITIES", p.title.x, p.title.y);

			ctx.fillStyle = "black";
			ctx.font = p.text.size + "pt " + this.layout.serif;

			var specialities = this.specialitiesInfo;

			// only first two fit...
			var specialCount = 0;
			for (var i = 0; i < specialities.length; ++i) {
				if (!specialities[i].title) continue;

				if (specialCount < p.text.max) {
					var spaceReserved = specialCount == (p.text.max - 1) && specialities.length > p.text.max;
					var maxWidth = spaceReserved ? p.text.wdt2 : p.text.wdt1;
					ctx.fillText(specialities[i].title, p.text.x, p.text.y + specialCount * p.text.spacing, maxWidth);
				}

				specialCount++;
			}

			if (specialities.length > p.text.max) {
				ctx.font = p.more.size + "pt " + this.layout.serif;
				ctx.textBaseline = "bottom";
				ctx.textAlign = "right";
				ctx.fillText("...and more", p.more.x, p.more.y, p.more.wdt);
			}
		};

		this.createFoldableImage = function () {
			var front = this.createFrontImage();
			var back = this.createBackImage();

			var canvas = document.createElement("canvas");
			var spacing = this.layout.border;
			var wdt = this.layout.dimensions.wdt;
			var hgt = this.layout.dimensions.hgt;
			var short_wdt = wdt - spacing;
			canvas.width = (short_wdt) * 2;
			canvas.height = hgt;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(front, 0, 0, short_wdt, hgt, 0, 0, short_wdt, hgt);
			ctx.drawImage(back, spacing, 0, short_wdt, hgt, short_wdt, 0, short_wdt, hgt);

			var oddfix = (this.layout == layouts.classic) ? -6 : 0; // O_o

			ctx.drawImage(document.getElementById('statcard_front_frame'), 0, 0, short_wdt, hgt, 0, 0, short_wdt, hgt);
			ctx.drawImage(document.getElementById('statcard_back_frame'), spacing, 0, short_wdt, hgt, short_wdt, 0, short_wdt + oddfix, hgt);


			return canvas;
		};

		this.createFrontImage = function () {
			var canvas = document.createElement("canvas");
			canvas.width = this.layout.dimensions.wdt;
			canvas.height = this.layout.dimensions.hgt;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(document.getElementById('statcard_title_image'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_front_background'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_front_color_area1'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_front_color_area2'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_front_color_area3'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_front_foreground'), 0, 0);

			return canvas;
		};

		this.createBackImage = function () {
			var canvas = document.createElement("canvas");
			canvas.width = this.layout.dimensions.wdt;
			canvas.height = this.layout.dimensions.hgt;

			var ctx = canvas.getContext("2d");

			ctx.drawImage(document.getElementById('statcard_watermark_background'), 0, 0);

			var watermark = document.getElementById('statcard_watermark_image');
			ctx.globalAlpha = watermark.style.opacity;
			ctx.drawImage(watermark, 0, 0);
			ctx.globalAlpha = 1.0;

			ctx.drawImage(document.getElementById('statcard_back_background'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_back_color_area1'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_back_color_area3'), 0, 0);
			ctx.drawImage(document.getElementById('statcard_back_foreground'), 0, 0);

			return canvas;
		};

		this.updateHelp = function (form) {
			var selection = form.statcard_format.options[form.statcard_format.selectedIndex].value;
			document.getElementById("statcard_format_help").innerHTML = layouts[selection].help;
		};

		this.changeLayout = function (layout) {
			this.layout = layout;
			this.titleImage.changeLayout(this.layout.titleImageRect);
			this.watermarkImage.changeLayout(this.layout.watermarkImageRect);
			this.drawBackground();
			this.drawForeground();
		};

	}
}

function parseHexChar(hexChar) {
	return parseInt(hexChar, 16);
}

function parseColor(color) {
	const hexChars = color.substr(1).toLowerCase().split('');

	let rgb = 0;
	for (let i = 0; i < hexChars.length; i++) {
		const num = parseHexChar(hexChars[i]);
		rgb += num << ((hexChars.length - 1 - i) * 4);
	}

	const b = rgb & 255;
	const g = (rgb >> 8) & 255;
	const r = (rgb >> 16) & 255;

	return { r: r, g: g, b: b };
}

function rgb2hsl({ r, g, b }) {
	r /= 255;
	g /= 255;
	b /= 255;

	const maxColor = Math.max(r, g, b);
	const minColor = Math.min(r, g, b);

	let chroma = maxColor - minColor;
	let l = (maxColor + minColor) / 2;
	let s = 0, h = 0;
	if (chroma !== 0) {
		if (maxColor === r) {
			h = ((g - b) / chroma + 6) % 6;
		} else if (maxColor === g) {
			h = (b - r) / chroma + 2;
		} else {
			h = (r - g) / chroma + 4;
		}

		h *= 60;
		s = chroma / (1 - Math.abs(2 * l - 1));
	}

	return { h, s, l };
}

function hsl2rgb({ h, s, l }) {
	let c = (1 - Math.abs(2 * l - 1)) * s;
	h /= 60;
	let x = c * (1 - Math.abs(h % 2 - 1));

	let [r, g, b] = h < 1 ? [c, x, 0] :
		h < 2 ? [x, c, 0] :
			h < 3 ? [0, c, x] :
				h < 4 ? [0, x, c] :
					h < 5 ? [x, 0, c] : [c, 0, x];

	let m = l - c / 2;
	r += m;
	g += m;
	b += m;

	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

function colorizeImage(img, color) {
	var w = img.width;
	var h = img.height;

	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);

	var to = ctx.getImageData(0, 0, w, h);
	var hsl = rgb2hsl(color);

	for (var i = 0; i < to.data.length; i += 4) {
		pix_color = { r: to.data[i], g: to.data[i + 1], b: to.data[i + 2] };
		pix_hsl = rgb2hsl(pix_color);

		pix_hsl.h = hsl.h;
		pix_hsl.s = hsl.s;
		pix_hsl.l = Math.max(0, Math.min(1, pix_hsl.l + (hsl.l - 0.5)));

		pix_color = hsl2rgb(pix_hsl);

		to.data[i] = pix_color.r;
		to.data[i + 1] = pix_color.g;
		to.data[i + 2] = pix_color.b;
		to.data[i + 3] = to.data[i + 3];
	}

	ctx.putImageData(to, 0, 0);
	return canvas;
};