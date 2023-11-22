var specialities_templates = 
{
	hero:
	{
		name:"Heroic Ego",
		description:
"Takes one Heroic Feat per turn according to his Cliché.\n\n\
Cranky: Receives a cumulative -1 penalty to every die rolled for every other \
conscious Heroic unit in his army and a discount of 1 to its cost (capped at \
-5 per die and 50% discount). \n\n\
When about to take damage, may inspire one nearby friendly unit (within 1d6\") \
to RedShirt, taking the damage on the Hero's behalf.",
		cost: 3,
	},
	rider:
	{
		name:"Riding",
		description:
"Steering a vehicle does not cost an action. If on a horse, the two fight as a single unit in \
Close Combat, and each can Counter for attacks against the other.",
		cost: 1,
	},
	pilot:
	{
		name:"Stunt Driving",
		description:
"May make one crazy Stunt Driving maneuver per turn, rolling a d8 against the number of inches \
the maneuver should deviate from normal movement.\nIf the roll fails, the remaining inches are \
given to the Enemy to use as Thrust against the vehicle at the point where the maneuver fails. \
\nOn a Critical Failure, +1d6\" are added to the Enemy's Thrust.",
		cost: 1,
	},
	gunner:
	{
		name:"Gunnery",
		shortname:"1d8 Mounted Wp.",
		mention:"skill",
		description:
"Increases Skill for the operation of any mounted weapon or device to 1d8.\n\n\
May spend his action to give Gunnery Support to another minifig, adding +1 to \
the Attack Roll. For every turn both the weapon and its target stayed stationary, an \
additional bonus of +1 is added. The number of minifigs in the firing team is limited to the \
Size of the weapon.",
		cost: 1,
	},
	mechanik:
	{
		name:"Mechanikal Aptitude",
		description:
"Rather than taking an Action, may initiate a Construction Action during his \
enemies' turns instead. All portable elements within arms' reach and 1d6\" \
are available for one of the following projects until the beginning of his next turn:\n\n\
• Build new structures with Armor 1d6 on the field.\n\n\
• Patch Repair a structure by one Size Damage and/or increase its \
Structure Level by one (up to level 3). Requires to build a patch of a size \
that is at least equal to the resulting Effective Size.\n\n\
• Disassemble up to 1d6 minus Structure Level elements from a structure.",
		cost: 2,
	},
	stealth:
	{
		name:"Stealth",
		description:
"Has 1/3 more Cover than logic would suggest. At 2/3 natural Cover, may spend \
his action to become completely Hidden, and move in secret on every second turn.",
		cost: 2,
	},
	pathfinder:
	{
		name:"Pathfinding",
		shortname:"1d8 vs FH",
		mention:"skill",
		description:
"• Boosts Skill to 1d8 for any rolls related to Field Hazards.\n\n\
• May spend a full-round Action to gain control of any Mechanism he can access.\n\n\
• Is immune to Unstable Ground when moving at half speed, can use his Action to lead \
others safely through as well.",
		cost: 1,
	},
	tracker:
	{
		name:"Tracking",
		description:
"Hidden units and objects are visible to the unit and allies while in his \
field of view. He can use his Action to Mark a target within 8\", granting \
all allies a +1 Attack Bonus against it.",
		cost: 1,
	},
	heavy:
	{
		name:"Compensating",
		description:
"As long as the unit does not move, it can use weapons one inch larger than normally allowed. \
Applies to hand and close combat weapons as well.",
		cost: 1,
	},
	medik:
	{
		name:"Medik",
		shortname:"1d8 Medikal",
		mention:"skill",
		description:
"The unit can spend an Action to revive a fallen minifig or other Creature as long as a head is \
still attached: \n\nThe Medik rolls a d8 if it has a suitable Tool, or a d6 if it has any other cutting \
implement. Additional Medix can use their Actions to Assist, each increasing the die size once, to a \
maximum size of a d12.\n\
(5 - the outcome of the dice roll) limbs must be amputated. With a critical fail, \
the head is amputated.",
		cost: 2,
	},
	
};

function Speciality()
{
	this.name;
	this.shortname;
	this.mention;
	this.description;
	this.cost;
};

