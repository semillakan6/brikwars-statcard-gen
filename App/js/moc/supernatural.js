const superNaturalDice_types = [
	{
		name: "Fire",
		die: "d4",
		cost: 0.5,
		note: "Variants: Acid, Poison, Disease. Note: Used for Fire and other continuing damage."
	},
	{
		name: "Earth",
		die: "d6",
		cost: 1,
		note: "Variants: Bone, Plastic, Wood."
	},
	{
		name: "Air",
		die: "d8",
		cost: 1,
		note: "Variants: Smoke, Wind, Knowledge, Breath. Notes: may add +1 Firing Arc when used for Range, +1 Firing Arc and Blast Damage when used for Damage."
	},
	{
		name: "Metal",
		die: "d10",
		cost: 2,
		note: "Variants: Explosions, Glory. Notes: can add or subtract levels of Weight, adds +2'' radius to any Effect."
	},
	{
		name: "Magik",
		die: "d12",
		cost: 2,
		note: "Variants: Energy, Humanity. Notes: Ignores obstacles when used for Range, ignores Deflection when used for Damage."
	},
	{
		name: "Water",
		die: "d20",
		cost: "N/A",
		disabled: true,
		note: "Variants: Chaos, Extradimensional Geometry. Notes: Only availlable to BrikkThulhu."
	},
];

class FuzzyDice {
	constructor(typeId = 0, amount = 1, diceTypes) {
		this.typeId = typeId;
		this.amount = amount;
		this.diceTypes = diceTypes;
	}

	cost() {
		return this.diceTypes[this.typeId].cost * this.amount;
	}

	note() {
		return this.diceTypes[this.typeId].note;
	}

	name() {
		return this.diceTypes[this.typeId].name;
	}

	die() {
		return this.diceTypes[this.typeId].die;
	}
}

class SuperNaturalDie extends FuzzyDice {
	constructor(typeId = 0, amount = 1) {
		super(typeId, amount, superNaturalDice_types);
	}

	static applyFrom(die, i) {
		let amount = document.getElementById(`supernatural_dice_${i}_amount`).value;
		amount = Math.max(1, Math.round(amount));
		if (isNaN(amount)) amount = 1;
		die.amount = amount;

		const die_type = document.getElementById(`supernatural_dice_${i}_type`);
		die.typeId = die_type.options[die_type.selectedIndex].value;
	}
}

class SuperNatural {
	constructor(moc) {
		this.moc = moc;
		this.active = false;
		this.cost = 0;
		this.dice = [];
		this.init();
	}

	init() {
		const dice_node = document.getElementById("supernatural_dice");
		while (dice_node.firstChild) {
			dice_node.removeChild(dice_node.firstChild);
		}
	}

	getDieTypes() {
		return this.dice.filter(die => die);
	}

	getDiceCount() {
		return this.getDieTypes().reduce((acc, curr) => acc + curr.amount, 0);
	}

	addIfEmpty() {
		if (!this.getDiceCount()) this.add();
	}

	add() {
		const i = this.dice.push(new SuperNaturalDie()) - 1;
		const enabled = this.getFreeDiceTypeIds();

		const typeSelect = this.createSelect(i, enabled);
		const amountInput = this.createInput(i);
		const notesInput = this.createNotesInput(i);
		const button = this.createButton(i);
		const costInput = this.createCostInput(i);

		this.append('type', typeSelect, i);
		this.append('amount', amountInput, i);
		this.append('notes', notesInput, i);
		this.append('btn', button, i);
		this.append('cost', costInput, i);
	}

	remove(i) {
		this.dice[i] = null;
		document.getElementById(`supernatural_dice_${i}`).remove();
	}

	calculate() {
		if (this.active) {
			this.cost = this.getDieTypes().reduce((acc, curr) => acc + curr.cost(), 0);
		} else {
			this.cost = 0;
		}
	}

	getFreeDiceTypeIds() {
		return superNaturalDice_types.reduce(
			(acc, curr, i) => !curr.disabled && this.dice.every(die => die.typeId !== i) ? { ...acc, [i]: true } : acc, {});
	}

