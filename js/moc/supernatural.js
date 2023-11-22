superNaturalDice_types = [
	{
		name: "Fire",
		die: "d4",
		cost: 3,
		note: "SuperNatural d4s can earn Bonus Dice"
	},
	{
		name: "Earth",
		die: "d6",
		cost: 4,
		note: "-"
	},
	{
		name: "Air",
		die: "d8",
		cost: 5,
		note: "Range d8 may also add +1 Firing Arc"
	},
	{
		name: "Explosions",
		die: "d10",
		cost: 6,
		note: "Armor: alters Structure Level; add +2\" radius to any Effect"
	},
	{
		name: "Magik",
		die: "d12",
		cost: 7,
		note: "Damage d12s bypass Armored status"
	},
	{
		name: "Chaos",
		die: "d20",
		cost: "?",
		disabled: true,
		note: "Only available to BrikThulhu"
	},
];

function SuperNaturalDie()
{
	this.typeId = 0;
	this.amount = 1;

	this.cost = function()
	{
		return superNaturalDice_types[this.typeId].cost * this.amount;
	};
	
	this.note = function()
	{
		return superNaturalDice_types[this.typeId].note;
	};
	
	this.name = function()
	{
		return superNaturalDice_types[this.typeId].name;
	};
	
	this.die = function()
	{
		return superNaturalDice_types[this.typeId].die;
	};
};

