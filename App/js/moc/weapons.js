
let weapon_help =
{
	Weapon: "Size is measured along the muzzle/blade, thickness does not count. Round up- or downward according to preference.",
	Explosive: "Size is measured in construction bricks. A launcher can only shoot explosives up to its own size in inches.",
};

let weapon_types =
	[
		{
			name: "Gun",
			category: "Weapon",
			sizeCost: 3,
			baseCost: 0,
			sizeUse: 1,
			baseUse: 2,
			sizeRange: 4,
			baseRange: 2,
			damage: "d6",
			damageMulSize: true,
			usePower: true,
			notes: "-"
		},
		{
			name: "Blast Gun",
			category: "Weapon",
			sizeCost: 3,
			baseCost: 0,
			sizeUse: 1,
			baseUse: 1,
			sizeRange: 2,
			baseRange: 2,
			damage: "d8 - (distance)",
			damageMulSize: true,
			usePower: true,
			notes: "1 Firing Arc, no Auto Penalty, Target size modifiers affect Damage"
		},
		{
			name: "Machine Gun",
			category: "Weapon",
			sizeCost: 4,
			baseCost: 0,
			sizeUse: 1,
			baseUse: 2,
			sizeRange: 3,
			baseRange: 2,
			damage: "d6",
			damageMulSize: true,
			usePower: true,
			notes: "-1 Auto Penalty per Arc or Burst, may require Reload"
		},
		{
			name: "Flame Thrower",
			category: "Weapon",
			sizeCost: 3,
			baseCost: 0,
			sizeUse: 1,
			baseUse: 1,
			sizeRange: 2,
			baseRange: 2,
			damage: "d4 Fire",
			damageMulSize: true,
			usePower: true,
			notes: "min. 1 Firing Arc, -1 Auto Penalty per Arc, Target size modifiers affect Damage "
		},
		{
			name: "Cannon",
			category: "Weapon",
			sizeCost: 3,
			baseCost: 0,
			sizeUse: 1,
			baseUse: 3,
			sizeRange: 4,
			baseRange: 0,
			damage: "(determined by Ammunition)",
			damageMulSize: false,
			usePower: true,
			notes: "requires Reload after each shot, max ammunition Explosive Size of ? (Size)\""
		},
		{
			name: "Launcher",
			category: "Weapon",
			sizeCost: 3,
			baseCost: 0,
			sizeUse: 2,
			baseUse: 0,
			sizeRange: 6,
			baseRange: 0,
			damage: "(determined by payload)",
			damageMulSize: false,
			usePower: true,
			notes: "max Payload Size of ? (Size)\", max Explosive Size of (Size) bricks"
		},
		{
			name: "Melee Weapon",
			category: "Weapon",
			sizeCost: 2,
			baseCost: 0,
			sizeUse: 1,
			baseUse: 1,
			sizeRange: 0,
			baseRange: "CC",
			damage: " Skill die",
			damageMulSize: true,
			usePower: true,
			notes: "-"
		},
		{
			name: "Melee Shield",
			category: "Weapon",
			sizeCost: 1,
			baseCost: 0,
			sizeUse: 2,
			baseUse: 0,
			sizeRange: 0,
			baseRange: "CC",
			damage: " x Shielded Parry",
			damageMulSize: true,
			usePower: true,
			notes: "Parry or Shove only, can Parry Charge attacks"
		},
		{
			name: "Tool",
			category: "Weapon",
			sizeCost: 1,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: "CC",
			damage: " Skill die - ",
			damageMulSize: true,
			damageAddSize: true,
			usePower: true,
			notes: "-"
		},
		{
			name: "Explosive",
			category: "Explosive",
			sizeCost: 1,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 2,
			sizeRange: 0,
			baseRange: "CC or 3''",
			damage: "d10 Explosion",
			damageMulSize: true,
			usePower: false,
			notes: "ranged stats can be determined by Launcher or Cannon, if any"
		},
		{
			name: "Incendiary Explosive",
			category: "Explosive",
			sizeCost: 1,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 2,
			sizeRange: 0,
			baseRange: "CC or 3''",
			damage: "d4 Fire",
			damageMulSize: true,
			usePower: false,
			notes: "ranged stats can be determined by Launcher or Cannon, if any"
		},
		{
			name: "Armor Piercing Explosive",
			category: "Explosive",
			sizeCost: 1,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 2,
			sizeRange: 0,
			baseRange: "CC or 3''",
			damage: "d6 Pierce",
			damageMulSize: true,
			usePower: false,
			notes: "ranged stats can be determined by Launcher or Cannon, if any"
		},
		{
			name: "Concussion Explosive",
			category: "Explosive",
			sizeCost: 1,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 2,
			sizeRange: 0,
			baseRange: "CC or 3''",
			damage: "d8 Knockback",
			damageMulSize: true,
			usePower: false,
			notes: "ranged stats can be determined by Launcher or Cannon, if any"
		},
		{
			name: "Phased Explosive",
			category: "Explosive",
			sizeCost: 1,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 2,
			sizeRange: 0,
			baseRange: "CC or 3''",
			damage: "d10 (2d10 = d12 Phased)",
			damageMulSize: true,
			usePower: false,
			notes: "Costs two d10's to use each d12"
		},
		{
			name: "Rocket",
			category: "Explosive",
			sizeCost: 2,
			baseCost: 0,
			sizeUse: 2,
			baseUse: 0,
			sizeRange: 6,
			baseRange: 0,
			damage: "d10 Explosion",
			damageMulSize: true,
			usePower: true,
			notes: "-"
		},
		{
			name: "Long-Ranged Weapon",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 5,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: 10,
			damage: "1d6 + 1",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "-"
		},
		{
			name: "ShotGun",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 4,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: 6,
			damage: "1d8 + 1 - (distance)",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "1 Firing Arc, no Auto Penalty, Target Size modifiers affect Damage, 1\" KnockBack to minifigs or smaller"
		},
		{
			name: "AutoGun",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 6,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: 8,
			damage: "1d6 + 1",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "-1 Auto Penalty per Arc or Burst, may require Reload "
		},
		{
			name: "FlameGun",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 4,
			sizeUse: 0,
			baseUse: 2,
			sizeRange: 0,
			baseRange: 5,
			damage: "1d4 + 1 Fire",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "min 1 Firing Arc, -1 Auto Penalty per Arc, Target Size modifiers affect Damage"
		},
		{
			name: "Bazooka",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 4,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: 6,
			damage: "(determined by Ammunition)",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "requires reload after each shot, max Explosive Size (XS) of 1"
		},
		{
			name: "RailGun",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 4,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: 8,
			damage: "(determined by Payload)",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "max Payload Size of 1\", max Explosive Size (XS) of 2"
		},
		{
			name: "Heavy Weapon",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 3,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: "CC",
			damage: "Skill die + 2",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "may be paired with Shield or Heavy Shield, 1\" KnockBack to minifigs (no Disruption)"
		},
		{
			name: "Two-Handed Weapon",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 4,
			sizeUse: 0,
			baseUse: 4,
			sizeRange: 0,
			baseRange: "CC",
			damage: "2 Skill dice",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 2,
			notes: "Two-Handed; -1\" Move; can't Sprint; can't throw;1\" KnockBack to minifigs"
		},
		{
			name: "Heavy Shield",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 1,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: "CC",
			damage: "Shielded Parry",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1.5,
			notes: "Parry or Shove only, can Parry Charge attacks, can provide cover"
		},
		{
			name: "Wand",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 2,
			sizeRange: 0,
			baseRange: "CC or 6''",
			damage: "-",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 1,
			notes: "extends the reach of SuperNatural Effects by touch, melee attack, or ranged attack"
		},
		{
			name: "Staff",
			category: "Weapon",
			sizeCost: 0,
			baseCost: 0,
			sizeUse: 0,
			baseUse: 3,
			sizeRange: 0,
			baseRange: "CC or 6''",
			damage: "-",
			damageMulSize: false,
			usePower: true,
			forMinifigs: true,
			size: 2,
			notes: "extends the reach of SuperNatural Effects by touch, melee attack, or ranged attack"
		},

	];


