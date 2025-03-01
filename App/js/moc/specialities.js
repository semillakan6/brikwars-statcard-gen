let specialities_templates = {
  Civilians: {
    civilian: {
      name: "Civilized",
      description: "Units are controlled by Mob Rule.",
      cost: 0,
    },
    professional: {
      name: "Professional Job Training",
      shortname: "1d6 Training",
      mention: "skill",
      description: "Improves Action Die to 1d6 for specific job-related tasks.",
      cost: 0,
    },
  },
  Infantry: {
    worker: {
      name: "Worker's Job Training",
      shortname: "1d6 Training",
      mention: "skill",
      description:
        "All Workers are Half-Minded - either Programmed, Submissive, or Subjugated. \nImproves Action Die to 1d6 for specific job-related tasks",
      cost: -0.5,
    },
    cannon_fodder: {
      name: "Irrelevant",
      description:
        "Attacks do 1 point of Damage; Actions never go Over the Top; Effective Size 0''; unit can Respawn endlessly but it doesn't matter.",
      cost: -0.5,
    },
    skirmisher: {
      name: "Harassment",
      description:
        "Unit can Disengage from Close Combat freely without drawing Counterattacks.",
      cost: 0,
    },
    scout: {
      name: "Pathfinding/Tracking",
      shortname: "1d8 vs FH",
      mention: "skill",
      description:
        "1d8 Action when rolling vs. Field Hazards; stops safely before setting off Concealed Hazards for self and others. \nAutomatically detects hidden or invisible units, Traps, and Triggers. \nAllows Marking of a target for allied visibility and a +1 Action Bonus to Ranged Attacks.",
      cost: 0,
    },
    phalanx: {
      name: "Shield Wall",
      description:
        "Units can cooperate to form a shield wall, automatically Parrying all damage from one direction. \nSpecialty: March \nMarching in formation ignore movement penalties from Heavy Armor while walking. \nIf a Marching minifig is in a Squad with at least one other Marching minifig, they can March in formation, walking at normal speed and ignoring Movement penalties from Heavy Armor.",
      cost: 0,
    },
    marksman: {
      name: "Aiming",
      description:
        "Can Aim a Ranged attack as a full-turn Action, using a Specialty 1d8 to replace the Action Roll, replace a Damage die, or to add inches to Range.",
      cost: 0,
    },
    sniper: {
      name: "Sniping",
      description:
        "Can Snipe with a scoped Long-Ranged Weapon as a full-turn Action, Automatically Hitting targets at least 5'' away.",
      cost: 0,
    },
    heavy: {
      name: "Compensating",
      description:
        "When standing still, can use weapons 1'' larger than normally allowed.",
      cost: 0,
    },
  },
  Operators: {
    rider: {
      name: "Horsemanship",
      description:
        "Can control a steed or vehicle and make attacks with handheld weapons as part of a single Action.",
      cost: 0,
    },
    pilot: {
      name: "Stunt Driving (1d8)",
      shortname: "1d8 Stunt Driving",
      mention: "skill",
      description:
        "Once a turn, defy a controlled vehicle's movement limitations for up to Specialty d8 Stunt Inches.",
      cost: 0,
    },
    gunner: {
      name: "Gunnery (1d8)",
      description:
        "Action Specialty d8 with mounted weapons; allows Gunnery Support Action.",
      cost: 0,
    },
  },
  Support: {
    tek: {
      name: "Assistance",
      description: "Use Action to boost another Specialist's Specialty die",
      cost: 0,
    },
    mechanik: {
      name: "Mechanikal Aptitude (1d8)",
      shortname: "1d8 Construction",
      mention: "skill",
      description:
        "Allows a Construction Action to build or repair creations on enemy turns within a radius of Specialty d8 inches.",
      cost: 0,
    },
    engineer: {
      name: "Rationalism (1d8)",
      shortname: "1d8 Rationalize",
      mention: "skill",
      description:
        "Allows a Construction Action to Rationalize Specialty d8 modifications to existing objects and devices. (See Table of Rationalizations)",
      cost: 0,
    },
    medik: {
      name: "Ker-Triage! (1d8)",
      shortname: "1d8 Medikal",
      mention: "skill",
      description:
        "Allows a Construction Action to roll Specialty d8 (or a d6 if he's improvising without proper tools) on the Ker-Triage! Table to revive fallen minifigs and creatures. \nIf the Medik's Construction Action is interrupted, he still makes the Ker-Triage! Roll and removes the number of limbs indicated, but the patient is not revived. ",
      cost: 0,
    },
    cybernetik: {
      name: "Mad Science (1d6)",
      description:
        "Allows a Construction Action to combine mechanikal and biologikal creations within Specialty d6 inches",
      cost: 0,
    },
  },
  "Elite Units": {
    commando: {
      name: "Field Training",
      description:
        "Can copy any ally's Specialty marked with a Specialty die, using a Specialty die one size smaller",
      cost: 0,
    },
    hero: {
      name: "Heroic Ego (+1Ü)",
      description:
        "Can take one Heroic Feat per turn appropriate to his Cliché; can inspire nearby friendly units (within an 1d10 Roll worth of inches) to RedShirt and take damage meant for the Hero; becomes Cranky in the presence of other Heroic units or items",
      cost: 1,
    },
  },
  "Command Units": {
    officer: {
      name: "Coordination (1d8)",
      shortname: "1d8 Coordination",
      mention: "skill",
      description:
        "Can spend an Action to improve the Action Dice of his Squad mates by one die size, up to 1d8, for one combined Action",
      cost: 0,
    },
    leader: {
      name: "Inspiration (1d6)",
      shortname: "1d8 Inspiration",
      mention: "skill",
      description:
        "Can spend an Action and use a Motivational Tool to grant a Specialty d6 Action re-roll or to add Specialty d6 to an attribute for a target unit or Squad",
      cost: 0,
    },
    commander: {
      name: "Strategic Intervention",
      description:
        "Can spend an Action and use a communications Tool to gain one Strategy brick after witnessing a successful kill, or to spend Strategy bricks on Strategic Interventions.",
      cost: 0,
    },
    great_leader: {
      name: "Megalomania (+1Ü)",
      description:
        "Can ScapeGoat subordinate units; Can make a Great Speech to convert casualties into Outrage Bennies.",
      cost: 1,
    },
  },
  Monsters: {
    bigfig: {
      name: "Bigfig",
      description:
        "The bigfig is a combat monster, as strong as a Horse and with the extra combat punch of an 1d8.",
      cost: 0,
    },
    brutefig: {
      name: "Brutefig",
      shortname: "Stupidity",
      mention: "skill",
      description:
        "Brutefigs have a standard Action d6 Mind, but they have enhanced opportunities for Stupidity as if they were Incompetent.",
      cost: 0,
    },
  },
};

