let specialities_templates = {
	"Civilians": {
		civilian: {
			name: "Civilized",
			description:
				"A minifig suffering from the Civilized disability has very little capability to act in his own self-interest or follow through with consistent plans. Players use Mob Rule to take turns controlling as many Civilized units as they can stand to during a special Civilian Round.",
			cost: 0,
		},
		professional: {
			name: "Job Training (1d6)",
			shortname: "1d6 Training",
			mention: "skill",
			description:
				"Job Training makes a Professional slightly less incompetent, using his Specialty Action d6 instead of his usual Action Die for any job-related tasks. \nThe Professional is still subject to a Civilian's Civilized handicap; players take turns controlling Professionals in the Civilian Round along with all the other Civilians.",
			cost: 0,
		},
	},
	"Infantry": {
		worker: {
			name: "Job Training",
			description:
				"Like the Professionals, Job Training lets a Worker roll his Specialty Action:d6 rather than his regular Action:d4 Action Die for any job-related tasks. Unlike Professionals, this enhanced Action is used for the benefit of the Worker's faction rather than for screwing around uselessly in the background. \nWhenever a Worker isn't actively engaged in job-related tasks, he's prone to Stupidity like any other Incompetent unit.",
			cost: 0.5,
		},
		cannon_fodder: {
			name: "Irrelevant",
			description:
				"Cannon Fodder are irrelevant units, whose attacks only inflict one point of damage, efficient only against other Cannon Fodder or Size 0 Vermin. \nTheir Effective Size is 0, granting them no Momentum Dice, no Physical Opposition, no throwing ability and a zero inch Shove. They can only hold a single Short-sized weapon or item.",
			cost: 0.5,
		},
		skirmisher: {
			name: "Harassment",
			description:
				"The Skirmisher can break free from Close Combat without drawing Counterattacks after a single one-handed attack. This applies only if they move beyond the reach of opponents' Close Combat weapons. \nThe Skirmisher only employs one-handed weapons and equipment. \nIf the Skirmisher equips larger items or their movement slows to Half Speed, the Harassment ability is nullified. They will attract Counterattacks when attempting to Disengage normally.",
			cost: 1,
		},
		scout: {
			name: "Pathfinding/Tracking",
			shortname: "1d8 vs FH",
			mention: "skill",
			description:
				"Pathfinding Specialty (d8): The Scout uses this specialty action when rolling against Field Hazards, stopping safely before triggering Concealed Hazards for self and any following units. \nTracking: A unique ability that allows the Scout to detect hidden or invisible items like units, traps, and triggers automatically. \nMarking a target within 8'' visibility gives all allies the ability to see that target, regardless of their line of sight. Furthermore, it provides a +1 Action Bonus to allied Ranged attacks against this marked target until the start of the Scout's next turn.",
			cost: 1,
		},
		phalanx: {
			name: "Shield Wall",
			description:
				"A Phalanx shield wall is formed when Phalanx minifigs, with Heavy Shields pointed in the same direction, align in formation. \nWhen protected by a shield wall, all damage from the opposing direction is automatically parried without expending Actions or Counters. Note that using a shield to parry damage from other directions breaks the shield wall. \nWhile protected by a shield wall, minifigs can't be forced into Full Engagement in Close Combat. If forced into Full Engagement from non-shield-wall sides or if they voluntarily do so, the shield wall breaks and its benefits are lost. \nIf a Marching minifig is in a Squad with at least one other Marching minifig, they can March in formation, walking at normal speed and ignoring Movement penalties from Heavy Armor. Marching is walking only - units cannot jump, Sprint, or climb in the same turn as Marching, although they can still Bail if necessary. Marching does not cost an Action.",
			cost: 1,
		},
		marksman: {
			name: "Aiming",
			description:
				"Marksmen have the Aiming Specialty, granting them a Specialty Specialty 1d8 they can use to increase the effectiveness of a Ranged attack. \nWhen Aiming, a Marksman can make a single Ranged attack with a Short- or Long-Ranged Weapon or an AutoGun set to single fire. Aiming is a full-turn Action; the Marksman can turn to face in a new direction, but he can't use any Move inches during the turn.",
			cost: 1,
		},
		sniper: {
			name: "Sniping",
			description:
				"As a full-turn action, a Sniper can Snipe using a scoped Long-Range Weapon. \nTo Snipe, the weapon must have a physical scope attached to it, even if composite from other tools. \nAt a range of five inches or more, Sniping eliminates the need for an Action Roll. \nEvery shot made by Sniping is an automatic hit, irrespective of how improbable it may seem",
			cost: 1,
		},
		heavy: {
			name: "Compensating",
			description:
				"As long as a Heavy doesn't use any Move inches during the turn, he can lift, operate, and throw objects 1'' larger than usual, and he's treated as having a Size of 2'' when resisting Grabs, Shoves, and Collisions. \n\nMost often, Heavies use Compensating to wield and fire a 2'' Ranged weapon, but it also allows the use of larger Close Combat weapons. A Compensating Heavy can wield Heavy Weapons as if they were Hand Weapons, Two-Handed Weapons as if they were Heavy Weapons, or a Size 3'' Melee Weapon as if it was a Two-Handed Weapon.",
			cost: 1,
		},
	},
	"Operators": {
		rider: {
			name: "Horsemanship",
			description:
				"Where lesser minifigs have to choose between either controlling their steed's movement and weapons or fighting with their own minifig weapons in hand, a Rider has the Horsemanship to do both at once, as naturally as if he and his steed were a single unit. In Close Combat, Riders and their mounts can Parry, Counterstrike, and take attacks for each other at will. When an Action Roll is called for, the mount always uses the Rider's Action Die, regardless of whose is larger.",
			cost: 0,
		},
		pilot: {
			name: "Stunt Driving (1d8)",
			shortname: "1d8 Stunt Driving",
			mention: "skill",
			description:
				"The Pilot declares the Stunt he's about to pull, measures how many inches this will push the vehicle beyond its sane performance limits, and rolls his Specialty Specialty 1d8. If the number rolled is equal to or higher than the number of Stunt inches needed, then the Stunt is successful. \nIf not, then the number rolled is the number of inches for which the Stunt succeeds, and the remaining inches are given to an enemy player to use as Thrust against the vehicle while the enemy explains how the Stunt failed disastrously.",
			cost: 0,
		},
		gunner: {
			name: "Gunnery (1d8)",
			description:
				"Gunners can spend their Actions to provide Gunnery Support to another unit operating a large weapon, each granting a cumulative +1 Action Bonus to attack. \nAs long as the weapon keeps firing at the exact same point, and neither the weapon or the target move, the Action Bonuses from Gunnery Support continue until the weapon moves or aims somewhere else. Each turn that the firing team fires the weapon at the same target, they can home in, adding additional Gunnery Support bonuses to the continuing Action Bonus from the previous turn. Any Critical Failure cancels the homing in bonus and requires the Gunners to start over.",
			cost: 1,
		},
	},
	"Support": {
		tek: {
			name: "Assistance",
			description:
				"A Tek's job is to give Assistance to other Specialists, increasing their Specialty die by one die size. With a Tek's Assistance, a Medik's Ker-Triage! Roll or a Mechanik's Construction Action can be made with a 1d10 rather than 1d8",
			cost: 1,
		},
		mechanik: {
			name: "Mechanikal Aptitude (1d8)",
			shortname: "1d8 Construction",
			mention: "skill",
			description: "Allows Mechaniks to declare a Construction Action. On their turn end, they roll on a Specialty d8 to use bricks and parts within the rolled range for building, repairing, or modifying. Newly constructed items are called Field Constructions, with specific weight, size, armor, and move attributes. \nThe ability can also execute Patch repairs on damaged objects or Disassemble creations by rolling the Specialty d8. \nA successful Disassemble is when the roll exceeds the object's weight class, enabling the Mechanik to detach components. If the roll is insufficient, the attempt can be continued on subsequent turns.",
			cost: 1,
		},
		engineer: {
			name: "Rationalism (1d8)",
			shortname: "1d8 Rationalize",
			mention: "skill",
			description:
				"Using a Construction Action, an Engineering Tool, an Engineer can Rationalize performance tradeoffs that make no logical sense, rerouting a Specialty 1d8 from the samoflange distributors to the subspace induction processor core in complete contravention of the warranty and the laws of Physiks. Whether the object has samoflanges to distribute or subspace induction to process in the first place is beside the point. See Rationalizations table on the rules.",
			cost: 1,
		},
		medik: {
			name: "Ker-Triage! (1d8)",
			shortname: "1d8 Medikal",
			mention: "skill",
			description:
				"The unit can spend an Action to revive a fallen minifig or other Creature as long as a head is \
still attached: \n\nThe Medik rolls a d8 if it has a suitable Tool, or a d6 if it has any other cutting \
implement. Additional Medix can use their Actions to Assist, each increasing the die size once, to a \
maximum size of a d12.\n\
(5 - the outcome of the dice roll) limbs must be amputated. With a critical fail, \
the head is amputated.",
			cost: 1,
		},
		cybernetik: {
			name: "Mad Science (1d6)",
			description:
				"Using Mad Science and a proper Science Utensil, a Cybernetik can declare a Construction Action to begin combining mechanical and biological parts in direct contravention of minifig decency.",
			cost: 1,
		},
	},
	"Elite Units": {
		commando: {
			name: "Field Training",
			description:
				"A minifig going Commando is much less restricted than other Specialists. Thanks to his independent nature and extensive solo Field Training, the Commando has enough field knowledge of his allies and their skills to strike out on his own and not have to put up with any of them. He has a basic familiarity with any ally's Specialty marked with a Specialty die, but not a mastery of any of them - when he copies an allied minifig's Specialty, he uses a Specialty die one size smaller.",
			cost: 1,
		},
		hero: {
			name: "Heroic Ego (+1Ü)",
			description:
				"Heroic Ego: Ignores rules and limitations once per turn via a Heroic Feat aligned to his Action-Hero cliché. \
				\nFeats: Success determined by Hero's player and opponent's d6 roll. \
				\nRedShirts: Can inspire an allied unit within 1d10 roll worth of inches to take damage instead of the Hero. \
				\nCranky: Presence of other Heroic Egos or Artifakts on team reduces Hero's Action Die size (minimum of d4).",
			cost: 2,
		},
	},
	"Command Units": {
		officer: {
			name: "Coordination (1d6)",
			name: "1d8 Coordination",
			mention: "skill",
			description:
				"He can choose to take part in the combined Action, if appropriate, or simply provide helpful backseat advice while his Squad mates do the actual work. As long as at least two Squad members are participating in the combined Action together, their Action Dice are increased by one die size for that Action, up to the Officer's Specialty die size of (1d8)",
			cost: 1,
		},
		leader: {
			name: "Inspiration (1d6)",
			name: "1d8 Inspiration",
			mention: "skill",
			description:
				"Can spend an Action and use a Motivational Tool to grant a Specialty d6 Action re-roll or to add Specialty d6 to an attribute for a target unit or Squad",
			cost: 1,
		},
		commander: {
			name: "",
			description:
				"",
			cost: 1,
		},
		great_leader: {
			name: "",
			description:
				"",
			cost: 1,
		},
	},
};
/*var specialities_templates =
{
	civilian:
	{
		name: "Civilized",
		description:
			"A minifig suffering from the Civilized disability has very little capability to act in his own self-interest or follow through with consistent plans.\nPlayers use Mob Rule to take turns controlling as many Civilized units as they can stand to during a special Civilian Round.",
		cost: 3,
	},
	hero:
	{
		name: "Heroic Ego",
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
		name: "Riding",
		description:
			"Steering a vehicle does not cost an action. If on a horse, the two fight as a single unit in \
Close Combat, and each can Counter for attacks against the other.",
		cost: 1,
	},
	pilot:
	{
		name: "Stunt Driving",
		description:
			"May make one crazy Stunt Driving maneuver per turn, rolling a d8 against the number of inches \
the maneuver should deviate from normal movement.\nIf the roll fails, the remaining inches are \
given to the Enemy to use as Thrust against the vehicle at the point where the maneuver fails. \
\nOn a Critical Failure, +1d6\" are added to the Enemy's Thrust.",
		cost: 1,
	},
	gunner:
	{
		name: "Gunnery",
		shortname: "1d8 Mounted Wp.",
		mention: "skill",
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
		name: "Mechanikal Aptitude",
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
		name: "Stealth",
		description:
			"Has 1/3 more Cover than logic would suggest. At 2/3 natural Cover, may spend \
his action to become completely Hidden, and move in secret on every second turn.",
		cost: 2,
	},
	pathfinder:
	{
		name: "Pathfinding",
		shortname: "1d8 vs FH",
		mention: "skill",
		description:
			"• Boosts Skill to 1d8 for any rolls related to Field Hazards.\n\n\
• May spend a full-round Action to gain control of any Mechanism he can access.\n\n\
• Is immune to Unstable Ground when moving at half speed, can use his Action to lead \
others safely through as well.",
		cost: 1,
	},
	tracker:
	{
		name: "Tracking",
		description:
			"Hidden units and objects are visible to the unit and allies while in his \
field of view. He can use his Action to Mark a target within 8\", granting \
all allies a +1 Attack Bonus against it.",
		cost: 1,
	},
	heavy:
	{
		name: "Compensating",
		description:
			"As long as the unit does not move, it can use weapons one inch larger than normally allowed. \
Applies to hand and close combat weapons as well.",
		cost: 1,
	},
	medik:
	{
		name: "Medik",
		shortname: "1d8 Medikal",
		mention: "skill",
		description:
			"The unit can spend an Action to revive a fallen minifig or other Creature as long as a head is \
still attached: \n\nThe Medik rolls a d8 if it has a suitable Tool, or a d6 if it has any other cutting \
implement. Additional Medix can use their Actions to Assist, each increasing the die size once, to a \
maximum size of a d12.\n\
(5 - the outcome of the dice roll) limbs must be amputated. With a critical fail, \
the head is amputated.",
		cost: 2,
	},

};*/

