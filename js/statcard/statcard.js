class Statcard {
	constructor() {

		this.layout = layouts.classic;

		this.fontLoader = new FontLoader();

		this.attributesArea = new AttributesArea();

		this.backsideArea = new BacksideArea();

		this.specialitiesInfo = null;

		this.titleImage = new TitleImage(document.getElementById('statcard_front'),
			document.getElementById('statcard_title_image'),
			this.layout.titleImageRect);
		this.titleImage.moc = moc;
		this.titleImage.setDefaultPicture = function () {
			if (moc.mind.active) {
				this.image.src = "images/creature.png";
			}

			else {
				this.image.src = "images/vehicle.png";
			}
		};
		this.titleImage.init();

		this.watermarkImage = new TitleImage(document.getElementById('statcard_back'),
			document.getElementById('statcard_watermark_image'),
			this.layout.watermarkImageRect);
		this.watermarkImage.init();

		this.init = function () {
			this.drawBackground();

			var proxy = this;
			this.fontLoader.load(function () { proxy.drawForeground(); });
		};

		this.drawImage = function (ctx, img_src, html_color) {
			var img = new Image();
			var dimensions = this.layout.dimensions;
			var cardname = this.layout.name;
			if (html_color) {
				img.onload = function () {
					var colored_img = colorizeImage(img, parseColor(html_color));
					ctx.drawImage(colored_img, 0, 0);
				};
			}

			else {
				img.onload = function () { ctx.drawImage(img, 0, 0); };
			}
			img.src = "images/" + this.layout.name + "/" + img_src;
		};

		this.drawStaticBackground = function () {
			var ctx = document.getElementById("statcard_watermark_background").getContext("2d");
			ctx.fillStyle = "#fffbf2";
			ctx.fillRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);

			this.drawImage(document.getElementById("statcard_front_background").getContext("2d"), "card_front.png");
			this.drawImage(document.getElementById("statcard_back_background").getContext("2d"), "card_back.png");
		};

		this.drawStaticForeground = function () {
			this.drawImage(document.getElementById("statcard_front_frame").getContext("2d"), "frame.png");
			this.drawImage(document.getElementById("statcard_back_frame").getContext("2d"), "frame.png");
		};

		this.drawColoredArea1 = function () {
			var fctx = document.getElementById("statcard_front_color_area1").getContext("2d");
			var bctx = document.getElementById("statcard_back_color_area1").getContext("2d");

			fctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);
			bctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);
			this.drawImage(fctx, "card_color1_front.png", moc.color1);
			this.drawImage(bctx, "card_color1_back.png", moc.color1);
		};

		this.drawColoredArea2 = function () {
			var ctx = document.getElementById("statcard_front_color_area2").getContext("2d");

			ctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);
			this.drawImage(document.getElementById("statcard_front_color_area2").getContext("2d"), "card_color2_front.png", moc.color2);
		};

		this.drawColoredArea3 = function () {
			var fctx = document.getElementById("statcard_front_color_area3").getContext("2d");
			var bctx = document.getElementById("statcard_back_color_area3").getContext("2d");

			fctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);
			bctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);
			this.drawImage(document.getElementById("statcard_front_color_area3").getContext("2d"), "brick_front_new.png", moc.color3);
			this.drawImage(document.getElementById("statcard_back_color_area3").getContext("2d"), "", moc.color3);
		};

		this.drawBackground = function () {
			this.titleImage.draw();
			this.watermarkImage.draw();
			this.drawStaticBackground();
			this.drawStaticForeground();
			this.drawColoredArea1();
			this.drawColoredArea2();
			this.drawColoredArea3();
		};

		this.drawWhiteTitleText = function (ctx, text, size, x, y, maxwdt, font) {
			ctx.font = "bold " + size + "pt " + font;
			ctx.fillStyle = "white";
			ctx.textBaseline = "top";
			ctx.shadowColor = "black";
			ctx.shadowBlur = 5;
			ctx.fillText(text, x, y, maxwdt);
			ctx.shadowBlur = 0;
			ctx.strokeStyle = "rgba(0,0,0,0.5)";
			ctx.lineWidth = size / 30;
			ctx.strokeText(text, x, y, maxwdt);
		};


		this.drawForegroundFront = function () {
			var ctx = document.getElementById("statcard_front_foreground").getContext("2d");
			ctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);

			var p = this.layout.front;

			// Title
			ctx.textAlign = "left";
			this.drawWhiteTitleText(ctx, moc.name, p.title.size, p.title.x, p.title.y, p.title.wdt, this.layout.serif);

			// Cost
			ctx.textAlign = "center";
			this.drawWhiteTitleText(ctx, moc.cost + 'ü', p.cost.size, p.cost.x, p.cost.y, p.cost.wdt, this.layout.serif);

			// Cost Title
			ctx.textAlign = "center";
			this.drawWhiteTitleText(ctx, "", p.costTitle.size, p.costTitle.x, p.costTitle.y, p.costTitle.wdt, this.layout.sansSerif);

			// Main Attributes:
			this.attributesArea.draw(ctx);

			// Specialities
			this.drawSpecialities(ctx);
		};

		this.drawForegroundBack = function () {
			var ctx = document.getElementById("statcard_back_foreground").getContext("2d");
			ctx.clearRect(0, 0, this.layout.dimensions.wdt, this.layout.dimensions.hgt);

			var p = this.layout.back;

			// Cost (backside)
			ctx.textAlign = "center";
			this.drawWhiteTitleText(ctx, moc.cost, p.cost.size, '', p.cost.y, p.cost.wdt, this.layout.serif);

			// Title (backside)
			ctx.shadowBlur = 0;
			ctx.font = "bold " + p.title.size + "pt " + this.layout.sansSerif;
			ctx.textBaseline = "bottom";
			ctx.textAlign = "left";
			ctx.fillStyle = "black";
			ctx.shadowBlur = 0;
			ctx.fillText(moc.name, p.title.x, p.title.y, p.title.wdt);

			// other side
			this.backsideArea.draw(ctx);
		};

		this.drawForeground = function () {
			if (!this.fontLoader.finished()) return;

			this.specialitiesInfo = this.buildSpecialitiesInfo();

			this.drawForegroundFront();
			this.drawForegroundBack();
		};

		this.buildSpecialitiesInfo = function () {
			var result = [];

			for (var i = 0; i < moc.specialities.stuff.length; ++i) {
				var speciality = moc.specialities.stuff[i];
				if (!speciality) continue;

				var sp = {};
				sp.title = sp.name = speciality.name;
				sp.description = speciality.description;

				result.push(sp);
			}

			// the most important speciality is to note supernaturality
			if (moc.superNatural.active) {
				var superNaturalDice = moc.superNatural.getDieTypes();
				if (superNaturalDice.length > 0) {
					var sn = {};
					sn.title = sn.name = "SuperNatural";

					if (superNaturalDice.length == 1) {
						var die = superNaturalDice[0];
						sn.title += " (" + die.amount + die.die() + " " + die.name() + ")";
					}

					else {
						sn.title += " (" + moc.superNatural.getDiceCount() + " dice)";
					}

					sn.description =
						"Allows this unit to roll ";

					for (var i = 0; i < superNaturalDice.length; ++i) {
						var die = superNaturalDice[i];
						var comma = i == 0 ? "" : (i + 1 == superNaturalDice.length ? " and " : ", ");
						sn.description += comma + die.amount + die.die() + " " + die.name();
					}
					sn.description += " to produce SuperNatural effects appropriate to it's Cliché each turn.";

					result.push(sn);
				}
			}

			if (moc.mind.active) {
				// extra action is also quite important
				if (moc.mind.extraMinds > 0) {
					var mt = { title: "", };

					mt.name = "Extra Mind";

					if (moc.mind.extraMinds > 1) {
						mt.name += "s";
						mt.title += moc.mind.extraMinds + "x ";
					}
					mt.title += "Extra Mind";

					mt.description =
						"This unit can take a total of " + moc.mind.extraMinds +
						" extra Action(s) against any target per turn. The same" +
						" weapon, hand, or equipment item still cannot be used" +
						" for more than one Action in one turn.";

					result.push(mt);
				}

				if (moc.mind.isHalfMind) {
					var hm = {};

					hm.name = halfmind_types[moc.mind.halfmindTypeId].name;
					hm.description = halfmind_types[moc.mind.halfmindTypeId].help;

					if (halfmind_types[moc.mind.halfmindTypeId].isProgram)
						if (moc.mind.program && moc.mind.program.length > 0) {
							hm.ttDescription = moc.mind.program;
							hm.description = "";
						}


					result.push(hm);
				}

				if (mind_types[moc.mind.mindTypeId].isIncompetent) {
					var ic = {};

					ic.name = mind_types[moc.mind.mindTypeId].name;
					ic.description = "Stupid. If the player controls more than one stupid unit, then at the beginning of their turn, one Enemy of the player's choice may choose any one of the stupid units and control it as if it were his own for that turn.";

					result.push(ic);
				}
			}

			return result;
		};

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

