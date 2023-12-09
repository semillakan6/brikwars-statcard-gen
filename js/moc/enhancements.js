function handleInputChange() {
    // Call original calculate function
    calculate();
    updateUInchesValue();
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
        $('#txtPowerTotal').val((2 + parseInt(powerUpgradeVal)) + 'x');
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
            let newSize = size - 0.5 * valueUpgradeVal;
            if (newSize < size * 0.25) {
                newSize = size * 0.25;
                $('#txtValueUpgrade').val(size * 2 - newSize * 4); //new valueUpgrade formula
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
        });
    });

});