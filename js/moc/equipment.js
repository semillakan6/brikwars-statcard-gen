equipment_types = [
	{
		name: "Energy Shield",
		notes: "x energy shield dice",
		sizeCost: 1,
		baseCost: 0,
		usePower: true,
		remark: "The shield must be created by a Shield Projector somewhere on the surface of the Creation. (<a  target=\"_blank\" class=\"ref\" href=\"http://www.brikwars.com/rules/2010/8#5.htm\">Chapter 8: Field Hazards</a>)",
	},
	{
		name: "Armor Plating",
		notes: "Covered area is shielded",
		strength: 1,
		sizeCost: 1,
		baseCost: 1,
		armorPlate: true,
		remark: "No aerial flight or alternate forms of Movement possible. The cost of Move inches is doubled. (<a  target=\"_blank\" class=\"ref\" href=\"http://www.brikwars.com/rules/2010/8#2.htm\">Chapter 8: Basic Weapons</a>)",
	}
];

function Equipment(size)
{
	this.typeId = 0;
	this.size = size;
	this.selectedStrength = 1;

	this.cost = function()
	{
		return (equipment_types[this.typeId].sizeCost * this.size + equipment_types[this.typeId].baseCost ) * this.strength();
	};
	
	this.hasFixedStrength = function()
	{
		return !!equipment_types[this.typeId].strength
	};
	
	this.name = function()
	{
		return equipment_types[this.typeId].name;
	}
	
	this.strength = function()
	{
		if(this.hasFixedStrength())
			return equipment_types[this.typeId].strength;
		else
			return this.selectedStrength;
	};
	
	this.usePower = function()
	{
		return equipment_types[this.typeId].usePower;
	};
	
	this.remark = function()
	{
		return equipment_types[this.typeId].remark;
	};
	
	this.isArmorPlate = function()
	{
		return equipment_types[this.typeId].armorPlate;
	};
};

