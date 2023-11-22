function Moc()
{
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
	
	this.init = function(form)
	{
		this.calculate();
		this.updateForm(form);
	}
	
	this.calculate = function()
	{
		this.structure.calculate();
		this.groundPropulsion.calculate();
		this.flyingPropulsion.calculate();
		this.thrustPropulsion.calculate();
		this.armament.calculate();
		this.equipment.calculate();
		this.mind.calculate();
		this.superNatural.calculate();
		this.specialities.calculate();
		
		this.power = Math.max(1,this.structure.size);
		if (!this.flyingPropulsion.active)
			this.power *= 2;
		
		this.powerUsage = this.armament.powerUsage + this.equipment.powerUsage;
		
		this.cost = 0;
		this.cost += this.structure.cost;
		this.cost += this.groundPropulsion.cost;
		this.cost += this.flyingPropulsion.cost;
		this.cost += this.thrustPropulsion.cost;
		this.cost += this.armament.cost;
		this.cost += this.equipment.cost;
		this.cost += this.mind.cost;
		this.cost += this.superNatural.cost;
		this.cost += this.specialities.cost;
	};
	
	this.applyFrom = function(form)
	{
		this.structure.applyFrom(form);
		this.groundPropulsion.applyFrom(form);
		this.flyingPropulsion.applyFrom(form);
		this.thrustPropulsion.applyFrom(form);
		this.armament.applyFrom(form);
		this.equipment.applyFrom(form);
		this.mind.applyFrom(form);
		this.superNatural.applyFrom(form);
		this.specialities.applyFrom(form);
		
		this.name = form.moc_name.value;
		this.color1 = form.moc_color1.value;
		this.color2 = form.moc_color2.value;
		this.color3 = form.moc_color3.value;
		this.description = form.moc_description.value;
	};
	
	this.updateForm = function(form)
	{
		this.structure.updateForm(form);
		this.groundPropulsion.updateForm(form);
		this.flyingPropulsion.updateForm(form);
		this.thrustPropulsion.updateForm(form);
		this.armament.updateForm(form);
		this.equipment.updateForm(form);
		this.mind.updateForm(form);
		this.superNatural.updateForm(form);
		this.specialities.updateForm(form);
		
		form.total_cost.value = this.cost;
		form.total_power.value = this.power;
		form.power_usage.value = this.powerUsage;
		
		if(this.power < this.powerUsage)
		{
			form.power_usage.style.color = "#ff0000";
		}
		else
		{
			form.power_usage.style.color = null;
		}
		
		form.moc_name.value = this.name;
		form.moc_color1.value = this.color1;
		form.moc_color2.value = this.color2;
		form.moc_color3.value = this.color3;
		form.moc_description.value = this.description;
	};

};
