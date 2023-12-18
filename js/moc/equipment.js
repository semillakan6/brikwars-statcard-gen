let equipment_types = [
	{
		name: "Energy Shield",
		notes: "x energy shield dice",
		sizeCost: 1,
		baseCost: 0,
		usePower: true,
		remark: "The shield must be created by a Shield Projector somewhere on the surface of the Creation. (<a  target=\"_blank\" class=\"ref\" href=\"https://brikwars.com/rules/draft/f.htm#energyshields\">Chapter F: Field Hazards</a>)",
	},
	{
		name: "Armor Plating",
		notes: "Covered area is shielded",
		strength: 1,
		sizeCost: 1,
		baseCost: 1,
		armorPlate: true,
		remark: "No aerial flight or alternate forms of Movement possible. The cost of Move inches is doubled. (<a  target=\"_blank\" class=\"ref\" href=\"https://brikwars.com/rules/2020/3.htm#bodyarmor\">Chapter 3: Minifig Weapons</a>)",
	}
];

class Equipment {
	constructor(size) {
		this.typeId = 0;
		this.size = size;
		this.selectedStrength = 1;

		this.cost = function () {
			return (equipment_types[this.typeId].sizeCost * this.size + equipment_types[this.typeId].baseCost) * this.strength();
		};

		this.hasFixedStrength = function () {
			return !!equipment_types[this.typeId].strength;
		};

		this.name = function () {
			return equipment_types[this.typeId].name;
		};

		this.strength = function () {
			if (this.hasFixedStrength())
				return equipment_types[this.typeId].strength;

			else
				return this.selectedStrength;
		};

		this.usePower = function () {
			return equipment_types[this.typeId].usePower;
		};

		this.remark = function () {
			return equipment_types[this.typeId].remark;
		};

		this.isArmorPlate = function () {
			return equipment_types[this.typeId].armorPlate;
		};
	}
};

