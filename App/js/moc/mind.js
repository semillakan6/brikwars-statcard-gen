
class MindType {
    constructor(name, skill, cost = 0, example) {
        this.name = name;
        this.skill = skill;
        this.cost = cost;
        this.example = example;
    }
}

class HalfMindType extends MindType {
    constructor(name, example, help, skill, cost, isIncompetent, isProgram) {
        super(name, skill, cost, example);
        this.isIncompetent = isIncompetent;
        this.isProgram = isProgram;
        this.help = help;
    }
}
// Define the mind types
const mind_types = [
    new MindType("Select an Option...", "", 0, ""),
    new MindType("High Command", "1d4", 0, "a leader or great leader"),
    new MindType("Trained", "1d6", 0, "standard trooper"),
    new MindType("Expert", "1d8", 0, "specialist, officer or veteran"),
    new MindType("Heroic", "1d10", 0, "hero"),
    new MindType("Supernatural", "1d12", 0, "demigod or immortal"),
];

// Define the half mind types
const halfmind_types = [
   new HalfMindType(
        "Incompetent",
        "zombie or civilian",
        "An Incompetent creature is a full-Minded creature with poor skills or smarts. It has an Action d4 and can't go Over the Top. It can only get Bonus Action d4s on a Critical Success like other dice.",
        "1d4",
        0,
        true
    ),
    new HalfMindType(
        "Submissive",
        "horse or fanboy",
        "A Submissive creature can think but likes to follow a master. With a smart minifig, it acts like a full Mind. Without one, it acts like an animal: wandering, hiding, or fighting.",
        "1d6",
    ),
    new HalfMindType(
        "Subjugated",
        "slave or schoolchild",
        "Subjugated creatures are forced to obey by fear or chains, but want to escape and rebel. If they get free, they will do anything to avoid being Subjugated again. This could be fighting their captors, running away, or attacking their former masters.",
        "1d6",
    ),
    new HalfMindType(
        "Programmed",
        "robot or mind-controlled victim",
        "A Programmed creature follows a list of specific behaviors in battle. It can’t act outside of those instructions. For example, ‘Heal nearby allies’ or ‘Fire at enemies near allies’ are Programmed behaviors; ‘Beat all enemies’ or ‘Win the battle’ are not.",
        "1d6",
        undefined,
        false,
        true
    ),
];

class Mind {
    constructor(moc) {
        this.moc = moc;
        this.active = false;
        this.mindTypeId = 0;
        this.isHalfMind = false;
        this.halfmindTypeId = 0;
        this.mindCost = 0;
        this.extraMindsCost = 0;
        this.extraMinds = 0;
        this.program = "";
        this.init(document.forms[0]);
    }

    createOption(val, typeObj, typeId, formField) {
        const opt = document.createElement("option");
        opt.value = val;
        opt.innerHTML = (typeId === 'mindTypeId') ? typeObj.skill + " (" + typeObj.name + ")" : typeObj.name;
        opt.selected = val == this[typeId];
        opt.disabled = typeObj.disabled;
        formField.appendChild(opt);
    }

    generateOptions(typesArray, typeId, formField){
        typesArray.forEach((type, index) => {
            this.createOption(index, type, typeId, formField);
        });
    }

    init(form) {
        this.generateOptions(mind_types, 'mindTypeId', form.skill);
        this.generateOptions(halfmind_types, 'halfmindTypeId', form.halfmind_type);
        
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
        this.updateFormMind(form);
        this.updateFormSkill(form);
        this.updateFormHalfMind(form);
        this.updateFormExtraMinds(form);
        this.updateProgram(form);
        this.updateHelp(form);
    }
    
    updateFormMind(form) {
        form.mind.checked = this.active;
        document.getElementById("mind_more").style.display = this.active ? "table-row-group" : "none";
    }
    
    updateFormSkill(form) {
        form.skill.selectedIndex = this.mindTypeId;
    }
    
    updateFormHalfMind(form) {
        form.halfmind.checked = this.isHalfMind;
        form.halfmind_type.disabled = !this.isHalfMind;
        form.halfmind_type.options[4].style.display = this.isHalfMind ? "none" : "block";
        this.isHalfMind ? form.halfmind_type.selectedIndex = this.halfmindTypeId : form.halfmind_type.selectedIndex = 3;
        document.getElementById("program_container").style.display = this.isHalfMind && halfmind_types[this.halfmindTypeId].isProgram ? "table-row" : "none";
    }
    
    updateFormExtraMinds(form) {
        form.extra_minds.value = this.extraMinds;
        form.extra_minds_cost.value = this.extraMindsCost;
        form.skill_cost.value = this.mindCost;
    }
    
    updateProgram(form) {
        form.program.value = this.program;
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