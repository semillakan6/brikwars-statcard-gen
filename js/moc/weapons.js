
var weapon_help =
{
	Weapon:"Size is measured along the muzzle/blade, thickness does not count. Round up- or downward according to preference.",
	Explosive:"Size is measured in construction bricks. A launcher can only shoot explosives up to its own size in inches.",
};

var weapon_types = 
[
	{
		name:"Gun",
		category:"Weapon",
		sizeCost: 3,
		baseCost: 0,
		sizeUse: 1,
		baseUse: 2,
		sizeRange: 4,
		baseRange: 2,
		damage: "d6",
		damageMulSize: true,
		usePower: true,
		notes:"-"
	},
	{
		name:"Blast Gun",
		category:"Weapon",
		sizeCost: 3,
		baseCost: 0,
		sizeUse: 1,
		baseUse: 1,
		sizeRange: 2,
		baseRange: 2,
		damage: "d8 - (distance)",
		damageMulSize: true,
		usePower: true,
		notes:"1 Firing Arc, no Auto Penalty, Target size modifiers affect Damage"
	},
	{
		name:"Machine Gun",
		category:"Weapon",
		sizeCost: 4,
		baseCost: 0,
		sizeUse: 1,
		baseUse: 2,
		sizeRange: 3,
		baseRange: 2,
		damage: "d6",
		damageMulSize: true,
		usePower: true,
		notes:"-1 Auto Penalty per Arc or Burst, may require Reload"
	},
	{
		name:"Flame Thrower",
		category:"Weapon",
		sizeCost: 3,
		baseCost: 0,
		sizeUse: 1,
		baseUse: 1,
		sizeRange: 2,
		baseRange: 2,
		damage: "d4 Fire",
		damageMulSize: true,
		usePower: true,
		notes:"min. 1 Firing Arc, -1 Auto Penalty per Arc, Target size modifiers affect Damage "
	},
	{
		name:"Cannon",
		category:"Weapon",
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
		name:"Launcher",
		category:"Weapon",
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
		name:"Melee Weapon",
		category:"Weapon",
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
		name:"Melee Shield",
		category:"Weapon",
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
		name:"Tool",
		category:"Weapon",
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
		name:"Explosive",
		category:"Explosive",
		sizeCost: 1,
		baseCost: 0,
		sizeUse: 0,
		baseUse: "-",
		sizeRange: 0,
		baseRange: "-",
		damage: "d10 Explosion",
		damageMulSize: true,
		usePower: false,
		notes: "ranged stats are determined by Launcher or Cannon, if any"
	},
	{
		name:"Rocket",
		category:"Explosive",
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
		name:"Long-Ranged Weapon",
		category:"Weapon",
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
		name:"ShotGun",
		category:"Weapon",
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
		name:"AutoGun",
		category:"Weapon",
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
		name:"FlameGun",
		category:"Weapon",
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
		name:"Bazooka",
		category:"Weapon",
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
		name:"RailGun",
		category:"Weapon",
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
		name:"Heavy Weapon",
		category:"Weapon",
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
		name:"Two-Handed Weapon",
		category:"Weapon",
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
		name:"Heavy Shield",
		category:"Weapon",
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
	
];


function Weapon(type_id, selectedSize)
{
	this.type = weapon_types[type_id];
	this.type_id = type_id;
	this.selectedSize = selectedSize;
	this.customName = "";
	this.amount = 1;
	
	this.hasFixedSize = function()
	{
		return !!(this.type.size);
	};

	this.name = function()
	{
		if(this.customName && this.customName.length > 0)
			return this.customName;
		return this.type.name;
	};
	
	this.siz = function()
	{
		return this.hasFixedSize() ? this.type.size : this.selectedSize;
	};
	
	this.power = function()
	{
		return this.type.usePower ? this.siz() * this.amount : 0;
	};
	
	this.cost = function()
	{
		return (this.type.sizeCost * this.siz() + this.type.baseCost) * this.amount;
	};
	
	this.use = function()
	{
		if(isNaN(parseInt(this.type.baseUse)))
			return this.type.baseUse;
			
		return this.type.sizeUse * this.siz() + this.type.baseUse;
	};
	
	this.range = function()
	{
		if(isNaN(parseInt(this.type.baseRange)))
			return this.type.baseRange;

		return this.type.sizeRange * this.siz() + this.type.baseRange;
	};
	
	this.damage = function()
	{
		var addSize = this.type.damageAddSize ? this.siz() : "";
		var damage = this.type.damage;
		if(this.type.damageMulSize && this.siz() > 1)
			damage = damage.replace("die", "dice");
		
		if(this.type.damageMulSize)
			return this.siz() + damage + addSize;
		else
			return damage + addSize;
	};
	
	this.notes = function()
	{
		return this.type.notes;
	};
	
	this.help = function()
	{
		return weapon_help[this.type.category];
	};
	
	this.isIdenticalTo = function( weapon )
	{
		var typeEqual = this.type_id == weapon.type_id;
		var sizeEqual = this.siz() == weapon.siz();
		var nameEqual = this.customName == weapon.customName;
		return typeEqual && sizeEqual && nameEqual;
	}
};

function Armament(moc)
{
	this.weapons = new Array();
	this.cost = 0;
	this.powerUsage = 0;
	this.moc = moc;
	
	this.init = function()
	{
		var weapons_node = document.getElementById("weapons");
		while (weapons_node.firstChild)
		{
			weapons_node.removeChild(weapons_node.firstChild);
		}
	};
	this.init();
	
	this.getWeaponsWithCounts = function()
	{
		var result = [];
		
		for(var i=0; i < this.weapons.length; ++i)
		{
			var weap = this.weapons[i];
			if(!weap) continue;
		
			var found = false;
			for(var j=0; j < result.length; ++j)
			{
				if(weap.isIdenticalTo(result[j].weapon))
				{
					result[j].count += weap.amount;
					found = true;
				}
			}
			if(!found)
			{
				result.push({weapon:weap, count:weap.amount});
			}
		}
		return result;
	}
	
	this.add = function()
	{
		var i = this.weapons.push(new Weapon(0, this.moc.structure.size)) - 1;
		
		var typeSelect = document.createElement("select");
		typeSelect.style.width = "105pt";
		typeSelect.id = "weapon_"+i+"_type";
		typeSelect.onchange = function() { calculate(); };
//		typeSelect.onmousemove = function() { calculate(); };
		typeSelect.onkeyup = function() { calculate(); };

		var minifigWeapons = document.forms[0].weapons_minifigs.checked;
		
		for(j=0; j<weapon_types.length; j++) {
			var weapon_type = weapon_types[j];
			if(weapon_type.forMinifigs ? !minifigWeapons : minifigWeapons) continue;
			
			var option = document.createElement("option");
			option.text = weapon_type.name;
			option.value = j;
			typeSelect.appendChild(option);
		}
		
		var typeCell = document.createElement("td");
		typeCell.appendChild(typeSelect);
		
		var nameInput = document.createElement("input");
		nameInput.id = "weapon_"+i+"_name";
		nameInput.style.width = "75pt";
		nameInput.onkeyup = function() { calculate() };
		nameInput.onchange = function() { calculate() };
		var nameCell = document.createElement("td");
		nameCell.appendChild(nameInput);
		
		var sizeInput = document.createElement("input");
		sizeInput.type = "number";
		sizeInput.id = "weapon_"+i+"_size";
		sizeInput.min = 1;
		sizeInput.step = 1;
		sizeInput.size = 1;
//		sizeInput.onclick = function(evt) { evt.target.select(); };
		sizeInput.onkeyup = function() { calculate() };
		sizeInput.onchange = function() { calculate() };
		var sizeCell = document.createElement("td");
		sizeCell.appendChild(sizeInput);
	
		var amountCell = document.createElement("td");
		var amountInput = document.createElement("input");
		amountInput.size = 1;
		amountInput.min = 1;
		amountInput.step = 1;
		amountInput.type = "number";
		amountInput.onkeyup = function() { calculate() };
		amountInput.onchange = function() { calculate() };
		amountInput.id = "weapon_"+i+"_amount";
		amountCell.appendChild(amountInput);
	
		var useCell = document.createElement("td");
		var useInput = document.createElement("input");
		useInput.size = 1;
		useInput.type = "text";
		useInput.disabled = true;
		useInput.id = "weapon_"+i+"_use";
		useCell.appendChild(useInput);
		
		var rangeCell = document.createElement("td");
		var rangeInput = document.createElement("input");
		rangeInput.size = 1;
		rangeInput.type = "text";
		rangeInput.disabled = true;
		rangeInput.id = "weapon_"+i+"_range";
		rangeCell.appendChild(rangeInput);
		
		var damageCell = document.createElement("td");
		var damageInput = document.createElement("input");
		damageInput.disabled = true;
		damageInput.style.width = "105pt";
		damageInput.id = "weapon_"+i+"_damage";
		damageCell.appendChild(damageInput);
		
		var button = document.createElement("input");
		button.type = "button";
		button.value = "X";
		button.id = "weapon_"+i+"_remove";
		button.onclick = function() { moc.armament.remove(i); calculate(); };
		
		var removeCell = document.createElement("td");
		removeCell.appendChild(button);
	
		var costCell = document.createElement("td");
		costCell.className = "cost";
		var costInput = document.createElement("input");
		costInput.disabled = true;
		costInput.size = 1;
		costInput.type = "text";
		costInput.id = "weapon_"+i+"_cost";
		costCell.appendChild(costInput);
	
		var row = document.createElement("tr");
		row.id = "weapon_"+i;
		row.className = "first";
		row.appendChild(typeCell);
		row.appendChild(sizeCell);
		row.appendChild(amountCell);
		row.appendChild(nameCell);
		row.appendChild(useCell);
		row.appendChild(rangeCell);
		row.appendChild(damageCell);
		row.appendChild(removeCell);
		row.appendChild(costCell);

		var notesCell = document.createElement("td");
		notesCell.id = "weapon_"+i+"_notes";
		notesCell.appendChild(document.createTextNode(" "));
		notesCell.className = "help";
		notesCell.colSpan = 8;
		
		var otherCell = document.createElement("td");
		otherCell.className = "cost";
		
		var row2 = document.createElement("tr");
		row2.className = "second";
		row2.appendChild(notesCell);
		row2.appendChild(otherCell);
				
		document.getElementById("weapons").appendChild(row);
		document.getElementById("weapons").appendChild(row2);
		
	};
	
	this.remove = function(i)
	{
		this.weapons[i] = null;
		
		var node = document.getElementById("weapon_"+i);
		node.parentNode.removeChild(node);
		node = document.getElementById("weapon_"+i+"_notes");
		node.parentNode.parentNode.removeChild(node.parentNode);
	};
	
	this.calculate = function()
	{
		this.cost = 0;
		this.powerUsage = 0;
		for(var i=0; i<this.weapons.length; ++i)
		{
			var weapon = this.weapons[i];
			if(!weapon) continue;
			
			this.cost += weapon.cost();
			this.powerUsage += weapon.power();
		}
	};
	
	this.applyFrom = function(form)
	{
		for(var i=0; i<this.weapons.length; ++i)
		{
			var weapon = this.weapons[i];
			if(!weapon) continue;
			
			weapon.customName = document.getElementById("weapon_"+i+"_name").value;
			
			var weapon_size = document.getElementById("weapon_"+i+"_size");
			weapon.selectedSize = Math.max(1,Math.round(weapon_size.value));
			if(isNaN(weapon.selectedSize)) weapon.selectedSize = 1;
			
			var weapon_amount = document.getElementById("weapon_"+i+"_amount");
			weapon.amount = Math.max(1,Math.round(weapon_amount.value));
			if(isNaN(weapon.amount)) weapon.amount = 1;
			
			var weapon_type = document.getElementById("weapon_"+i+"_type");
			weapon.type = weapon_types[weapon_type.options[weapon_type.selectedIndex].value];
			weapon.type_id = weapon_type.options[weapon_type.selectedIndex].value;
		}
	};
	
	this.updateForm = function(form)
	{
		for(i=0;i<this.weapons.length;i++)
		{
			var weapon = this.weapons[i];
			if(!weapon) continue;
			
			document.getElementById("weapon_"+i+"_name").value = weapon.customName;
			
			document.getElementById("weapon_"+i+"_amount").value = weapon.amount;
			document.getElementById("weapon_"+i+"_size").value = weapon.siz();
			document.getElementById("weapon_"+i+"_size").disabled = weapon.hasFixedSize();
			
			var typeSelect = document.getElementById("weapon_"+i+"_type");
			var selectIndex = 0;
			for(var j=0; j<typeSelect.options.length; ++j)
			{
				if(typeSelect.options[j].value == weapon.type_id)
					selectIndex = j;
			}
			typeSelect.selectedIndex = selectIndex;
			
			document.getElementById("weapon_"+i+"_use").value = weapon.use();
			
			document.getElementById("weapon_"+i+"_range").value = weapon.range();
			
			document.getElementById("weapon_"+i+"_damage").value = weapon.damage();
			document.getElementById("weapon_"+i+"_notes").firstChild.nodeValue = weapon.help();
			document.getElementById("weapon_"+i+"_cost").value = weapon.cost();
			
		}
		
		document.getElementById("weapons_head").style.display = this.weaponCount() > 0 ? "table-row" : "none";
	};
	
	this.weaponCount = function()
	{
		var count = 0;
		for(i=0;i<this.weapons.length;i++)
		{
			if(this.weapons[i]) count++;
		}
		return count;
	};
};