	updateForm(form) {
		form.supernatural.checked = this.active;
		this.setVisibility('more', this.active);
		this.setVisibility('dice', this.active);
		this.setVisibility('header', this.active && this.supernaturalCount() > 0);

		this.getDieTypes().forEach((die, i) => this.updateDieInfo(die, i));
		this.toggleAddBtn(form);

	}

	applyFrom(form) {
		this.active = form.supernatural.checked;
		this.getDieTypes().forEach((die, i) => SuperNaturalDie.applyFrom(die, i));
	}

	supernaturalCount() {
		return this.dice.filter(die => die).length;
	}

	// Helper Methods
	createSelect(i, enabled) {
		const typeSelect = document.createElement("select");
		typeSelect.id = `supernatural_dice_${i}_type`;
		typeSelect.className = "form-select"; // Bootstrap class
		typeSelect.onchange = () => calculate();
		typeSelect.onkeyup = () => calculate();

		superNaturalDice_types.forEach((die_type, j) => {
			const option = document.createElement("option");
			option.text = `${die_type.die} (${die_type.name})`;
			option.value = j;

			if (j in enabled) {
				option.disabled = false;
				this.dice[i].typeId = j;
			} else {
				option.disabled = true;
			}

			typeSelect.appendChild(option);
		});

		return typeSelect;
	}

	createInput(i) {
		const amountInput = document.createElement("input");
		amountInput.type = "number";
		amountInput.id = `supernatural_dice_${i}_amount`;
		amountInput.className = "form-control"; // Bootstrap class
		amountInput.min = 1;
		amountInput.step = 1;
		amountInput.onkeyup = () => calculate();
		amountInput.onchange = () => calculate();
	
		return amountInput;
	}

	createNotesInput(i) {
		const notesInput = document.createElement("input");
		notesInput.disabled = true;
		notesInput.id = `supernatural_dice_${i}_notes`;
		notesInput.className = "form-control"; // Bootstrap class
	
		return notesInput;
	}

	createButton(i) {
		const button = document.createElement("button");
		button.type = "button";
		button.id = `supernatural_dice_${i}_remove`;
		button.className = "btn btn-danger"; // Bootstrap classes
		button.innerHTML = `<i class="fas fa-times"></i>`; // Font Awesome icon
		button.onclick = () => {
			this.remove(i);
			calculate();
		};
	
		return button;
	}

	createCostInput(i) {
		const costInput = document.createElement("input");
		costInput.disabled = true;
		costInput.id = `supernatural_dice_${i}_cost`;
		costInput.type = "text";
		costInput.className = "form-control"; // Bootstrap class
	
		return costInput;
	}

	append(name, element, i) {
		const cell = document.createElement("td");
		cell.appendChild(element);
		if (name === 'cost') cell.className = "cost";
		const row = this.getRow(i);
		row.appendChild(cell);
		document.getElementById("supernatural_dice").appendChild(row);
	}

	getRow(i) {
		let row = document.getElementById(`supernatural_dice_${i}`);
		if (!row) {
			row = document.createElement("tr");
			row.id = `supernatural_dice_${i}`;
		}
		return row;
	}

	setVisibility(id, value) {
		document.getElementById(`supernatural_${id}`).style.display = value ? "table-row-group" : "none";
	}

	updateDieInfo(die, i) {
		document.getElementById(`supernatural_dice_${i}_amount`).value = die.amount;
		document.getElementById(`supernatural_dice_${i}_type`).selectedIndex = die.typeId;
		document.getElementById(`supernatural_dice_${i}_cost`).value = die.cost();
		document.getElementById(`supernatural_dice_${i}_notes`).value = die.note();

		const enabled = this.getFreeDiceTypeIds();
		enabled[die.typeId] = true;

		const options = document.getElementById(`supernatural_dice_${i}_type`).options;
		for (let j = 0; j < options.length; j++) {
			options[j].disabled = !(options[j].value in enabled);
		}
	}

	toggleAddBtn(form) {
		form.supernatural_add.disabled = !(Object.keys(this.getFreeDiceTypeIds()).length);
	}
}