function Equipments(moc) {
	this.moc = moc;
	this.cost = 0;
	this.powerUsage = 0;
	this.stuff = new Array();

	this.getEquipmentByTypes = function () {
		var result = [];

		for (var i = 0; i < this.stuff.length; i++) {
			var equipment = this.stuff[i];
			if (!equipment) continue;

			var found = false;
			for (var j = 0; j < result.length; ++j) {
				if (equipment.typeId == result[j][0].typeId) {
					result[j].push(equipment);
					found = true;
				}
			}
			if (!found) {
				result.push([equipment]);
			}
		}
		return result;
	}

	this.init = function () {
		var equipment = document.getElementById("equipment");
		while (equipment.firstChild) {
			equipment.removeChild(equipment.firstChild);
		};
	};
	this.init();

	this.add = function () {
		const index = this.stuff.push(new Equipment(this.moc.structure.size)) - 1;

		appendElements("equipment", createTableRow(index), createSecondRow(index));
	};


	function createSelectElement(index, equipmentTypes) {
		const selectElement = document.createElement("select");
	
		selectElement.id = `equipment_${index}_type`;
		selectElement.onchange = calculate;
		selectElement.onkeyup = calculate;
		// Add Bootstrap classes to the select element
		selectElement.classList.add('form-select');
	
		equipmentTypes.forEach((equipmentType, i) => {
			let option = document.createElement("option");
			option.text = equipmentType.name;
			option.value = i;
	
			selectElement.appendChild(option);
		});
	
		return selectElement;
	}
	
	
	function createInputElement(type, index) {
		const inputElement = document.createElement("input");
		
		if(type == 'notes'){
			inputElement.type = "text";
		} else {
			inputElement.type = "number";
		}
		inputElement.id = `equipment_${index}_${type}`;
		inputElement.min = 1;
		inputElement.step = 1;
		inputElement.size = 1;
		inputElement.onkeyup = calculate;
		inputElement.onchange = calculate;
	
		// Add Bootstrap classes to the input element. 'addClass' is jQuery, 'classList.add' is plain JS
		inputElement.classList.add('form-control');
	
		return inputElement;
	}


	function createButton(index) {
		const button = document.createElement("button");
	
		let icon = document.createElement("i");
		icon.classList.add('fas', 'fa-times');  // Add FontAwesome icon classes
	
		button.appendChild(icon);               // Append icon to the button
		
		button.type = "button";
		button.id = `equipment_${index}_remove`;
		button.classList.add('btn', 'btn-outline-dark', 'btn-sm');  // Add Bootstrap classes
		button.onclick = function () {
			moc.equipment.remove(index);
			calculate();
		};
	
		return button;
	}


	function createCell(elementToAppend) {
		const cell = document.createElement("td");
		cell.appendChild(elementToAppend);
		return cell;
	}


	function createTableRow(index) {
		const row = document.createElement("tr");

		row.id = `equipment_${index}`;
		row.className = "first";
		row.append(
			createCell(createSelectElement(index, equipment_types)),
			createCell(createInputElement("size", index)),
			createCell(createInputElement("strength", index)),
			createCell(createInputElement("notes", index)),
			createCell(createButton(index)),
			createCell(createCostCell(index))
		);

		return row;
	}


	function createSecondRow(index) {
		const row = document.createElement("tr");
		const remarkCell = document.createElement("td");
		const otherCell = document.createElement("td");

		row.className = "second";

		remarkCell.id = `equipment_${index}_remark`;
		remarkCell.appendChild(document.createTextNode(" "));
		remarkCell.className = "help";
		remarkCell.colSpan = 5;

		otherCell.className = "cost";

		row.append(remarkCell, otherCell);

		return row;
	}


	function createCostCell(index) {
		const costCell = document.createElement("td");
		const costInput = document.createElement("input");

		costCell.className = "cost";

		costInput.disabled = true;
		costInput.size = 1;
		costInput.type = "hidden";
		costInput.id = `equipment_${index}_cost`;

		costCell.appendChild(costInput);

		return costCell;
	}


	function appendElements(elementId, ...elements) {
		elements.forEach(element => document.getElementById(elementId).appendChild(element));
	}

	this.remove = function (i) {
		this.stuff[i] = null;

		var node = document.getElementById("equipment_" + i);
		node.parentNode.removeChild(node);
		node = document.getElementById("equipment_" + i + "_remark");
		node.parentNode.parentNode.removeChild(node.parentNode);
	};

	this.calculate = function () {
		this.cost = 0;
		this.powerUsage = 0;
		for (var i = 0; i < this.stuff.length; ++i) {
			var equipment = this.stuff[i];
			if (!equipment) continue;

			this.cost += equipment.cost();
			if (equipment.usePower())
				this.powerUsage += equipment.strength();
		}
	};

	this.updateForm = function (form) {
		for (i = 0; i < this.stuff.length; i++) {
			var equipment = this.stuff[i];
			if (!equipment) continue;

			document.getElementById("equipment_" + i + "_size").value = equipment.size;
			var strengthInput = document.getElementById("equipment_" + i + "_strength");
			strengthInput.value = equipment.strength();
			strengthInput.max = equipment.size;
			strengthInput.disabled = equipment.hasFixedStrength();
			document.getElementById("equipment_" + i + "_type").selectedIndex = equipment.typeId;
			document.getElementById("equipment_" + i + "_cost").value = equipment.cost();

			document.getElementById("equipment_" + i + "_notes").value = (equipment.hasFixedStrength() ? "" : equipment.strength()) + equipment_types[equipment.typeId].notes;

			document.getElementById("equipment_" + i + "_remark").innerHTML = equipment.remark();
		}
		document.getElementById("equipment_head").style.display = this.equipmentCount() > 0 ? "table-row" : "none";
	};

	this.applyFrom = function (form) {
		for (var i = 0; i < this.stuff.length; ++i) {
			var equipment = this.stuff[i];
			if (!equipment) continue;

			var size = document.getElementById("equipment_" + i + "_size").value;
			size = Math.max(1, Math.round(size));
			if (isNaN(size)) size = 1;
			equipment.size = size;

			var strength = document.getElementById("equipment_" + i + "_strength").value;
			strength = Math.min(size, Math.max(1, Math.round(strength)));
			if (isNaN(strength)) strength = 1;
			equipment.selectedStrength = strength;

			var equipment_type = document.getElementById("equipment_" + i + "_type");
			equipment.typeId = equipment_type.options[equipment_type.selectedIndex].value;
		}
	};

	this.equipmentCount = function () {
		var count = 0;
		for (i = 0; i < this.stuff.length; i++) {
			if (this.stuff[i]) count++;
		}
		return count;
	};

	this.hasArmorPlating = function () {
		for (i = 0; i < this.stuff.length; i++) {
			var equipment = this.stuff[i];
			if (!equipment) continue;

			if (equipment.isArmorPlate())
				return true;
		}
		return false;
	};

	this.hasDeflection = function () {
		if (document.getElementById('deflectionCheck').checked) {
			return true;
		}
		return false;
	};

	this.getEnergyShieldStrength = function () {
		var count = 0;
		for (i = 0; i < this.stuff.length; i++) {
			var equipment = this.stuff[i];
			if (!equipment) continue;

			if (equipment.name() == "Energy Shield")
				count += equipment.strength();
		}
		return count;
	}

};