$(document).ready(function () {
	var optGroup;
	var $select = $('select[name="specialities_templates"]');

	$select.append(new Option("(none)", ""));

	$.each(specialities_templates, function (group, templates) {
		optGroup = $('<optgroup>', {
			id: group,
			label: group
		}).appendTo($select);

		$.each(templates, function (key, value) {
			$('<option>', {
				value: key,
				text: value.name,
				description: value.description,
				cost: value.cost
			}).appendTo(optGroup);
		});
	});

	$select.select2({
		placeholder: "(none)",
		allowClear: true
	});
});

class Speciality {
	constructor() {
		this.name = '';
		this.shortname = '';
		this.mention = '';
		this.description = '';
		this.cost = '';
	}
}

class Specialities {
	constructor(moc) {
		this.moc = moc;
		this.stuff = [];
		this.cost = 0;

		// Binding "this" to class methods
		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
		this.calculate = this.calculate.bind(this);
		this.applyFrom = this.applyFrom.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.getFieldTexts = this.getFieldTexts.bind(this);
		this.getArmorFieldTexts = this.getArmorFieldTexts.bind(this);
		this.getMoveFieldTexts = this.getMoveFieldTexts.bind(this);
		this.getSkillFieldTexts = this.getSkillFieldTexts.bind(this);
		this._getHTMLRow = this._getHTMLRow.bind(this);
		this._appendRow = this._appendRow.bind(this);
		this._fillWithTemplate = this._fillWithTemplate.bind(this);
		this._updateFormForSpeciality = this._updateFormForSpeciality.bind(this);
	}