function Equipments(moc)
{
	this.moc = moc;
	this.cost = 0;
	this.powerUsage = 0;
	this.stuff = new Array();
	
	this.getEquipmentByTypes = function()
	{
		var result = [];
	
		for(var i=0; i<this.stuff.length; i++)
		{
			var equipment = this.stuff[i];
			if(!equipment) continue;
			
			var found = false;
			for(var j=0; j < result.length; ++j)
			{
				if(equipment.typeId == result[j][0].typeId)
				{
					result[j].push(equipment);
					found = true;
				}
			}
			if(!found)
			{
				result.push([equipment]);
			}
		}
		return result;
	}
	
	this.init = function()
	{
		var equipment = document.getElementById("equipment");
		while (equipment.firstChild)
		{
			equipment.removeChild(equipment.firstChild);
		};
	};
	this.init();
	
	this.add = function()
	{
		var i = this.stuff.push(new Equipment(this.moc.structure.size)) - 1;
		
		var typeSelect = document.createElement("select");
		typeSelect.id = "equipment_"+i+"_type";
		typeSelect.onchange = function() { calculate(); };
//		typeSelect.onmousemove = function() { calculate(); };
		typeSelect.onkeyup = function() { calculate(); };

		for(j=0;j<equipment_types.length;j++) {
		
			var equipment_type = equipment_types[j];
			var option = document.createElement("option");
			option.text = equipment_type.name;
			option.value = j;
			typeSelect.appendChild(option);
		}
		
		var typeCell = document.createElement("td");
		typeCell.appendChild(typeSelect);
		
		var sizeInput = document.createElement("input");
		sizeInput.type = "number";
		sizeInput.id = "equipment_"+i+"_size";
		sizeInput.min = 1;
		sizeInput.step = 1;
		sizeInput.size = 1;
		//sizeInput.onclick = function(evt) { evt.target.select(); };
		sizeInput.onkeyup = function() { calculate() };
		sizeInput.onchange = function() { calculate() };
		var sizeCell = document.createElement("td");
		sizeCell.appendChild(sizeInput);

		var strengthInput = document.createElement("input");
		strengthInput.type = "number";
		strengthInput.id = "equipment_"+i+"_strength";
		strengthInput.min = 1;
		strengthInput.step = 1;
		strengthInput.size = 1;
		//strengthInput.onclick = function(evt) { evt.target.select(); };
		strengthInput.onkeyup = function() { calculate() };
		strengthInput.onchange = function() { calculate() };
		var strengthCell = document.createElement("td");
		strengthCell.appendChild(strengthInput);
		
		var notesInput = document.createElement("input");
		notesInput.disabled = true;
		notesInput.id = "equipment_"+i+"_notes";
		notesInput.style.width = "180pt";
		var notesCell = document.createElement("td");
		notesCell.appendChild(notesInput);
		
		var button = document.createElement("input");
		button.type = "button";
		button.value = "X";
		button.id = "equipment_"+i+"_remove";
		button.onclick = function() { moc.equipment.remove(i); calculate(); };
		
		var removeCell = document.createElement("td");
		removeCell.appendChild(button);
	
		var costCell = document.createElement("td");
		costCell.className = "cost";
		var costInput = document.createElement("input");
		costInput.disabled = true;
		costInput.size = 1;
		costInput.type = "text";
		costInput.id = "equipment_"+i+"_cost";
		costCell.appendChild(costInput);
	
		var row = document.createElement("tr");
		row.id = "equipment_"+i;
		row.className = "first";
		row.appendChild(typeCell);
		row.appendChild(sizeCell);
		row.appendChild(strengthCell);
		row.appendChild(notesCell);
		row.appendChild(removeCell);
		row.appendChild(costCell);
		
		var row2 = document.createElement("tr");
		row2.className = "second";
		var remarkCell = document.createElement("td");
		remarkCell.id = "equipment_"+i+"_remark";
		remarkCell.appendChild(document.createTextNode(" "));
		remarkCell.className = "help";
		remarkCell.colSpan = 5;
		
		var otherCell = document.createElement("td");
		otherCell.className = "cost";
		row2.appendChild(remarkCell);
		row2.appendChild(otherCell);
		
		document.getElementById("equipment").appendChild(row);
		document.getElementById("equipment").appendChild(row2);
		
	};
	
	this.remove = function(i)
	{
		this.stuff[i] = null;
		
		var node = document.getElementById("equipment_"+i);
		node.parentNode.removeChild(node);
		node = document.getElementById("equipment_"+i+"_remark");
		node.parentNode.parentNode.removeChild(node.parentNode);
	};
	
	this.calculate = function()
	{
		this.cost = 0;
		this.powerUsage = 0;
		for(var i=0; i<this.stuff.length; ++i)
		{
			var equipment = this.stuff[i];
			if(!equipment) continue;
			
			this.cost += equipment.cost();
			if(equipment.usePower())
				this.powerUsage += equipment.strength();
		}
	};
	
	this.updateForm = function(form)
	{	
		for(i=0;i<this.stuff.length;i++)
		{
			var equipment = this.stuff[i];
			if(!equipment) continue;
			
			document.getElementById("equipment_"+i+"_size").value = equipment.size;
			var strengthInput = document.getElementById("equipment_"+i+"_strength");
			strengthInput.value = equipment.strength();
			strengthInput.max = equipment.size;
			strengthInput.disabled = equipment.hasFixedStrength();
			document.getElementById("equipment_"+i+"_type").selectedIndex = equipment.typeId;
			document.getElementById("equipment_"+i+"_cost").value = equipment.cost();
			
			document.getElementById("equipment_"+i+"_notes").value = (equipment.hasFixedStrength() ? "" : equipment.strength()) + equipment_types[equipment.typeId].notes;
			
			document.getElementById("equipment_"+i+"_remark").innerHTML = equipment.remark();
		}
		document.getElementById("equipment_head").style.display = this.equipmentCount() > 0 ? "table-row" : "none";
	};
	
	this.applyFrom = function(form)
	{
		for(var i=0; i<this.stuff.length; ++i)
		{
			var equipment = this.stuff[i];
			if(!equipment) continue;
			
			var size = document.getElementById("equipment_"+i+"_size").value;
			size = Math.max(1,Math.round(size));
			if(isNaN(size)) size = 1;
			equipment.size = size;

			var strength = document.getElementById("equipment_"+i+"_strength").value;
			strength = Math.min(size, Math.max(1,Math.round(strength)));
			if(isNaN(strength)) strength = 1;
			equipment.selectedStrength = strength;
			
			var equipment_type = document.getElementById("equipment_"+i+"_type");
			equipment.typeId = equipment_type.options[equipment_type.selectedIndex].value;
		}
	};
	
	this.equipmentCount = function()
	{
		var count = 0;
		for(i=0;i<this.stuff.length;i++)
		{
			if(this.stuff[i]) count++;
		}
		return count;
	};
	
	this.hasArmorPlating = function()
	{
		for(i=0;i<this.stuff.length;i++)
		{
			var equipment = this.stuff[i];
			if(!equipment) continue;
			
			if(equipment.isArmorPlate())
				return true;
		}
		return false;
	};

	this.getEnergyShieldStrength = function()
	{
		var count = 0;
		for(i=0;i<this.stuff.length;i++)
		{
			var equipment = this.stuff[i];
			if(!equipment) continue;
			
			if(equipment.name() == "Energy Shield")
				count += equipment.strength();
		}
		return count;
	}
	
};