$(document).ready(function () {
  var optGroup;
  var $select = $('select[name="specialities_templates"]');

  $select.append(new Option("(none)", ""));

  $.each(specialities_templates, function (group, templates) {
    optGroup = $("<optgroup>", {
      id: group,
      label: group,
    }).appendTo($select);

    $.each(templates, function (key, value) {
      $("<option>", {
        value: key,
        text: value.name,
        description: value.description,
        cost: value.cost,
      }).appendTo(optGroup);
    });
  });

  $select.select2({
    placeholder: "(none)",
    allowClear: true,
  });
});

class Speciality {
  constructor() {
    this.name = "";
    this.shortname = "";
    this.mention = "";
    this.description = "";
    this.cost = "";
  }
}

class Specialities {
  constructor(moc) {
    this.moc = moc;
    this.stuff = [];
    this.cost = 0;

    // Binding "this" to class methods
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.calculate = this.calculate.bind(this);
    this.applyFrom = this.applyFrom.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.getFieldTexts = this.getFieldTexts.bind(this);
    this.getArmorFieldTexts = this.getArmorFieldTexts.bind(this);
    this.getMoveFieldTexts = this.getMoveFieldTexts.bind(this);
    this.getSkillFieldTexts = this.getSkillFieldTexts.bind(this);
    this._getHTMLRow = this._getHTMLRow.bind(this);
    this._appendRow = this._appendRow.bind(this);
    this._fillWithTemplate = this._fillWithTemplate.bind(this);
    this._updateFormForSpeciality = this._updateFormForSpeciality.bind(this);
  }

  add() {
    const newSpeciality = new Speciality();
    const i = this.stuff.push(newSpeciality) - 1;

    const row = document.createElement("tr");
    row.id = `specialities_${i}`;
    row.innerHTML = this._getHTMLRow(i);

    this._appendRow(row, i);
    const index = document.forms[0].specialities_templates.selectedIndex;
    this._fillWithTemplate(index, i);
  }