	add() {
		const newSpeciality = new Speciality();
		const i = this.stuff.push(newSpeciality) - 1;

		const row = document.createElement("tr");
		row.id = `specialities_${i}`;
		row.innerHTML = this._getHTMLRow(i);

		this._appendRow(row, i);
		const index = document.forms[0].specialities_templates.selectedIndex;
		this._fillWithTemplate(index, i);
	}

	remove(i) {
		this.stuff.splice(i, 1);

		const node = document.getElementById(`specialities_${i}`);
		node.parentNode.removeChild(node);
	}

	calculate() {
		this.cost = 0;
		for (let speciality of this.stuff) {
			speciality.cost = Math.round(parseFloat(speciality.cost) * 2) / 2;
			if (isNaN(speciality.cost)) {
				speciality.cost = 0;
			}
			this.cost += speciality.cost;
		}
	}

	applyFrom(form) {
		for (let i = 0; i < this.stuff.length; ++i) {
			let speciality = this.stuff[i];

			speciality.name = document.getElementById(`specialities_${i}_name`).value;
			speciality.description = document.getElementById(`specialities_${i}_desc`).value;
			speciality.cost = document.getElementById(`specialities_${i}_cost`).value;
			speciality.shortname = document.getElementById(`specialities_${i}_shortname`).value;
			speciality.mention_in = document.getElementById(`specialities_${i}_mention_in`).selectedIndex;
		}
	}

