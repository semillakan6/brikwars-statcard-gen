class AttributesArea {
    constructor() {
        
        const drawText = (ctx, text, i, offset, config) => {
            let {x, y, hgt, wdt} = statcard.layout.front.attributes;
            y += hgt * i + offset;
            
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.shadowBlur = 0;
            ctx.fillStyle = config.color;
            ctx.font = `${config.bold ? "bold " : ""}${config.size}pt ${statcard.layout.serif}`;
            ctx.fillText(text, x, y, wdt);
        };
        
        this.drawTitleText = (ctx, text, i) => 
            drawText(ctx, text, i, 20, statcard.layout.front.attributes.title);
        
        this.drawSubtextText = (ctx, text, i, offset) => 
            drawText(ctx, text, i, offset + statcard.layout.front.attributes.subtext.y, statcard.layout.front.attributes.subtext);
        
        this.drawValueText = (ctx, text, i, offset) =>
            drawText(ctx, text, i, offset + statcard.layout.front.attributes.value.y, {...statcard.layout.front.attributes.value, bold: true});
        
        this.draw = (ctx) => {
            this.drawSize(ctx, 0);
            this.drawArmor(ctx, 1);
            this.drawMove(ctx, 2);
            this.drawSkill(ctx, 3);
        };


        const getSpeedTexts = () => {
            const { speed: ground } = moc.groundPropulsion;
            const { speed: fly } = moc.flyingPropulsion;
            const { speed: thrust } = moc.thrustPropulsion;
            let speedText = "-", speedSubText;

            if (!(thrust || fly || ground)) {
                speedText = "-";
            } else if (!!ground + !!fly + !!thrust === 1) {
                if (ground) {
                    speedText = ground;
                } else if (fly) {
                    speedText = fly;
                    speedSubText = "Flying";
                } else {
                    speedText = thrust;
                    speedSubText = "Thrust";
                }
            } else if (ground && (fly || thrust)) {
                speedText = ground;
                if (fly && thrust) {
                    speedSubText = "(Fly: " + fly + ", Thrust: " + thrust + ")";
                } else if (fly) {
                    speedSubText = "(Flying: " + fly + ")";
                } else {
                    speedSubText = "(Thrust: " + thrust + ")";
                }
            } else if (thrust && fly) {
                speedText = fly;
                speedSubText = "Flying (Thrust: " + thrust + ")";
            }
            return { speed: speedText, speedSub: speedSubText };
        };

        this.drawMove = (ctx, i) => {
            this.drawTitleText(ctx, "Move", i);

            const { speed, speedSub } = getSpeedTexts();

            const fields = moc.specialities.getMoveFieldTexts();
            if (speedSub) {
                fields.unshift(speedSub);
            }

            const subTextOffset = -fields.length * statcard.layout.front.attributes.subtext.spacing / 4;
            this.drawValueText(ctx, speed, i, subTextOffset);
            this.drawSubtexts(ctx, fields, i, subTextOffset);
        };
            
        // Similar changes for other draw* methods
        
        this.drawArmor = (ctx, i) => {
			this.drawTitleText(ctx, "Armor", i);
		
			const energyShield = moc.equipment.getEnergyShieldStrength();
			const armorPlating = moc.equipment.hasArmorPlating();
		
			const fields = moc.specialities.getArmorFieldTexts();
			if (armorPlating) fields.unshift("Armor Plating");
			if (energyShield > 0) fields.unshift(energyShield + "x Energy Shield");
		
			const subTextOffset = -fields.length * statcard.layout.front.attributes.subtext.spacing / 4;
		
			this.drawValueText(ctx, moc.structure.getArmorRating(), i, subTextOffset);
			this.drawSubtexts(ctx, fields, i, subTextOffset);
		};
		
		this.drawSkill = (ctx, i) => {
			this.drawTitleText(ctx, "Skill", i);
		
			let skillText = "-", halfMindText, incompetentText;
			if (moc.mind.active) {
				skillText = mind_types[moc.mind.mindTypeId].skill;
				if (moc.mind.isHalfMind) {
					halfMindText = halfmind_types[moc.mind.halfmindTypeId].name;
				}
				if (mind_types[moc.mind.mindTypeId].isIncompetent) {
					incompetentText = mind_types[moc.mind.mindTypeId].name;
				}
			}
		
			const fields = moc.specialities.getSkillFieldTexts();
			if (halfMindText) fields.unshift(halfMindText);
			if (incompetentText) fields.unshift(incompetentText);
		
			const subTextOffset = -fields.length * statcard.layout.front.attributes.subtext.spacing / 4;
		
			this.drawValueText(ctx, skillText, i, subTextOffset);
			this.drawSubtexts(ctx, fields, i, subTextOffset);
		};

        this.drawSize = (ctx, i) => {
            this.drawTitleText(ctx, "Size", i);
            this.drawValueText(ctx, moc.structure.size, i, 0);
        };

		this.drawSubtexts = (ctx, fields, i, subTextOffset) => {
            const {spacing} = statcard.layout.front.attributes.subtext;
            fields.slice(0, 2).forEach((field, idx) => this.drawSubtextText(ctx, field, i, subTextOffset + idx * spacing));
        };
    }
}