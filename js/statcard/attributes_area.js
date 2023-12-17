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


        const handleSingleSource = (sources) => {
            for (const key in sources) {
                if (sources[key]) {
                    return {
                        speedText: sources[key],
                        speedSubText: key === 'ground' ? null : key.charAt(0).toUpperCase() + key.slice(1),
                    };
                }
            }
        };
        
        const handleMultipleSources = (sources) => {
            let { ground, fly, thrust } = sources;
        
            if (ground) {
                return {
                    speedText: ground,
                    speedSubText: fly && thrust ? `(Fly: ${fly}, Thrust: ${thrust})` : fly ? `(Flying: ${fly})` : `(Thrust: ${thrust})`,
                };
            } else if (thrust && fly) {
                return {
                    speedText: fly,
                    speedSubText: `Flying (Thrust: ${thrust})`,
                };
            }
        };
        
        const checkPropulsion = (propulsion) => {
            let sources = { ground: propulsion.ground, fly: propulsion.flying, thrust: propulsion.thrust };
            let truths = Object.values(sources).filter(Boolean).length;
        
            if (truths === 0) {
                return { speedText: '-', speedSubText: null };
            } else if (truths === 1) {
                return handleSingleSource(sources);
            } else {
                return handleMultipleSources(sources);
            }
        };
        
        const getSpeedTexts = () => {
            let ground, flying, thrust;

			if (document.getElementById('enhanced_attr').checked) {
                if ($("#unit_type").val() == 'flying_machine') {
                    ground = 0;
                    flying = parseInt($('#txtMoveTotal').val());
                } else {
                    ground = parseInt($('#txtMoveTotal').val());
                    flying = 0;
                }
            } else {
                ground = moc.groundPropulsion.speed;
                flying = moc.flyingPropulsion.speed;
            }
            thrust = handleThrusterType(moc.thrustPropulsion.speed);
            const propulsion = {
                ground: ground,
                flying: flying,
                thrust: thrust,
            };
        
            let { speedText, speedSubText } = checkPropulsion(propulsion);
        
            return {
                speed: speedText,
                speedSub: speedSubText,
            };
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
		
		const getSkillText = () => {
            if (!moc.mind.active && !document.getElementById('enhanced_attr').checked) {
                return "-";
            }
            if (document.getElementById('enhanced_attr').checked && !document.getElementById('action_impairmentCheck').checked) {
                
                return document.getElementById('txtActionTotal').value;
            }
            if (moc.mind.isHalfMind && halfmind_types[moc.mind.halfmindTypeId] && halfmind_types[moc.mind.halfmindTypeId].name === "Incompetent") {
                return halfmind_types[moc.mind.halfmindTypeId].skill;
            }
            return mind_types[moc.mind.mindTypeId].skill;
        };
        
        const getHalfMindText = () => {
            if (moc.mind.isHalfMind && halfmind_types[moc.mind.halfmindTypeId] && halfmind_types[moc.mind.halfmindTypeId].name !== "Incompetent") {
                return halfmind_types[moc.mind.halfmindTypeId].name;
            }
            return null;
        };
        
        const getIncompetentText = () => {
            if (moc.mind.isHalfMind && halfmind_types[moc.mind.halfmindTypeId] && halfmind_types[moc.mind.halfmindTypeId].isIncompetent) {
                return halfmind_types[moc.mind.halfmindTypeId].name;
            }
            return null;
        };

        const getFields = (halfMindText, incompetentText) => {
            const fields = moc.specialities.getSkillFieldTexts();
            if (halfMindText) fields.unshift(halfMindText);
            if (incompetentText) fields.unshift(incompetentText);
            return fields;
        };
        
        this.drawSkill = (ctx, i) => {
            this.drawTitleText(ctx, "Skill", i);
        
            let skillText = getSkillText();
            let halfMindText = getHalfMindText();
            let incompetentText = getIncompetentText();
        
            let fields = getFields(halfMindText, incompetentText);
        
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