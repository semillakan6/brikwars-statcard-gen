
function GroundPropulsion(moc)
{
	this.moc = moc;
	this.active = false;
	this.speed = 0;
	this.cost = 0;
	this.default = true;
	
	this.calculate = function()
	{
		if(isNaN(this.speed)) this.speed = 0;
		// limit speed
		this.speed = this.active ? Math.max(0,this.speed) : 0;
		this.cost = this.active ? this.speed/2.0 : 0;
		if (this.moc.equipment.hasArmorPlating())
			this.cost *= 2;
	};

	this.applyFrom = function(form)
	{
		this.default = form.prop_ground_default.checked;
		
		if(this.default)
		{
			this.speed = 10;
		}
		else
		{
			this.speed = form.prop_ground_speed.value;
		}
		this.active = form.prop_ground.checked;
	};

	this.updateForm = function(form)
	{
		form.prop_ground_default.checked = this.default;
		form.prop_ground.checked = this.active;
		form.prop_ground_speed.disabled = !this.active;
		form.prop_ground_default.disabled = !this.active;
		form.prop_ground_speed.value = this.speed;
		var example = this.getSpeedExample();
		example = example ? " (as fast as a "+ example + ")" : "&nbsp;";
		document.getElementById('prop_ground_example').innerHTML = example;
		form.prop_ground_cost.value = this.cost;
	};
	
	this.getSpeedExample = function()
	{
		if(!this.speed) return;
		if(this.speed <= 4) return "wheelchair / rowboat / zombie";
		if(this.speed <= 6) return "lawnmower / steamboat / minifig";
		if(this.speed <= 8) return "bicycle / submarine / elephant";
		if(this.speed <=10) return "tank / clipper / horse";
		if(this.speed <=12) return "car / motorboat";
		if(this.speed <=16) return "sport car / speedboat / superhero";
	};
	
};

function FlyingPropulsion(moc)
{
	this.moc = moc
	this.active = false;
	this.speed = 0;
	this.cost = 0;
	this.default = true;

	this.calculate = function()
	{
		if (this.moc.equipment.hasArmorPlating())
		{
			this.active = false;
		}
		// limit speed
		if(isNaN(this.speed)) this.speed = 0;
		this.speed = this.active ? Math.max(0,this.speed) : 0;
		this.cost = this.active ? Math.ceil(this.speed/2.0) * (2 + this.moc.structure.structureLevel) : 0;
	};
	
	this.applyFrom = function(form)
	{
		this.default = form.prop_flying_default.checked;
	
		if(this.default)
		{
			this.speed = 12;
		}
		else
		{
			this.speed = form.prop_flying_speed.value;
		}
		this.active = form.prop_flying.checked;
	};
	
	this.updateForm = function(form)
	{
		form.prop_flying_default.checked = this.default;
		form.prop_flying.checked = this.active;
		form.prop_flying_speed.disabled = !this.active;
		form.prop_flying_default.disabled = !this.active;
		form.prop_flying_speed.value = this.speed;
		var example = this.getSpeedExample();
		example = example ? " (as fast as a "+ example + ")" : "&nbsp;";
		document.getElementById('prop_flying_example').innerHTML = example;
		form.prop_flying_cost.value = this.cost;
		
		if (this.moc.equipment.hasArmorPlating())
		{
			document.getElementById('flying_notes').innerHTML = "A construction with armor plating cannot fly. Movement construction costs are doubled.";
			document.getElementById('flying').style.backgroundColor = "#eee";
			form.prop_flying.disabled = true;
		}
		else
		{
			document.getElementById('flying_notes').innerHTML = "&nbsp;";
			document.getElementById('flying').style.backgroundColor = "transparent";
			form.prop_flying.disabled = false;
		}
	};
	
	this.getSpeedExample = function()
	{
		if(!this.speed) return;
		if(this.speed <= 4) return "hot air ballon";
		if(this.speed <= 6) return "zeppelin";
		if(this.speed <= 8) return "glider / minicopter";
		if(this.speed <=10) return "assault helicopter";
		if(this.speed <=12) return "helicopter / light aircraft / bird";
		if(this.speed <=16) return "fighter plane / spacecraft";
		if(this.speed <=20) return "fighter jet / starfighter / superman";
		if(this.speed <=24) return "starfighter interceptor";
	};
};

function ThrustPropulsion(moc)
{
	this.moc = moc;
	this.active = false;
	this.speed = 0;
	this.cost = 0;
	this.default = true;
	
	this.calculate = function()
	{
		if(isNaN(this.speed)) this.speed = 1;
		// limit speed
		this.speed = this.active ? Math.max(1,this.speed) : 0;
		this.cost = this.active ? this.speed/2.0 : 0;
		if (this.moc.equipment.hasArmorPlating())
			this.cost *= 2;
	};

	this.applyFrom = function(form)
	{
		this.speed = form.prop_thrust_speed.value;
		this.active = form.prop_thrust.checked;
	};

	this.updateForm = function(form)
	{
		form.prop_thrust.checked = this.active;
		form.prop_thrust_speed.disabled = !this.active;
		form.prop_thrust_speed.value = this.speed;
		form.prop_thrust_cost.value = this.cost;
	};
	
};