function SuperNatural(moc)
{
	this.moc = moc;
	this.active = false;
	this.cost = 0;
	this.dice = new Array();
	
	this.init = function()
	{
		var dice_node = document.getElementById("supernatural_dice");
		while (dice_node.firstChild)
		{
			dice_node.removeChild(dice_node.firstChild);
		};
	};
	this.init();
	
	this.getDieTypes = function()
	{
		var result = [];
		for(var i=0; i<this.dice.length; ++i)
		{
			if(this.dice[i]) result.push(this.dice[i]);
		}
		return result;
	}
	
	this.getDiceCount = function()
	{
		var result = 0;
		for(var i=0; i<this.dice.length; ++i)
		{
			if(this.dice[i])
				result += this.dice[i].amount;
		}
		return result;
	}

	this.addIfEmpty = function()
	{
		if(!this.getDiceCount())
			this.add();
	}
	
	this.add = function()
	{
		var enabled = this.getFreeDiceTypeIds();

		var i = this.dice.push(new SuperNaturalDie()) - 1;
		
		var typeSelect = document.createElement("select");
		typeSelect.id = "supernatural_dice_"+i+"_type";
		typeSelect.onchange = function() { calculate(); };
//		typeSelect.onmousemove = function() { calculate(); };
		typeSelect.onkeyup = function() { calculate(); };

		var selectIndex = -1;
		
		for(j=0;j<superNaturalDice_types.length;j++) {
		
			var die_type = superNaturalDice_types[j];
			var option = document.createElement("option");
			option.text = die_type.die + " (" + die_type.name + ")";
			option.value = j;
			if(j in enabled)
			{
				if(selectIndex == -1)
					selectIndex = j;
			} else {
				option.disabled = true;
			}
			typeSelect.appendChild(option);
		}
		this.dice[i].typeId = selectIndex;
//		typeSelect.selectedIndex = selectIndex;
		
		var typeCell = document.createElement("td");
		typeCell.appendChild(typeSelect);
		
		var amountInput = document.createElement("input");
		amountInput.type = "number";
		amountInput.id = "supernatural_dice_"+i+"_amount";
		amountInput.min = 1;
		amountInput.step = 1;
		amountInput.size = 1;
//		amountInput.onclick = function(evt) { evt.target.select(); };
		amountInput.onkeyup = function() { calculate() };
		amountInput.onchange = function() { calculate() };
		var amountCell = document.createElement("td");
		amountCell.appendChild(amountInput);
		
		var notesInput = document.createElement("input");
		notesInput.disabled = true;
		notesInput.id = "supernatural_dice_"+i+"_notes";
		notesInput.style.width = "260pt";
		var notesCell = document.createElement("td");
		notesCell.appendChild(notesInput);
		
		var button = document.createElement("input");
		button.type = "button";
		button.value = "X";
		button.id = "supernatural_dice_"+i+"_remove";
		button.onclick = function() { moc.superNatural.remove(i); calculate(); };
		
		var removeCell = document.createElement("td");
		removeCell.appendChild(button);
	
		var costCell = document.createElement("td");
		costCell.className = "cost";
		var costInput = document.createElement("input");
		costInput.disabled = true;
		costInput.size = 1;
		costInput.type = "text";
		costInput.id = "supernatural_dice_"+i+"_cost";
		costCell.appendChild(costInput);
	
		var row = document.createElement("tr");
		row.id = "supernatural_dice_"+i;
		row.appendChild(typeCell);
		row.appendChild(amountCell);
		row.appendChild(notesCell);
		row.appendChild(removeCell);
		row.appendChild(costCell);
				
		document.getElementById("supernatural_dice").appendChild(row);
	};
	
	this.remove = function(i)
	{
		this.dice[i] = null;
		
		var node = document.getElementById("supernatural_dice_"+i);
		node.parentNode.removeChild(node);
	};
	
	this.calculate = function()
	{
		if(this.active)
		{
			this.cost = 0;
			for(var i=0; i<this.dice.length; ++i)
			{
				var die = this.dice[i];
				if(!die) continue;
				
				this.cost += die.cost();
			}
		}
		else
		{
			this.cost = 0;
		}
	};
	
	this.getFreeDiceTypeIds = function()
	{
		var result = {};
		for(j=0;j<superNaturalDice_types.length;j++)
		{
			if(superNaturalDice_types[j].disabled)
				continue;
		
			var alreadyThere = false;
			for(var x=0; x<this.dice.length; ++x)
			{
				var die = this.dice[x];
				if(!die) continue;
				if(die.typeId == j)
				{
					alreadyThere = true;
					break;
				}
			}
			if(!alreadyThere)
				result[j] = true;
		}
		
		return result;
	}
	
	this.updateForm = function(form)
	{
		form.supernatural.checked = this.active;
		document.getElementById("supernatural_more").style.display = this.active ? "table-row-group" : "none";
		document.getElementById("supernatural_dice").style.display = this.active ? "table-row-group" : "none";
		document.getElementById("supernatural_header").style.display = this.active && this.supernaturalCount() > 0 ? "table-row-group" : "none";
		
		for(i=0;i<this.dice.length;i++)
		{
			var die = this.dice[i];
			if(!die) continue;
			
			document.getElementById("supernatural_dice_"+i+"_amount").value = die.amount;
			document.getElementById("supernatural_dice_"+i+"_type").selectedIndex = die.typeId;
			document.getElementById("supernatural_dice_"+i+"_cost").value = die.cost();
			document.getElementById("supernatural_dice_"+i+"_notes").value = die.note();
			
			var enabled = this.getFreeDiceTypeIds();
			enabled[die.typeId] = true;
			
			var options = document.getElementById("supernatural_dice_"+i+"_type").options;
			
			for(var j=0;j<options.length;j++)
			{
				var option = options[j];
				option.disabled = !(option.value in enabled);
			}
		}
		
		var enabled = this.getFreeDiceTypeIds();
		var buttonEnabled = false;
		for (var key in enabled)
		{
			buttonEnabled = true;
		}
		form.supernatural_add.disabled = !buttonEnabled;		

	};
	
	this.applyFrom = function(form)
	{
		this.active = form.supernatural.checked;
		
		for(var i=0; i<this.dice.length; ++i)
		{
			var die = this.dice[i];
			if(!die) continue;
			
			var amount = document.getElementById("supernatural_dice_"+i+"_amount").value;
			amount = Math.max(1,Math.round(amount));
			if(isNaN(amount)) amount = 1;
			die.amount = amount;
			
			var die_type = document.getElementById("supernatural_dice_"+i+"_type");
			die.typeId = die_type.options[die_type.selectedIndex].value;
		}
	};
	
	this.supernaturalCount = function()
	{
		var count = 0;
		for(i=0;i<this.dice.length;i++)
		{
			if(this.dice[i]) count++;
		}
		return count;
	};
};