function handleInputChange() {
    updateUInchesValue();
    // Call original calculate function
    calculate();
}

function PowerCalc() {
    let txtPowerTotalValue = $('#txtPowerTotal').val();
    let powerTotal = parseFloat(txtPowerTotalValue.substring(0, txtPowerTotalValue.length)); //remove 'x' from string
    let txtPowerAvailable = powerTotal * parseInt($('#structure_size').val());
    if ($("#power_impairmentCheck").is(":checked")) {
        txtPowerAvailable = parseInt($('#structure_size').val()); // cut in half if power_impairmentCheck is checked
    }
    $('#txtPowerAvailable').val(txtPowerAvailable);
}

function updateUInchesValue() { //Passed unit_type as a parameter
    let unit_type = document.getElementById('unit_type').value;
    let structureSizeInput = document.getElementById('structure_size').value;
    let uInchesInput = document.getElementById('u_inches');

    // Ensures Enhanced Attributes is selected
    if (document.getElementById('enhanced_attr').checked) {
        let value = Math.min(Math.max(parseInt(structureSizeInput), 1), 5);
        $('#txtValueTotal').val(structureSizeInput);
        // If structureSizeInput is a number then value will be the number else it will be NaN
        if (!isNaN(value)) {
            // Check if unit_type is structure and size is odd
            if (unit_type === 'structure' && value % 2 === 1) {
                // Only for odd sizes 1, 3, 5
                uInchesInput.value = value;
            } else if (unit_type !== 'structure') {
                // For non-structure types
                uInchesInput.value = value;
            }
        }
    }

    PowerCalc();
}
$(document).ready(function () {

    // Define all the upgrade input fields
    let upgradeInputs = [
        '#txtAmorUpgrade',
        '#txtPowerUpgrade',
        '#txtMoveUpgrade',
        '#txtActionUpgrade',
        '#txtMindUpgrade',
        '#txtValueUpgrade'
    ];

    // Attach a data attribute to store the previous value
    upgradeInputs.forEach(function (elem) {
        $(elem).data('previousValue', 0);
    });
    // Initially hide the span
    $('#deflectionStatus').css('visibility', 'hidden');

    // When deflection check state changes
    $("#deflectionCheck").change(function () {
        if (this.checked && !$(this).data("checked")) {
            $('#deflectionStatus').css('visibility', 'visible');
            let u_inches = parseInt($('#u_inches').val());
            $('#u_inches').val(u_inches - 1);
            $(this).data("checked", true);
        } else if (!this.checked && $(this).data("checked")) {
            $('#deflectionStatus').css('visibility', 'hidden');
            let u_inches = parseInt($('#u_inches').val());
            $('#u_inches').val(u_inches + 1);
            $(this).data("checked", false);
        }
    });

    // Function to update the txtAmorTotal, txtPowerTotal and txtMoveTotal fields
    function updateFields() {
        let unit_type = document.getElementById('unit_type').value;
        let amorUpgradeVal = $('#txtAmorUpgrade').val();
        let powerUpgradeVal = $('#txtPowerUpgrade').val();
        let moveUpgradeVal = $('#txtMoveUpgrade').val();
        let valueUpgradeVal = $('#txtValueUpgrade').val();
        let actionUpgradeVal = parseInt($('#txtActionUpgrade').val());
        let mindUpgradeVal = parseInt($('#txtMindUpgrade').val());
        let size = parseInt($('#structure_size').val());

        $('#txtAmorTotal').val(amorUpgradeVal <= 0 ? '1d6' : (parseInt(amorUpgradeVal) + 'd10'));
        // Update txtPowerTotal
        let powerTotal = (2 + parseInt(powerUpgradeVal));
        $('#txtPowerTotal').val(powerTotal + 'x');

        PowerCalc();

        let moveTotalValue;
        if (moveUpgradeVal == 1) {
            moveTotalValue = '5';
        } else if (moveUpgradeVal == 2) {
            moveTotalValue = '10';
        } else if (moveUpgradeVal == 3 && unit_type === "flying_machine") {
            moveTotalValue = '15';
        } else {
            moveTotalValue = '0'; // reset to default value
        }
        $('#txtMoveTotal').val(moveTotalValue + "''");
        $('#txtMoveTotal').append("''");

        switch (actionUpgradeVal) {
            case 0: $('#txtActionTotal').val('1d6');
                break;
            case 1: $('#txtActionTotal').val('1d8');
                break;
            case 2: $('#txtActionTotal').val('1d10');
                break;
            case 3: $('#txtActionTotal').val('1d12');
                break;
        }

        if (unit_type == "flying_machine") {
            $('#txtMoveUpgrade').attr('max', '3');
        } else {
            $('#txtMoveUpgrade').attr('max', '2');
        }

        $('#txtMindTotal').val(mindUpgradeVal <= 0 ? '0' : mindUpgradeVal + 'd6');

        if (valueUpgradeVal <= 0) {
            $('#txtValueTotal').val(size);
            $('#structure_cost').val(size);
        } else {

            let valueUpgradeVal = parseFloat($('#txtValueUpgrade').val() || 0);
            let valueImpairment = calculateValueImpairment();
            let newSize;

            if (valueUpgradeVal <= 0) {
                newSize = size + valueImpairment;
            } else {
                newSize = size - 0.5 * valueUpgradeVal + valueImpairment;
                if (newSize < size * 0.25) {
                    newSize = size * 0.25;
                    $('#txtValueUpgrade').val(2 * (size - newSize));
                }
            }

            $('#structure_cost').val(newSize);
            $('#txtValueTotal').val(newSize);
        }

    }

    // Attach event handlers to all the upgrade inputs
    upgradeInputs.forEach(function (elem) {
        $(elem).on('input', function () {
            let previousValue = $(this).data('previousValue');
            let newValue = parseInt($(this).val()) || 0;
            let u_inches = parseInt($('#u_inches').val());
            let diff = newValue - previousValue;

            if (diff > u_inches) {
                alert("You cannot enter a number bigger than the available Unit Inches (Ü). Resetting to maximum available value.");
                newValue = u_inches + previousValue;
                $(this).val(newValue);
                diff = newValue - previousValue;
            }

            if (this.id === 'txtPowerUpgrade' && newValue > 2) {
                alert("Maximum Power Upgrade value is 2.");
                $(this).val(2);
                newValue = 2;
            }

            u_inches -= diff;
            u_inches = u_inches < 0 ? 0 : u_inches;
            $(this).data('previousValue', newValue);
            $('#u_inches').val(u_inches);
            updateFields();
            moc.structure.getArmorRating();
            calculate();
        });
    });

    function calculateValueImpairment() {
        let valueImpairment = parseInt($("#value_impairmentCheck").val()) || 0;

        if ($("#armor_impairmentCheck").is(":checked")) {
            valueImpairment++;
        }

        if ($("#power_impairmentCheck").is(":checked")) {
            valueImpairment++;
        }

        if ($("#speed_impairmentCheck").is(":checked")) {
            valueImpairment++;
        }

        if ($("#action_impairmentCheck").is(":checked")) {
            valueImpairment++;
        }

        return valueImpairment;
    }

    $("#armor_impairmentCheck, #power_impairmentCheck, #speed_impairmentCheck, #action_impairmentCheck").change(function () {
        let valueImpairment = calculateValueImpairment();

        // get original size
        let size = parseInt($('#structure_size').val());

        // get the current u_inches value
        let uinches = parseInt($('#u_inches').val());

        // Calculate the new u_inches value
        let new_uinches = uinches + 1;

        if (!this.checked) {
            valueImpairment--;
            new_uinches = uinches - 1;
        }

        // add the impairment to the existing total value and structure cost
        //$('#txtValueTotal').val(size + valueImpairment);
        //$('#structure_cost').val(size + valueImpairment);
        $('#u_inches').val(new_uinches);

        // store the new valueImpairment as the previousValue
        $("#value_impairmentCheck").data('previousValue', valueImpairment);
    });

    // When armor_impairmentCheck state changes
    $("#armor_impairmentCheck").change(function () {
        if (this.checked) {
            $('#txtAmorTotal').val('0');
            moc.structure.getArmorRating('0');
            calculate();
        } else {
            // ... call the function which calculates the normal armor value
            moc.structure.getArmorRating();
            updateFields();
            calculate();
        }
    });

    // When power_impairmentCheck state changes
    $("#power_impairmentCheck").change(function () {
        if (this.checked) {
            //let powerTotalString = $('#txtPowerAvailable').val();
            //let powerTotal = parseFloat(powerTotalString) / 2; // cut in half
            let powerTotal = parseInt($('#structure_size').val());
            $('#txtPowerAvailable').val(powerTotal);
        } else {
            // ... call the function which calculates the normal power value
            updateFields();
        }
    });

    let half_speed_flag = false;

    // When speed_impairmentCheck state changes
    $("#speed_impairmentCheck").change(function () {
        if (this.checked) {
            half_speed_flag = true;
        } else {
            half_speed_flag = false;
        }
    });

    let half_minded_flag = false;

    // When action_impairmentCheck state changes
    $("#action_impairmentCheck").change(function () {
        if (this.checked) {
            half_minded_flag = true;
            $('#txtActionTotal').val('1d6');
            $('#txtActionUpgrade').val('0').attr('disabled', true).change();
            $('#txtMindUpgrade').val('0').attr('disabled', true).change();
            $("#mind_table").show();
            $("#mind").prop('checked', true).change();
        } else {
            half_minded_flag = false;
            $('#txtActionTotal').val('1d6');
            $('#txtActionUpgrade').val('0').attr('disabled', false).change();
            $('#txtMindUpgrade').val('0').attr('disabled', false).change();
            $("#mind_table").hide();
            $("#mind").prop('checked', false).change();
        }
    });
    $("#value_impairmentCheck").data('previousValue', 0); // Initialize the previous value for value_impairmentCheck

    $("#value_impairmentCheck").on('input', function () {
        let valueImpairment = parseInt($(this).val()) || 0;
        let previousValueImpairment = $(this).data('previousValue');

        // Use the value in txtValueTotal instead of size for calculation
        let totalValue = parseFloat($('#txtValueTotal').val());
        let newSize = totalValue - previousValueImpairment + valueImpairment;

        let uinches = parseInt($('#u_inches').val());
        let new_uinches = (valueImpairment > previousValueImpairment) ?
            uinches + (valueImpairment - previousValueImpairment) :
            uinches - (previousValueImpairment - valueImpairment);

        $('#txtValueTotal').val(newSize);
        $('#structure_cost').val(newSize);
        console.log($('#structure_cost').val());
        $('#u_inches').val(new_uinches);

        $(this).data('previousValue', valueImpairment);

        calculate();
    });
});