function Specialities(moc)
{
	this.moc = moc;
	this.stuff = [];
	this.cost = 0;
	
	this.add = function()
	{
		var i = this.stuff.push(new Speciality()) - 1;
			
		var row = document.createElement("tr");
		row.id = "specialities_"+i;
		row.innerHTML = 
			"<td>\
				<table>\
					<tr>\
						<th>Name</th>\
						<td>\
							<input type='text' id='specialities_"+i+"_name' onkeyup='calculate();' onchange='calculate();' style='width: 300pt; maxwidth: 300pt' />\
						</td>\
						<td>\
							<input type='button' value='X' id='specialities_"+i+"_remove' onclick='moc.specialities.remove("+i+"); calculate();'/>\
						</td>\
					</tr>\
					<tr>\
						<th>Description</th>\
						<td>\
							<textarea id='specialities_"+i+"_desc' onkeyup='calculate();' style='width: 300pt; maxwidth: 300pt' onchange='calculate();'></textarea>\
						</td>\
						<td></td>\
					</tr>\
					<tr>\
						<th>Mention on front side</th>\
						<td>\
							<select id='specialities_"+i+"_mention_in' onchange='calculate();' > \
								<option value='no'>no</option>\
								<option value='armor'>in armor field</option>\
								<option value='move'>in move field</option>\
								<option value='skill'>in skill field</option>\
							</select> as <input type='text' id='specialities_"+i+"_shortname' onkeyup='calculate();' onchange='calculate();' style='width: 100pt;'/>\
						</td>\
						<td></td>\
					</tr>\
				</table>\
			</td>\
			<td>\
			</td>\
			<td class='cost'>\
				<input type='text' size='1' id='specialities_"+i+"_cost' onchange='calculate();'/>\
			</td>";
		
		document.getElementById("specialities").appendChild(row);
		
		// fill with template
		var index = document.forms[0].specialities_templates.selectedIndex;
		if(index > 0)
		{
			var id = document.forms[0].specialities_templates.options[index].value;
			var template = specialities_templates[id];
			document.getElementById("specialities_"+i+"_name").value = template.name;
			document.getElementById("specialities_"+i+"_desc").value = template.description;
			document.getElementById("specialities_"+i+"_cost").value = template.cost * this.moc.structure.size;
			document.getElementById("specialities_"+i+"_shortname").value = template.shortname ? template.shortname : "";
			
			var mentioned_in = document.getElementById("specialities_"+i+"_mention_in");
			if(template.mention)
			{
				for(var i = 0; i < mentioned_in.options.length; ++i)
				{
					if(mentioned_in.options[i].value == template.mention)
						mentioned_in.selectedIndex = i;
				}
			}
			else
			{
				mentioned_in.selectedIndex = 0;
			}
			
			document.forms[0].specialities_templates.selectedIndex = 0;
		}
	};
	
	this.remove = function(i)
	{
		this.stuff[i] = null;
		
		var node = document.getElementById("specialities_"+i);
		node.parentNode.removeChild(node);
	};
	
	this.calculate = function()
	{
		this.cost = 0;
		for(var i=0; i<this.stuff.length; ++i)
		{
			var speciality = this.stuff[i];
			if(!speciality) continue;
			
			speciality.cost = Math.round(parseFloat(speciality.cost)*2)/2;
			if(isNaN(speciality.cost)) speciality.cost = 0;
			//if(speciality.cost < 0) speciality.cost = 0;
			this.cost += speciality.cost;
		}
	};
	
	this.applyFrom = function(form)
	{
		for(var i=0; i<this.stuff.length; ++i)
		{
			var speciality = this.stuff[i];
			if(!speciality) continue;
			
			speciality.name = document.getElementById("specialities_"+i+"_name").value;
			speciality.description = document.getElementById("specialities_"+i+"_desc").value;
			speciality.cost = document.getElementById("specialities_"+i+"_cost").value;
			speciality.shortname = document.getElementById("specialities_"+i+"_shortname").value;
			speciality.mention_in = document.getElementById("specialities_"+i+"_mention_in").selectedIndex;
		}
	};
	
	this.updateForm = function(form)
	{
		for(var i=0; i<this.stuff.length; ++i)
		{
			var speciality = this.stuff[i];
			if(!speciality) continue;
			
			document.getElementById("specialities_"+i+"_name").value = speciality.name;
			document.getElementById("specialities_"+i+"_cost").value = speciality.cost;
			document.getElementById("specialities_"+i+"_shortname").value = speciality.shortname;
			document.getElementById("specialities_"+i+"_mention_in").selectedIndex = speciality.mention_in;
			
			document.getElementById("specialities_"+i+"_shortname").disabled = speciality.mention_in == 0;
			
			var speciality_desc = document.getElementById("specialities_"+i+"_desc")
			speciality_desc.value = speciality.description;
			speciality_desc.style.height = "0px";
			speciality_desc.style.height = (speciality_desc.scrollHeight) + 'px';
		}
	};
	
	this.getFieldTexts = function(index)
	{
		var result = [];
		for(var i=0; i<this.stuff.length; ++i)
		{
			var speciality = this.stuff[i];
			if(!speciality) continue;
			if(speciality.mention_in == index)
			{
				var name = speciality.shortname != "" ? speciality.shortname : speciality.name;
				result.push(name);
			}
		}
		return result;
	};
	
	this.getArmorFieldTexts = function()
	{
		return this.getFieldTexts(1);
	};
	
	this.getMoveFieldTexts = function()
	{
		return this.getFieldTexts(2);
	};
	
	this.getSkillFieldTexts = function()
	{
		return this.getFieldTexts(3);
	};
}