	updateForm(form) {
		for (let i = 0; i < this.stuff.length; ++i) {
			let speciality = this.stuff[i];

			this._updateFormForSpeciality(i, speciality);
		}
	}

	getFieldTexts(index) {
		let result = [];
		for (let speciality of this.stuff) {
			if (speciality.mention_in === index) {
				let name = speciality.shortname !== "" ? speciality.shortname : speciality.name;
				result.push(name);
			}
		}
		return result;
	}

	getArmorFieldTexts() {
		return this.getFieldTexts(1);
	}

	getMoveFieldTexts() {
		return this.getFieldTexts(2);
	}

	getSkillFieldTexts() {
		return this.getFieldTexts(3);
	}
	_getHTMLRow(i) {
		return `
            <td colspan='3'>
                <table class='table'>
                    <tr>
                        <th>Name</th>
                        <td>
                            <input type='text' id='specialities_${i}_name' class='form-control'/>
                        </td>
                        <td>
                            <button type='button' id='specialities_${i}_remove' class='btn btn-outline-danger'><i class='fas fa-trash'></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>
                            <textarea id='specialities_${i}_desc' class='form-control'></textarea>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Mention on front side</th>
                        <td>
                            <select id='specialities_${i}_mention_in' class='form-control'> 
                                <option value='no'>no</option>
                                <option value='armor'>in armor field</option>
                                <option value='move'>in move field</option>
                                <option value='skill'>in skill field</option>
                            </select> as <input type='text' id='specialities_${i}_shortname' class='form-control'/>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </td>
            <td class='cost'>
                <input type='text' size='1' id='specialities_${i}_cost' class='form-control'/>
            </td>`;
	}