class Weapon {
	constructor(type_id, selectedSize) {
		this.type = weapon_types[type_id];
		this.type_id = type_id;
		this.selectedSize = selectedSize;
		this.customName = "";
		this.amount = 1;

		this.hasFixedSize = function () {
			return !!(this.type.size);
		};

		this.name = function () {
			if (this.customName && this.customName.length > 0)
				return this.customName;
			return this.type.name;
		};

		this.siz = function () {
			return this.hasFixedSize() ? this.type.size : this.selectedSize;
		};

		/*this.power = function () {
			return this.type.usePower ? this.siz() * this.amount : 0;
		};*/

		/*this.cost = function () {
			return (this.type.sizeCost * this.siz() + this.type.baseCost) * this.amount;
		};*/

		this.use = function () {
			if (isNaN(parseInt(this.type.baseUse)))
				return this.type.baseUse;

			return this.type.sizeUse * this.siz() + this.type.baseUse;
		};

		this.range = function () {
			if (isNaN(parseInt(this.type.baseRange)))
				return this.type.baseRange;

			return this.type.sizeRange * this.siz() + this.type.baseRange;
		};

		this.damage = function () {
			let addSize = this.type.damageAddSize ? this.siz() : "";
			let damage = this.type.damage;
			if (this.type.damageMulSize && this.siz() > 1)
				damage = damage.replace("die", "dice");

			if (this.type.damageMulSize)
				return this.siz() + damage + addSize;

			else
				return damage + addSize;
		};

		this.notes = function () {
			return this.type.notes;
		};

		this.help = function () {
			return weapon_help[this.type.category];
		};

		this.isIdenticalTo = function (weapon) {
			let typeEqual = this.type_id == weapon.type_id;
			let sizeEqual = this.siz() == weapon.siz();
			let nameEqual = this.customName == weapon.customName;
			return typeEqual && sizeEqual && nameEqual;
		};
	}
};

