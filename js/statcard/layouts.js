var layouts =
{
	classic:
	{
		name: 'classic',
		help: 'As seen in the 2005<a target="_blank" class="ref btn-sm btn-link px-1" href="http://brikwars.com/supplement"/>supplements page</a>',
		
		serif: "Arvo",
		sansSerif: "Lato",
		monospace: "monospace",
		
		dimensions: {wdt: 600, hgt:650 },
		dpi: 200,
		border: 23,
		titleImageRect: { x:42, y:94, wdt:412, hgt:412 },
		watermarkImageRect: { x:48, y:48, wdt:500, hgt:550 },
		
		front:
		{
			title: { x:56, y:43, wdt: 400, size: 34 },
			cost: { x:510, y:64, wdt:70, size: 20 },
			costTitle: { x:510, y:50, wdt:70, size: 11 },
			
			specialities:
			{
				title: { x:58, y:512, size: 13 },
				text: { x: 71, y: 535, spacing: 30, size: 18, wdt1: 295, wdt2: 160, max: 2 },
				more: { x: 370, y: 595, wdt: 115, size: 16 },
			},
			
			attributes:
			{
				x:475, y:114, wdt:120, hgt: 124,
				title: { y: 20, size: 20, color: "#84634b"},
				value: { y: 65, size: 40, color: "black"},
				subtext: { y: 98, size: 20, spacing: 24, color: "black"},
			},
		},
		back:
		{
			x: 65, y: 115, wdt: 465,
			spacing: 20,
			headingSpacing: 25,
			paragraphSpacing: 30,
			size: 13,
			titleSize: 17,
			flavorSize: 12,
			monospaceSize: 12,
			
			title: { x: 65, y: 98, wdt:400, size: 26 },
			cost: { x: 506, y: 72, wdt: 40, size: 18 },
			
			weaponsTable:
			{
				wdtName: 160,
				wdtUse: 35,
				wdtRange: 55,
				wdtDamage: 152,
				colSpacing: 20,
				rowHeight: 25,
			},
			attributesTable:
			{
				wdtDamage: 60,
				wdtSize: 60,
				wdtArmor: 60,
				wdtThrust: 50,
				wdtMove: 40,
				wdtFly: 25,
				wdtPower: 60,
				colSpacing: 20,
				rowHeight: 25,
			},
		},
	},
	poker:
	{
		name: 'poker',
		help: '<a target="_blank" class="ref btn-sm p-1 btn-link" href="http://www.portablespacemuseum.com/brikwars/resources/">Statcard template</a> from portablespacemuseum.com, suitable for professional print',
		
		serif: "Arvo",
		sansSerif: "Lato",
		monospace: "monospace",
		
		dimensions: {wdt: 825, hgt:1125 },
		dpi: 300,
		border: 40,
		titleImageRect: { x:75, y:140, wdt:520, hgt:700 },
		watermarkImageRect: { x:82, y:78, wdt:665, hgt:966 },
		
		front:
		{
			title: { x:84, y:70, wdt: 500, size: 50 },
			cost: { x:668, y:115, wdt:105, size: 36 },
			costTitle: { x:668, y:95, wdt:105, size: 16 },
			
			specialities:
			{
				title: { x:96, y: 840, size: 18 },
				text: { x: 116, y: 875, spacing: 54, size: 34, wdt1: 600, wdt2: 420, max: 3 },
				more: { x: 730, y: 1030, wdt: 200, size: 26 },
			},
			
			attributes:
			{
				x:665, y:188, wdt:130, hgt: 151,
				title: { y: 23, size: 26, color: "#84634b"},
				value: { y: 79, size: 40, color: "black"},
				subtext: { y: 115, size: 26, spacing: 30, color: "black"},
			},
		},
		back:
		{
			x: 100, y: 190, wdt: 620,
			spacing: 27.5,
			headingSpacing: 34.5,
			paragraphSpacing: 44,
			size: 19,
			titleSize: 25,
			flavorSize: 17,
			monospaceSize: 17,
			
			title: { x: 100, y: 148, wdt:520, size: 40 },
			cost: { x: 685, y: 108, wdt: 60, size: 28 },
			
			weaponsTable:
			{
				wdtName: 230,
				wdtUse: 35,
				wdtRange: 70,
				wdtDamage: 214,
				colSpacing: 20,
				rowHeight: 34.5,
			},
			attributesTable:
			{
				wdtDamage: 85,
				wdtSize: 85,
				wdtArmor: 75,
				wdtThrust: 75,
				wdtMove: 55,
				wdtFly: 35,
				wdtPower: 65,
				colSpacing: 20,
				rowHeight: 34.5,
			},
		},
	},
};