	_appendRow(row, i) {
		document.getElementById("specialities").appendChild(row);

		// add Event listeners
		document.getElementById(`specialities_${i}_name`).addEventListener('change', this.calculate);
		document.getElementById(`specialities_${i}_desc`).addEventListener('change', this.calculate);
		document.getElementById(`specialities_${i}_shortname`).addEventListener('change', this.calculate);
		document.getElementById(`specialities_${i}_mention_in`).addEventListener('change', this.calculate);
		document.getElementById(`specialities_${i}_cost`).addEventListener('change', this.calculate);
		document.getElementById(`specialities_${i}_remove`).addEventListener('click', () => {
			this.remove(i);
			calculate();
		});
	}

	_fillWithTemplate(index, i) {
		if (index > 0) {
			const id = document.forms[0].specialities_templates.options[index].value;
			let template;
			Object.values(specialities_templates).some(templates => {
				if (id in templates) {
					template = templates[id];
					return true;
				}
				return false;
			});

			if (template) {
				document.getElementById(`specialities_${i}_name`).value = template.name;
				document.getElementById(`specialities_${i}_desc`).value = template.description;
				document.getElementById(`specialities_${i}_cost`).value = template.cost * this.moc.structure.size;
				document.getElementById(`specialities_${i}_shortname`).value = template.shortname ? template.shortname : "";

				const mentioned_in = document.getElementById(`specialities_${i}_mention_in`);
				if (template.mention) {
					for (let i = 0; i < mentioned_in.options.length; ++i) {
						if (mentioned_in.options[i].value == template.mention)
							mentioned_in.selectedIndex = i;
					}
				} else {
					mentioned_in.selectedIndex = 0;
				}

				document.forms[0].specialities_templates.selectedIndex = 0;
			}
		}
	}

	_updateFormForSpeciality(i, speciality) {
		document.getElementById(`specialities_${i}_name`).value = speciality.name;
		document.getElementById(`specialities_${i}_cost`).value = speciality.cost;
		document.getElementById(`specialities_${i}_shortname`).value = speciality.shortname;
		document.getElementById(`specialities_${i}_mention_in`).selectedIndex = speciality.mention_in;

		document.getElementById(`specialities_${i}_shortname`).disabled = speciality.mention_in == 0;

		const speciality_desc = document.getElementById(`specialities_${i}_desc`);
		speciality_desc.value = speciality.description;
		speciality_desc.style.height = "0px";
		speciality_desc.style.height = (speciality_desc.scrollHeight) + 'px';
	}
}