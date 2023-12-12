class Moc {
	constructor() {
		this.structure = new Structure(this);
		this.groundPropulsion = new GroundPropulsion(this);
		this.flyingPropulsion = new FlyingPropulsion(this);
		this.thrustPropulsion = new ThrustPropulsion(this);
		this.armament = new Armament(this);
		this.equipment = new Equipments(this);
		this.specialities = new Specialities(this);
		this.mind = new Mind(this);
		this.superNatural = new SuperNatural(this);
		this.power = 0;
		this.powerUsage = 0;
		this.cost = 0;
		this.name = "";
		this.color1 = "#6655aa";
		this.color2 = "#35ac0d";
		this.color3 = "#d10008";
		this.description = "";
	};

	calculateComponents(components) {
		components.forEach(component => component.calculate());
	}

	calculatePowerUsage() {
		this.powerUsage = this.armament.powerUsage + this.equipment.powerUsage;
	}

	calculateCost() {
		this.cost = this.structure.cost; // add other cost considerations here
	}

	calculate() {
		const components = [
			this.structure,
			this.groundPropulsion,
			this.flyingPropulsion,
			this.thrustPropulsion,
			this.armament,
			this.equipment,
			this.mind,
			this.superNatural,
			this.specialities
		];
		this.calculateComponents(components);

		this.power = Math.max(1, this.structure.size)*2; //Power scale
		if (!this.flyingPropulsion.active) {
			this.power *= 2;
		}

		this.calculatePowerUsage();
		this.calculateCost();
	}

	updateComponentFormData(form, components) {
		components.forEach(component => component.updateForm(form));
	}

	updateForm(form) {
		const components = [
			this.structure,
			this.groundPropulsion,
			this.flyingPropulsion,
			this.thrustPropulsion,
			this.armament,
			this.equipment,
			this.mind,
			this.superNatural,
			this.specialities
		];
		this.updateComponentFormData(form, components);

		form.total_cost.value = this.cost;

		// Add other form related updates here

		form.moc_name.value = this.name;
		form.moc_color1.value = this.color1;
		form.moc_color2.value = this.color2;
		form.moc_color3.value = this.color3;
		form.moc_description.value = this.description;
	}

	applyComponentDataFromForm(form, components) {
		components.forEach(component => component.applyFrom(form));
	}

	applyFrom(form) {
		const components = [
			this.structure,
			this.groundPropulsion,
			this.flyingPropulsion,
			this.thrustPropulsion,
			this.armament,
			this.equipment,
			this.mind,
			this.superNatural,
			this.specialities
		];
		this.applyComponentDataFromForm(form, components);

		this.name = form.moc_name.value;
		this.color1 = form.moc_color1.value;
		this.color2 = form.moc_color2.value;
		this.color3 = form.moc_color3.value;
		this.description = form.moc_description.value;
	}

	init(form) {
		this.calculate();
		this.updateForm(form);
	}
}