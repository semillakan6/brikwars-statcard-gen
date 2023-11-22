function AttributesArea()
{
	this.drawText = function( ctx, text, i, offset )
	{
		ctx.textBaseline= "middle";
		ctx.textAlign = "center";
		ctx.shadowBlur = 0;
		var y = statcard.layout.front.attributes.y + statcard.layout.front.attributes.hgt * i + offset;
		ctx.fillText(text, statcard.layout.front.attributes.x, y, statcard.layout.front.attributes.wdt);
	}
	
	this.drawValueText = function( ctx, text, i, offset )
	{
		var p = statcard.layout.front.attributes.value;
		ctx.fillStyle = p.color;
		ctx.font = "bold " + p.size + "pt " + statcard.layout.serif;
		this.drawText(ctx, text, i, p.y + offset);
	}

	this.drawTitleText = function( ctx, text, i )
	{
		var p = statcard.layout.front.attributes.title;
		ctx.fillStyle = p.color;
		ctx.font = p.size + "pt " + statcard.layout.serif;
		this.drawText(ctx, text, i, p.y);
	}
	
	this.drawSubtextText = function( ctx, text, i, offset )
	{
		var p = statcard.layout.front.attributes.subtext;
		ctx.fillStyle = p.color;
		ctx.font = p.size + "pt " + statcard.layout.serif;
		this.drawText(ctx, text, i, p.y + offset);
	}
	
	this.draw = function( ctx )
	{
		this.drawSize(ctx, 0);
		this.drawArmor(ctx, 1);
		this.drawMove(ctx, 2);
		this.drawSkill(ctx, 3);
	};
	
	this.getSpeedTexts = function()
	{
		var speedText, speedSubText;
	
		var ground = moc.groundPropulsion.speed;
		var fly = moc.flyingPropulsion.speed;
		var thrust = moc.thrustPropulsion.speed;
		
		// none
		if(!thrust && !fly && !ground)
		{
			speedText = "-";
		}
		// only one
		else if (!!ground + !!fly + !!thrust == 1)
		{
			if(ground)
			{
				speedText = ground;
			}
			else if(fly)
			{
				speedText = fly;
				speedSubText = "Flying";
			}
			else
			{
				speedText = thrust;
				speedSubText = "Thrust";
			}
		}
		// ground + more
		else if (ground && (fly || thrust))
		{
			speedText = ground;
			
			if(fly && thrust)
			{
				speedSubText = "(Fly: "+fly+", Thrust: "+thrust+")";
			}
			else if(fly)
			{
				speedSubText = "(Flying: "+fly+")";
			}
			else
			{
				speedSubText = "(Thrust: "+thrust+")";
			}
		}
		// thrust + flying
		else if (thrust && fly)
		{
			speedText = fly;
			speedSubText = "Flying (Thrust: "+thrust+")";
		}
		return {speed: speedText, speedSub: speedSubText};
	};

	this.drawMove = function( ctx, i )
	{
		this.drawTitleText( ctx, "Move", i );
	
		var texts = this.getSpeedTexts();
		
		var fields = moc.specialities.getMoveFieldTexts();
		if(texts.speedSub)
		{
			fields.unshift(texts.speedSub);
		}

		var subTextOffset = -fields.length * statcard.layout.front.attributes.subtext.spacing / 4;
		this.drawValueText( ctx, texts.speed, i, subTextOffset);
		this.drawSubtexts( ctx, fields, i, subTextOffset );
	};
	
	this.drawArmor = function( ctx, i )
	{
		this.drawTitleText( ctx, "Armor", i );
	
		var energyShield = moc.equipment.getEnergyShieldStrength();
		var armorPlating = moc.equipment.hasArmorPlating();
		
		var fields = moc.specialities.getArmorFieldTexts();
		if(armorPlating) fields.unshift("Armor Plating");
		if(energyShield > 0) fields.unshift(energyShield+"x Energy Shield");

		var subTextOffset = -fields.length * statcard.layout.front.attributes.subtext.spacing / 4;
		this.drawValueText( ctx, moc.structure.getArmorRating(), i, subTextOffset );
		this.drawSubtexts( ctx, fields, i, subTextOffset );
	};
	
	this.drawSkill = function( ctx, i )
	{
		this.drawTitleText( ctx, "Skill", i);

		var skillText = "-", halfMindText, incompetentText;
		if (moc.mind.active)
		{
			skillText = mind_types[moc.mind.mindTypeId].skill;
			if(moc.mind.isHalfMind)
			{
				halfMindText = halfmind_types[moc.mind.halfmindTypeId].name;
			}
			if(mind_types[moc.mind.mindTypeId].isIncompetent)
			{
				incompetentText = mind_types[moc.mind.mindTypeId].name;
			}
		}
		
		var spacing = statcard.layout.front.attributes.subtext.spacing;
		var fields = moc.specialities.getSkillFieldTexts();
		if(halfMindText) fields.unshift(halfMindText);
		if(incompetentText) fields.unshift(incompetentText);

		var subTextOffset = -fields.length * statcard.layout.front.attributes.subtext.spacing / 4;
		this.drawValueText( ctx, skillText, i, subTextOffset );
		this.drawSubtexts( ctx, fields, i, subTextOffset );
	};
	
	this.drawSize = function( ctx, i )
	{
		this.drawTitleText( ctx, "Size", i);
		this.drawValueText( ctx, moc.structure.size, i, 0);
	};

	this.drawSubtexts = function( ctx, fields, i, subTextOffset )
	{
		var spacing = statcard.layout.front.attributes.subtext.spacing;
		
		var subTextPos = subTextOffset;
		for(var j=0; j<fields.length && j < 2; ++j)
		{
			this.drawSubtextText( ctx, fields[j], i, subTextPos );
			subTextPos += spacing;
		}
	};
	
}