  remove(i) {
    console.log("Before removal:", this.stuff);
    // Remove the speciality from the array
    this.stuff.splice(i, 1);

    // Remove the row element from the DOM
    const node = document.getElementById(`specialities_${i}`);
    if (node) {
      node.parentNode.removeChild(node);
    }

    // Re-index the IDs of the remaining rows and their child elements
    for (let j = i; j < this.stuff.length; j++) {
      const nextRow = document.getElementById(`specialities_${j + 1}`); // Get the next row
      if (nextRow) {
        // Update the row's ID
        nextRow.id = `specialities_${j}`;

        // Update the child element IDs
        const newIndex = j; // use new index for naming
        nextRow.querySelector(
          '[id^="specialities_"]'
        ).id = `specialities_${newIndex}_name`;
        nextRow.querySelector(
          '[id^="specialities_"][id$="_desc"]'
        ).id = `specialities_${newIndex}_desc`;
        nextRow.querySelector(
          '[id^="specialities_"][id$="_cost"]'
        ).id = `specialities_${newIndex}_cost`;
        nextRow.querySelector(
          '[id^="specialities_"][id$="_shortname"]'
        ).id = `specialities_${newIndex}_shortname`;
        nextRow.querySelector(
          '[id^="specialities_"][id$="_mention_in"]'
        ).id = `specialities_${newIndex}_mention_in`;
        nextRow.querySelector(
          '[id^="specialities_"][id$="_remove"]'
        ).id = `specialities_${newIndex}_remove`;
      }
    }

    // Recalculate costs after removing a row
    this.calculate();

    // Update remaining rows' values
    this.stuff.forEach((speciality, index) => {
      const nameInput = document.getElementById(`specialities_${index}_name`);
      const descInput = document.getElementById(`specialities_${index}_desc`);
      const costInput = document.getElementById(`specialities_${index}_cost`);
      const shortnameInput = document.getElementById(
        `specialities_${index}_shortname`
      );
      const mentionInInput = document.getElementById(
        `specialities_${index}_mention_in`
      );

      // Safely update speciality fields if elements exist
      if (nameInput) speciality.name = nameInput.value;
      if (descInput) speciality.description = descInput.value;
      if (costInput) speciality.cost = costInput.value;
      if (shortnameInput) speciality.shortname = shortnameInput.value;
      if (mentionInInput) speciality.mention_in = mentionInInput.value;
    });

    console.log("After removal:", this.stuff);
  }

  calculate() {
    this.cost = 0;
    for (let speciality of this.stuff) {
      speciality.cost = Math.round(parseFloat(speciality.cost || 0) * 2) / 2;
      if (isNaN(speciality.cost)) {
        speciality.cost = 0;
      }
      this.cost += speciality.cost;
    }
  }

  applyFrom(form) {
    for (let i = 0; i < this.stuff.length; ++i) {
      let speciality = this.stuff[i];

      // Ensure the element exists before trying to access its value
      let nameInput = document.getElementById(`specialities_${i}_name`);
      let descInput = document.getElementById(`specialities_${i}_desc`);
      let costInput = document.getElementById(`specialities_${i}_cost`);
      let shortnameInput = document.getElementById(
        `specialities_${i}_shortname`
      );
      let mentionInInput = document.getElementById(
        `specialities_${i}_mention_in`
      );

      if (
        nameInput &&
        descInput &&
        costInput &&
        shortnameInput &&
        mentionInInput
      ) {
        speciality.name = nameInput.value;
        speciality.description = descInput.value;
        speciality.cost = costInput.value;
        speciality.shortname = shortnameInput.value;
        speciality.mention_in = mentionInInput.selectedIndex;
      } else {
        console.warn(`Row ${i} elements not found. Ensure proper indexing.`);
      }
    }
  }

  updateForm(form) {
    for (let i = 0; i < this.stuff.length; ++i) {
      let speciality = this.stuff[i];

      this._updateFormForSpeciality(i, speciality);
    }
  }

  getFieldTexts(index) {
    let result = [];
    for (let speciality of this.stuff) {
      if (speciality.mention_in === index) {
        let name =
          speciality.shortname !== "" ? speciality.shortname : speciality.name;
        result.push(name);
      }
    }
    return result;
  }

  getArmorFieldTexts() {
    return this.getFieldTexts(1);
  }

