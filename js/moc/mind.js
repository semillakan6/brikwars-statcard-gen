
var mind_types = 
[
	{
		name: "Incompetent",
		skill: "1d4",
		cost: 0,
		isIncompetent: true,
		example: "zombie or civilian"
	},
	{
		name: "Trained",
		skill: "1d6",
		cost: 0,
		example: "standard trooper"
	},
	{
		name: "Expert",
		skill: "1d8",
		cost: 0,
		example: "specialist, officer or veteran"
	},
	{
		name: "Heroic",
		skill: "1d10",
		cost: 0,
		example: "hero"
	},
	{
		name: "Supernatural",
		skill: "1d12",
		cost: 0,
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

class Mind {
    constructor(moc) {
        this.moc = moc;
        this.active = false;
        this.mindTypeId = 1;
        this.isHalfMind = false;
        this.halfmindTypeId = 0;
        this.mindCost = 0;
        this.extraMindsCost = 0;
        this.extraMinds = 0;
        this.program = "";
        this.init(document.forms[0]);
    }

    createOption(val, typeObj, typeId, formField) {
        var opt = document.createElement("option");
        opt.value = val;
        opt.innerHTML = (typeId === 'mindTypeId') ? typeObj.skill + " (" + typeObj.name + ")" : typeObj.name;
        opt.selected = val == this[typeId];
        opt.disabled = typeObj.disabled;
        formField.appendChild(opt);
    }

    init(form) {
        mind_types.forEach((type, index) => {
            this.createOption(index, type, 'mindTypeId', form.skill);
        });
        halfmind_types.forEach((type, index) => {
            this.createOption(index, type, 'halfmindTypeId', form.halfmind_type);
        });
        let n = document.createElement("option");
        n.innerHTML = "-";
        form.halfmind_type.appendChild(n);
    }

    calculate() {
        if (this.active) {
            this.mindCost = mind_types[this.mindTypeId].cost;
            if (this.isHalfMind && mind_types[this.mindTypeId].cost >= 1) {
                this.mindCost -= this.moc.structure.size / 2.0;
            }
            this.extraMindsCost = this.extraMinds * this.mindCost;
            this.cost = this.mindCost + this.extraMindsCost;
        } else {
            this.cost = 0;
        }
    }

    applyFrom(form) {
        this.active = form.mind.checked;
        this.mindTypeId = form.skill.options[form.skill.selectedIndex].value;
        if (this.isHalfMind) {
            this.halfmindTypeId = form.halfmind_type[form.halfmind_type.selectedIndex].value;
        }
        this.isHalfMind = form.halfmind.checked;
        this.extraMinds = Math.max(0, Math.round(form.extra_minds.value));
        this.extraMinds = isNaN(this.extraMinds) ? 0 : this.extraMinds
        this.program = form.program.value;
    }

    updateForm(form) {
        form.mind.checked = this.active;
        document.getElementById("mind_more").style.display = this.active ? "table-row-group" : "none";
        form.skill.selectedIndex = this.mindTypeId;
        form.halfmind.checked = this.isHalfMind;
        form.halfmind_type.disabled = !this.isHalfMind;
        form.halfmind_type.options[3].style.display = this.isHalfMind ? "none" : "block";
        this.isHalfMind ? form.halfmind_type.selectedIndex = this.halfmindTypeId : form.halfmind_type.selectedIndex = 3;
        document.getElementById("program_container").style.display = this.isHalfMind && halfmind_types[this.halfmindTypeId].isProgram ? "table-row" : "none";
        form.extra_minds.value = this.extraMinds;
        form.extra_minds_cost.value = this.extraMindsCost;
        form.skill_cost.value = this.mindCost;
        form.program.value = this.program;
        this.updateHelp(form);
    }

    updateHelp(form) {
        document.getElementById("skill_example").innerHTML = "like a " + mind_types[form.skill.selectedIndex].example;
        if (this.isHalfMind) {
            document.getElementById("halfmind_example").innerHTML = "like a " + halfmind_types[form.halfmind_type.selectedIndex].example;
            document.getElementById("halfmind_help").innerHTML = halfmind_types[form.halfmind_type.selectedIndex].help;
        } else {
            document.getElementById("halfmind_example").innerHTML = "";
            document.getElementById("halfmind_help").innerHTML = "<br/><br/>";
        }
    }
};