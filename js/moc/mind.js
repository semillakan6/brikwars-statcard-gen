
var mind_types = 
[
	{
		name: "Incompetent",
		skill: "1d4",
		cost: 0.5,
		isIncompetent: true,
		example: "zombie or civilian"
	},
	{
		name: "Trained",
		skill: "1d6",
		cost: 1,
		example: "standard trooper"
	},
	{
		name: "Expert",
		skill: "1d8",
		cost: 2,
		example: "specialist, officer or veteran"
	},
	{
		name: "Heroic",
		skill: "1d10",
		cost: 4,
		example: "hero"
	},
	{
		name: "Supernatural",
		skill: "1d12",
		cost: 8,
		example: "demigod or immortal"
	}
];

var halfmind_types = 
[
	{
		name: "Submissive",
		example: "horse or fanboy",
		help: "Under an intelligent minifig's direction, it may act as intelligently as if it had a full Mind, but if abandoned, it reverts to whatever behavior seems appropriate."
	},
	{
		name: "Subjugated",
		example: "slave or schoolchild",
		help: "Forced to cooperate against its will. As long as kept in its restrains, it must follow the orders of its captors, but if it is released, it will do whatever it can to prevent being enslaved again."
	},
	{
		name: "Programmed",
		isProgram: true,
		example: "robot or mind-controlled victim",
		help: "Follows a simple set of behaviors. It's given a list of behaviors at the beginning of the battle, and may only behave in accordance with those instructions."
	}
];

function Mind(moc)
{
	this.moc = moc;
	this.active = false;
	
	this.mindTypeId = 1;
	this.isHalfMind = false
	this.halfmindTypeId = 0;
	this.mindCost = 0;
	
	this.extraMindsCost = 0;
	this.extraMinds = 0;
	
	this.program = "";
	
	this.init = function(form)
	{
		for(var i=0; i<mind_types.length; ++i)
		{
			var opt = document.createElement("option");
			opt.value = i;
			var mind_type = mind_types[i];
			opt.innerHTML = mind_type.skill + " (" + mind_type.name + ")";
			if(i == this.mindTypeId)
				opt.selected = true;
			if(mind_type.disabled)
				opt.disabled = true;
			form.skill.appendChild(opt);
		}
		
		for(var i=0; i<halfmind_types.length; ++i)
		{
			var opt = document.createElement("option");
			opt.value = i;
			var halfmind_type = halfmind_types[i];
			opt.innerHTML = halfmind_type.name;
			form.halfmind_type.appendChild(opt);
		}
		var n = document.createElement("option");
		n.innerHTML = "-";
		form.halfmind_type.appendChild(n);
	};
	this.init(document.forms[0]);
	
	this.calculate = function()
	{
		if(this.active)
		{
			this.mindCost = mind_types[this.mindTypeId].cost;
			if(this.isHalfMind && mind_types[this.mindTypeId].cost >= 1)
			{
				this.mindCost -= moc.structure.size / 2.0;
			}

			this.extraMindsCost = this.extraMinds * this.mindCost;
			this.cost = this.mindCost + this.extraMindsCost;
		}
		else
		{
			this.cost = 0;
		}
	};
	
	this.applyFrom = function(form)
	{
		this.active = form.mind.checked;
		this.mindTypeId = form.skill.options[form.skill.selectedIndex].value;
		if(this.isHalfMind)
		{
			this.halfmindTypeId = form.halfmind_type[form.halfmind_type.selectedIndex].value;
		}
		this.isHalfMind = form.halfmind.checked;
		
		this.extraMinds = Math.max(0,Math.round(form.extra_minds.value));
		if(isNaN(this.extraMinds)) this.extraMinds = 0;
		
		this.program = form.program.value;
	};
	
	this.updateForm = function(form)
	{
		form.mind.checked = this.active;
		document.getElementById("mind_more").style.display = this.active ? "table-row-group" : "none";
		
		form.skill.selectedIndex = this.mindTypeId;
		
		form.halfmind.checked = this.isHalfMind;
		form.halfmind_type.disabled = !this.isHalfMind;
		form.halfmind_type.options[3].style.display = this.isHalfMind ? "none" : "block";
		
		if(this.isHalfMind)
		{
			form.halfmind_type.selectedIndex = this.halfmindTypeId;
		} else {
			form.halfmind_type.selectedIndex = 3;
		}
		
		if(this.isHalfMind && halfmind_types[this.halfmindTypeId].isProgram)
		{
			document.getElementById("program_container").style.display = "table-row";
		}
		else
		{
			document.getElementById("program_container").style.display = "none";
		}
			
		
		form.extra_minds.value = this.extraMinds;
		
		form.extra_minds_cost.value = this.extraMindsCost;
		
		form.skill_cost.value = this.mindCost;
		
		form.program.value = this.program;
		
		this.updateHelp(form);
	};
	
	this.updateHelp = function(form)
	{
		document.getElementById("skill_example").innerHTML = "like a " + mind_types[form.skill.selectedIndex].example;
		
		if(this.isHalfMind)
		{
			document.getElementById("halfmind_example").innerHTML = "like a " + halfmind_types[form.halfmind_type.selectedIndex].example;
			document.getElementById("halfmind_help").innerHTML = halfmind_types[form.halfmind_type.selectedIndex].help;
			
		} else {
			document.getElementById("halfmind_example").innerHTML = "";
			document.getElementById("halfmind_help").innerHTML = "<br/><br/>";
		}
	};
};