  getMoveFieldTexts() {
    return this.getFieldTexts(2);
  }

  getSkillFieldTexts() {
    return this.getFieldTexts(3);
  }
  _getHTMLRow(i) {
    return `
            <td colspan='3'>
                <table class='table'>
                    <tr>
                        <th>Name</th>
                        <td>
                            <input type='text' id='specialities_${i}_name' oninput="calculate();" class='form-control'/>
                        </td>
                        <td>
                            <button type='button' id='specialities_${i}_remove' class='btn btn-outline-danger'><i class='fas fa-trash'></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>
                            <textarea id='specialities_${i}_desc' oninput="calculate();" class='form-control'></textarea>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Mention on front side</th>
                        <td>
                            <select id='specialities_${i}_mention_in' onchange="calculate();" class='form-control'> 
                                <option value='no'>no</option>
                                <option value='armor'>in armor field</option>
                                <option value='move'>in move field</option>
                                <option value='skill'>in skill field</option>
                            </select> as <input type='text' id='specialities_${i}_shortname' oninput="calculate();" class='form-control'/>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </td>
            <td class='cost'>
                <input type='text' size='1' id='specialities_${i}_cost' oninput="calculate();" class='form-control'/>
            </td>`;
  }

  _appendRow(row, i) {
    document.getElementById("specialities").appendChild(row);

    // add Event listeners
    document
      .getElementById(`specialities_${i}_name`)
      .addEventListener("input", () => {
        this.calculate();
      });

    document
      .getElementById(`specialities_${i}_desc`)
      .addEventListener("input", () => {
        this.calculate();
      });

    document
      .getElementById(`specialities_${i}_shortname`)
      .addEventListener("change", () => {
        this.calculate();
      });

    document
      .getElementById(`specialities_${i}_mention_in`)
      .addEventListener("change", () => {
        this.calculate();
      });

    document
      .getElementById(`specialities_${i}_cost`)
      .addEventListener("input", () => {
        this.calculate();
      });
    document
      .getElementById(`specialities_${i}_remove`)
      .addEventListener("click", () => {
        this.remove(i);
        calculate();
      });
  }

  _fillWithTemplate(index, i) {
    if (index > 0) {
      const id = document.forms[0].specialities_templates.options[index].value;
      let template;
      Object.values(specialities_templates).some((templates) => {
        if (id in templates) {
          template = templates[id];
          return true;
        }
        return false;
      });

      if (template) {
        document.getElementById(`specialities_${i}_name`).value = template.name;
        document.getElementById(`specialities_${i}_desc`).value =
          template.description;
        document.getElementById(`specialities_${i}_cost`).value =
          template.cost * this.moc.structure.size;
        document.getElementById(`specialities_${i}_shortname`).value =
          template.shortname ? template.shortname : "";

        const mentioned_in = document.getElementById(
          `specialities_${i}_mention_in`
        );
        if (template.mention) {
          for (let i = 0; i < mentioned_in.options.length; ++i) {
            if (mentioned_in.options[i].value == template.mention)
              mentioned_in.selectedIndex = i;
          }
        } else {
          mentioned_in.selectedIndex = 0;
        }

        document.forms[0].specialities_templates.selectedIndex = 0;
      }
    }
  }

  _updateFormForSpeciality(i, speciality) {
    const nameInput = document.getElementById(`specialities_${i}_name`);
    const costInput = document.getElementById(`specialities_${i}_cost`);
    const shortnameInput = document.getElementById(
      `specialities_${i}_shortname`
    );
    const mentionInInput = document.getElementById(
      `specialities_${i}_mention_in`
    );
    const descInput = document.getElementById(`specialities_${i}_desc`);

    if (
      nameInput &&
      costInput &&
      shortnameInput &&
      mentionInInput &&
      descInput
    ) {
      nameInput.value = speciality.name;
      costInput.value = speciality.cost;
      shortnameInput.value = speciality.shortname;
      mentionInInput.selectedIndex = speciality.mention_in;

      // Disable the shortname input if mention_in equals 0
      shortnameInput.disabled = speciality.mention_in == 0;

      // Adjust the description input's height based on content
      descInput.value = speciality.description;
      descInput.style.height = "0px";
      descInput.style.height = descInput.scrollHeight + "px";
    } else {
      console.warn(`Speciality form elements for index ${i} not found.`);
    }
  }
}