function parseHexChar(hexchar) {
	var num = parseInt(hexchar);
	if (isNaN(num)) {
		switch (hexchar) {
			case "a": num = 10; break;
			case "b": num = 11; break;
			case "c": num = 12; break;
			case "d": num = 13; break;
			case "e": num = 14; break;
			case "f": num = 15; break;
			default: return NaN;
		}
	}
	return num;
}

function parseColor(color) {
	color = color.substr(1);
	color = color.toLowerCase();
	color = color.substr(0, 6);

	var rgb = 0;
	for (var i = 0; i < color.length; i++) {
		var num = parseHexChar(color[i]);
		rgb += num << ((color.length - 1 - i) * 4);
	}

	var b = rgb & 255;
	var g = (rgb >> 8) & 255;
	var r = (rgb >> 16) & 255;

	return { r: r, g: g, b: b };
}

function rgb2hsl(color) {
	var r = color.r / 255;
	var g = color.g / 255;
	var b = color.b / 255;

	var maxColor = Math.max(r, g, b);
	var minColor = Math.min(r, g, b);

	var chroma = maxColor - minColor;
	var l = (maxColor + minColor) / 2;
	var s = 0, h = 0;
	if (chroma != 0) {
		if (maxColor == r) {
			// because in javascript -8 mod 6 is -2 and not 4 which would be arithmetically correct
			x = (g - b) / chroma;
			while (x < 0) x += 6;
			h = x % 6;
		}
		else if (maxColor == g) h = ((b - r) / chroma) + 2;
		else if (maxColor == b) h = ((r - g) / chroma) + 4;
		h *= 60;

		s = chroma / (1 - Math.abs(2 * l - 1));
	}

	return { h: h, s: s, l: l };
}

function hsl2rgb(color) {
	var h = color.h;
	var s = color.s;
	var l = color.l;

	var c = (1 - Math.abs(2 * l - 1)) * s;
	h /= 60;
	var x = c * (1 - Math.abs(h % 2 - 1));

	var r = 0, g = 0, b = 0;
	if (h < 1) { r = c, g = x, b = 0; }
	else if (h < 2) { r = x, g = c, b = 0; }
	else if (h < 3) { r = 0, g = c, b = x; }
	else if (h < 4) { r = 0, g = x, b = c; }
	else if (h < 5) { r = x, g = 0, b = c; }
	else if (h < 6) { r = c, g = 0, b = x; }

	var m = l - c / 2;
	r += m;
	g += m;
	b += m;

	return { r: r * 255, g: g * 255, b: b * 255 }
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