class Armament {
	constructor(moc) {
		this.weapons = new Array();
		this.cost = 0;
		//this.powerUsage = 0;
		this.moc = moc;

		this.init = function () {
			let weapons_node = document.getElementById("weapons");
			while (weapons_node.firstChild) {
				weapons_node.removeChild(weapons_node.firstChild);
			}
		};
		this.init();

		this.getWeaponsWithCounts = function () {
			let result = [];

			for (let i = 0; i < this.weapons.length; ++i) {
				let weap = this.weapons[i];
				if (!weap) continue;

				let found = false;
				for (let j = 0; j < result.length; ++j) {
					if (weap.isIdenticalTo(result[j].weapon)) {
						result[j].count += weap.amount;
						found = true;
					}
				}
				if (!found) {
					result.push({ weapon: weap, count: weap.amount });
				}
			}
			return result;
		};

		this.add = function () {
			const index = this.weapons.push(new Weapon(0, this.moc.structure.size)) - 1;

			appendElements("weapons", createWeaponsRow(index), createSecondRow(index));
		};


		function createSelectElement(index, weaponTypes) {
			const selectElement = document.createElement("select");
			const minifigWeapons = document.forms[0].weapons_minifigs.checked;
			
			selectElement.className = "form-select";
			selectElement.id = `weapon_${index}_type`;
			selectElement.onchange = calculate;
			selectElement.onkeyup = calculate;
			weaponTypes.forEach((weaponType, i) => {
				if (weaponType.forMinifigs ? !minifigWeapons : minifigWeapons) return;

				let option = document.createElement("option");
				option.text = weaponType.name;
				option.value = i;

				selectElement.appendChild(option);
			});

			return selectElement;
		}


		function createInputElement(type, index) {
			const inputElement = document.createElement("input");
		
			inputElement.id = `weapon_${index}_${type}`;
			inputElement.className = "form-control";
			inputElement.style.width = type === "name" ? "105pt" : "";
			if (type === "name" || type === "damage") {
				inputElement.type = "text";
			} else {
				inputElement.type = "number";
			}
			inputElement.min = 1;
			inputElement.step = 1;
			inputElement.size = 1;
			inputElement.onkeyup = calculate;
			inputElement.onchange = calculate;
		
			if (type === "use" || type === "range" || type === "damage") {
				inputElement.disabled = true;
			}
		
			return inputElement;
		}


		function createButton(index) {
			const button = document.createElement("button");
		
			button.type = "button";
			button.innerHTML = '<i class="fas fa-times"></i>';
			button.id = `weapon_${index}_remove`;
			button.className = "btn btn-danger";
			button.onclick = function () {
				moc.armament.remove(index);
				calculate();
			};
		
			return button;
		}


		function createCell(elementToAppend) {
			const cell = document.createElement("td");
			cell.appendChild(elementToAppend);
			return cell;
		}


		function createWeaponsRow(index) {
			const row = document.createElement("tr");

			row.id = `weapon_${index}`;
			row.className = "first";
			row.append(
				createCell(createSelectElement(index, weapon_types)),
				createCell(createInputElement("size", index)),
				createCell(createInputElement("amount", index)),
				createCell(createInputElement("name", index)),
				createCell(createInputElement("use", index)),
				createCell(createInputElement("range", index)),
				createCell(createInputElement("damage", index)),
				createCell(createButton(index)),
				//createCell(createCostCell(index))
			);

			return row;
		}


		function createSecondRow(index) {
			const row = document.createElement("tr");
			const notesCell = document.createElement("td");
			//const otherCell = document.createElement("td");

			row.className = "second";

			notesCell.id = `weapon_${index}_notes`;
			notesCell.appendChild(document.createTextNode(" "));
			notesCell.className = "help";
			notesCell.colSpan = 8;

			//otherCell.className = "cost";

			row.append(notesCell);

			return row;
		}


		function createCostCell(index) {
			const costCell = document.createElement("td");
			const costInput = document.createElement("input");

			costCell.className = "cost";
			costInput.disabled = true;
			costInput.size = 1;
			costInput.type = "text";
			costInput.id = `weapon_${index}_cost`;

			costCell.appendChild(costInput);

			return costCell;
		}


		function appendElements(elementId, ...elements) {
			elements.forEach(element => document.getElementById(elementId).appendChild(element));
		}

		this.remove = function (i) {
			this.weapons[i] = null;

			let node = document.getElementById("weapon_" + i);
			node.parentNode.removeChild(node);
			node = document.getElementById("weapon_" + i + "_notes");
			node.parentNode.parentNode.removeChild(node.parentNode);
		};

		this.calculate = function () {
			this.cost = 0;
			//this.powerUsage = 0;
			for (let i = 0; i < this.weapons.length; ++i) {
				let weapon = this.weapons[i];
				if (!weapon) continue;

				//this.cost += weapon.cost();
				//this.powerUsage += weapon.power();
			}
		};

		this.applyFrom = function (form) {
			for (let i = 0; i < this.weapons.length; ++i) {
				let weapon = this.weapons[i];
				if (!weapon) continue;

				weapon.customName = document.getElementById("weapon_" + i + "_name").value;

				let weapon_size = document.getElementById("weapon_" + i + "_size");
				weapon.selectedSize = Math.max(1, Math.round(weapon_size.value));
				if (isNaN(weapon.selectedSize)) weapon.selectedSize = 1;

				let weapon_amount = document.getElementById("weapon_" + i + "_amount");
				weapon.amount = Math.max(1, Math.round(weapon_amount.value));
				if (isNaN(weapon.amount)) weapon.amount = 1;

				let weapon_type = document.getElementById("weapon_" + i + "_type");
				weapon.type = weapon_types[weapon_type.options[weapon_type.selectedIndex].value];
				weapon.type_id = weapon_type.options[weapon_type.selectedIndex].value;
			}
		};

		this.updateForm = function (form) {
			for (i = 0; i < this.weapons.length; i++) {
				let weapon = this.weapons[i];
				if (!weapon) continue;

				document.getElementById("weapon_" + i + "_name").value = weapon.customName;

				document.getElementById("weapon_" + i + "_amount").value = weapon.amount;
				document.getElementById("weapon_" + i + "_size").value = weapon.siz();
				document.getElementById("weapon_" + i + "_size").disabled = weapon.hasFixedSize();

				let typeSelect = document.getElementById("weapon_" + i + "_type");
				let selectIndex = 0;
				for (let j = 0; j < typeSelect.options.length; ++j) {
					if (typeSelect.options[j].value == weapon.type_id)
						selectIndex = j;
				}
				typeSelect.selectedIndex = selectIndex;

				document.getElementById("weapon_" + i + "_use").value = weapon.use();

				document.getElementById("weapon_" + i + "_range").value = weapon.range();

				document.getElementById("weapon_" + i + "_damage").value = weapon.damage();
				document.getElementById("weapon_" + i + "_notes").firstChild.nodeValue = weapon.help();
				//document.getElementById("weapon_" + i + "_cost").value = weapon.cost();

			}

			document.getElementById("weapons_head").style.display = this.weaponCount() > 0 ? "table-row" : "none";
		};

		this.weaponCount = function () {
			let count = 0;
			for (i = 0; i < this.weapons.length; i++) {
				if (this.weapons[i]) count++;
			}
			return count;
		};
	}
};
