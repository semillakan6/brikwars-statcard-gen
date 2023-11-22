function BacksideArea()
{
	this.title_font = function() { return "italic bold "+statcard.layout.back.titleSize+"pt "+statcard.layout.sansSerif; }
	this.font = function() { return statcard.layout.back.size+"pt "+statcard.layout.sansSerif; }
	this.flavor_font = function() { return "italic normal "+statcard.layout.back.flavorSize+"pt "+statcard.layout.sansSerif; }
	this.monospace_font = function() { return "bold "+statcard.layout.back.monospaceSize+"pt "+statcard.layout.monospace; }
	this.tablehead_font = function() { return "bold "+statcard.layout.back.size+"pt "+statcard.layout.sansSerif; }
	
	this.drawWrappedText = function(ctx, text, y)
	{
		var p = statcard.layout.back;
		return wrapText(ctx, text, p.x, y, p.wdt, p.spacing);
	};
	
	this.draw = function(ctx)
	{
		var offset = statcard.layout.back.y;
		
		ctx.textAlign = "left";
		ctx.textBaseline= "bottom";
		ctx.fillStyle = "black";
		ctx.shadowBlur = 0;
		
		// basic attributes
		if(!document.forms[0].statcard_damagetable.checked || moc.structure.size < 2)
		{
			offset += this.drawAttributesText(ctx, offset);
		} else {
			offset += this.drawAttributesTable(ctx, offset);
		}
		
		offset += statcard.layout.back.spacing;
		
		// flavor text
		ctx.textAlign = "left";
		ctx.font = this.flavor_font();
		ctx.fillStyle = "#885533";
		offset += this.drawWrappedText(ctx, moc.description, offset);
		
		offset += statcard.layout.back.spacing;
		
		// armament
		offset += this.drawArmamentTable(ctx, offset);
		
		offset += this.drawEquipments(ctx, offset);
		
		// specialities
		offset += this.drawSpecialities(ctx, offset);

	};

	this.drawAttributesTable = function(ctx, ypos)
	{
		var x = statcard.layout.back.x;
		var attr = statcard.layout.back.attributesTable;
		
		var table = new TableDrawer(ctx, x, ypos, attr.colSpacing, attr.rowHeight, statcard.layout.back.wdt);
	
		table.addRow();

		ctx.font = this.tablehead_font();
		
		table.addColumn("Damage", attr.wdtDamage);
		table.addColumn("Eff. Size", attr.wdtSize);
		table.addColumn("Armor", attr.wdtArmor);

		if(moc.groundPropulsion.speed) table.addColumn("Move", attr.wdtMove);
		if(moc.flyingPropulsion.speed) table.addColumn("Fly", attr.wdtFly);
		if(moc.thrustPropulsion.speed) table.addColumn("Thrust", attr.wdtThrust);
		
		table.addColumn("Power", attr.wdtPower);
		
		for(var i=0; i <= moc.structure.size; ++i)
		{
			table.addRow();
			
			ctx.font = this.tablehead_font();
			
			table.addColumn(i,attr.wdtDamage);
			
			if(i < moc.structure.size)
			{
				ctx.font = this.font();
				
				var effSizeText = moc.structure.size - i;
				table.addColumn(effSizeText,attr.wdtSize);
				
				var arText = moc.structure.getArmorRating(Math.min(moc.structure.structureLevel, moc.structure.size - i));
				
				var armorDiff = moc.structure.strictireLevel - (moc.structure.size - i);
				var armorRed = armorDiff > 0 ? 128+armorDiff*32 : 0;
				table.addColumn(arText, attr.wdtArmor, armorRed);
				
				if(moc.groundPropulsion.speed)
				{
					var moveText = Math.max(1,moc.groundPropulsion.speed - i);
					table.addColumn(moveText, attr.wdtMove);
				}
				if(moc.flyingPropulsion.speed)
				{
					var moveText = Math.max(1,moc.flyingPropulsion.speed - i);
					table.addColumn(moveText, attr.wdtFly);
				}
				if(moc.thrustPropulsion.speed)
				{
					var moveText = Math.max(1,moc.thrustPropulsion.speed - i);
					table.addColumn(moveText, attr.wdtThrust);
				}
				
				var power = Math.max(1,moc.structure.size - i);
				if (!moc.flyingPropulsion.active) power *= 2;
				var powerText = power;
				
				var powerDiff = moc.powerUsage - power;
				var powerRed = powerDiff > 0 ? 128+powerDiff*32 : 0;
				table.addColumn(powerText, attr.wdtPower, powerRed);
			}
			else
			{
				ctx.textAlign = "center";
				ctx.font = this.tablehead_font();
				
				var allTheLength =  attr.wdtSize + attr.wdtArmor + attr.wdtPower + attr.colSpacing * 3;
				if(moc.groundPropulsion.speed)
					allTheLength += attr.wdtMove + attr.colSpacing;
				if(moc.flyingPropulsion.speed)
					allTheLength += attr.wdtFly + attr.colSpacing;
				if(moc.thrustPropulsion.speed)
					allTheLength += attr.wdtThrust + attr.colSpacing;

				table.addColumn("destroyed", allTheLength);
			}
		}
		return table.y - ypos + attr.rowHeight;
	}	

	this.drawAttributesText = function(ctx, offset)
	{
		ctx.font = this.font();
		ctx.fillStyle = "black";
		
		var basicAttr = "Size: " + moc.structure.size + ", " + "Armor: " + moc.structure.getArmorRating();

		var speedText;
		var ground = moc.groundPropulsion.speed;
		var fly = moc.flyingPropulsion.speed;
		var thrust = moc.thrustPropulsion.speed;
		
		// only one
		if (!!ground + !!fly + !!thrust == 1)
		{
			if(ground)
			{
				speedText = ground;
			}
			else if(fly)
			{
				speedText = fly + " Flying";
			}
			else
			{
				speedText = thrust + " Thrust";
			}
		}
		// ground + more
		else if (ground && (fly || thrust))
		{
			speedText = ground;
			
			if(fly && thrust)
			{
				speedText += " (Fly: "+fly+", Thrust: "+thrust+")";
			}
			else if(fly)
			{
				speedText += " (Flying: "+fly+")";
			}
			else
			{
				speedText += " (Thrust: "+thrust+")";
			}
		}
		// thrust + flying
		else if (thrust && fly)
		{
			speedText = fly + " Flying (Thrust: "+thrust+")";
		}
		
		if(speedText)
			basicAttr += ", Move: " + speedText;
		
		if (moc.mind.active)
			basicAttr += ", Skill: " + mind_types[moc.mind.mindTypeId].skill;
		
		basicAttr += ", Power: " + moc.power;
		
		ctx.fillText(basicAttr, statcard.layout.back.x, offset, statcard.layout.back.wdt);
		
		return statcard.layout.back.spacing;
	};
	
	this.drawEquipments = function(ctx, ypos)
	{
		var yoffset = 0;
		
		ctx.fillStyle = "black";
		var eqTypes = moc.equipment.getEquipmentByTypes();
		for(var i=0; i < eqTypes.length; ++i)
		{
			ctx.font = this.title_font();
			ctx.fillText(eqTypes[i][0].name(),statcard.layout.back.x,ypos + yoffset, statcard.layout.back.wdt);
			yoffset += statcard.layout.back.headingSpacing;
			
			if(eqTypes[i][0].name() == "Energy Shield")
			{
				var desc = "This unit has ";
				var totalStrength = 0;
				for(var j=0; j < eqTypes[i].length; ++j)
				{
					var eq = eqTypes[i][j];
					var comma = j == 0 ? "" : (j+1 == eqTypes[i].length ? " and " : ", ");
					desc += comma + "a size " + eq.size + " energy shield " + toRoman(eq.strength()); 
					totalStrength += eq.strength();
				}
				desc += ", giving it a total of " + totalStrength + " energy shield dice to spend each turn.";

				ctx.font = this.font();
				yoffset += this.drawWrappedText(ctx, desc, ypos + yoffset);
			}
			if(eqTypes[i][0].name() == "Armor Plating")
			{
				var desc = "The Armor Plated areas are granted the Shielded status.";
				
				ctx.font = this.font();
				yoffset += this.drawWrappedText(ctx, desc, ypos + yoffset);
			}
			yoffset += statcard.layout.back.paragraphSpacing;
		}
		return yoffset;
	}
	
	this.drawSpecialities = function(ctx, ypos)
	{
		var yoffset = 0;
	
		ctx.fillStyle = "black";
		var specialities = statcard.specialitiesInfo;
		for(var i=0; i<specialities.length; ++i)
		{
			var special = specialities[i];
			
			ctx.font = this.title_font();
			ctx.fillText(special.name,statcard.layout.back.x,ypos + yoffset,statcard.layout.back.wdt);
			yoffset += statcard.layout.back.headingSpacing;
			
			if(special.description)
			{
				ctx.font = this.font();
				yoffset += this.drawWrappedText(ctx, special.description, ypos +  yoffset);
			}
			if(special.ttDescription)
			{
				ctx.font = this.monospace_font();
				yoffset += this.drawWrappedText(ctx, "\"" + special.ttDescription + "\"", ypos + yoffset);
			}
			yoffset += statcard.layout.back.paragraphSpacing;
		}
		return yoffset;
	}
	
	this.drawArmamentTable = function(ctx, ypos)
	{
	
		var x = statcard.layout.back.x;
		var attr = statcard.layout.back.weaponsTable;
		
		var table = new TableDrawer(ctx, x, ypos, attr.colSpacing, attr.rowHeight, statcard.layout.back.wdt);
		
		var weaponCounts = moc.armament.getWeaponsWithCounts();
		if(weaponCounts.length == 0)
		{
			return 0;
		}
		
		table.addRow();
		
		ctx.font = this.title_font();
		table.addColumn("Armament", attr.wdtName);
		ctx.font = this.tablehead_font();
		table.addColumn("Use", attr.wdtUse);
		table.addColumn("Range", attr.wdtRange);
		table.addColumn("Damage", attr.wdtDamage);
		
		for(var i=0; i < weaponCounts.length; ++i)
		{
			table.addRow();

			var weapon = weaponCounts[i].weapon;
			var count = weaponCounts[i].count;
			
			var weaponText = "";
			if(count != 1)
				weaponText += count + "x ";
			weaponText += weapon.name();
			if(!weapon.hasFixedSize())
				weaponText += " " + toRoman(weapon.siz()) + "";
				
			ctx.font = this.tablehead_font();
			table.addColumn(weaponText, attr.wdtName);
			
			ctx.font = this.font();
			
			table.addColumn(weapon.use(), attr.wdtUse);
			table.addColumn(weapon.range(), attr.wdtRange);
			table.addColumn(weapon.damage(), attr.wdtDamage);
		}
		return table.y - ypos + attr.rowHeight + statcard.layout.back.paragraphSpacing;
	}
}

function toRoman(val)
{	
	if(val <= 0 || val >= 4000) return;

	var result = "";
	var roman = [ "M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
	var decimal = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
	
	for( var i=0; i<roman.length; ++i)
	{
		while(val >= decimal[i])
		{
			val -= decimal[i];
			result += roman[i];
		}
	}
	
	return result;
}

function wrapText(context, text, x, y, maxWidth, lineHeight)
{
	if(!text || text.length == 0) return 0;

	var lines = text.split('\n');
	var offset = 0;
	
	for(var i=0; i<lines.length; ++i)
	{
		var lineText = lines[i];
	
		var words = lineText.split(' ');
		var line = '';

		for(var n = 0; n < words.length; n++)
		{
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0)
			{
				context.fillText(line, x, y + offset, maxWidth);
				line = words[n] + ' ';
				offset += lineHeight;
			}
			else
			{
				line = testLine;
			}
		}
		context.fillText(line, x, y + offset, maxWidth);
		offset += lineHeight;
	
	}
	return offset;
}
