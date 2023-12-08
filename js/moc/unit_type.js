$(document).ready(function () {
    // Listen for the change of radio buttons.
    // Hides both sections initially.
    $("#amor_input").hide();
    $("#enhancements").hide();
    $("#propulsion_table").show();

    // Show the section based on the checked radio button on page load.
    let initialSelectedType = $("input[name='type_attr']:checked").val();
    if (initialSelectedType == 'default') {
        $("#amor_input").show();
        $("#propulsion_table").show();
    } else if (initialSelectedType == 'enhanced') {
        $("#enhancements").show();
        $("#propulsion_table").hide();
    }

    // This code handles the functionality for unit_type select dropdown irrespective of the radio button selected.
    $("#unit_type").on('change', function () {
        let selectedUnitType = $(this).val();

        const typeArray = ['minifig', 'hero_minifig', 'greatleader_minifig', 'horse'];

        if (typeArray.includes(selectedUnitType)) {
            $("input[name='type_attr'][value='default']").prop("checked", true).change();
        }

        handleUnitType(selectedUnitType);
        calculate();
    });

    $("input:radio[name='type_attr']").change(function () {
        // Hide both sections again.
        $("#amor_input").hide();
        $("#enhancements").hide();
        $("#propulsion_table").hide();

        // Show appropriate section according to the selected radio button value.
        if (this.value == 'default') {
            $("#amor_input").show();
            $("#propulsion_table").show();
            handleUnitType($("#unit_type").val());
        } else if (this.value == 'enhanced') {
            $("#enhancements").show();
            $("#propulsion_table").hide();
        }
    });

    function handleUnitType(selectedUnitType) {
        switch (selectedUnitType) {
            case 'minifig':
                setSelectedValues('1', true, true, '4', '1', true, true, 5, 0);
                $('#statcard_damagetable').prop('checked', false).change();
                break;
            case 'hero_minifig':
                setSelectedValues('2', true, true, '2d6', '2', true, true, 7, 0);
                $('#statcard_damagetable').prop('checked', false).change();
                break;
            case 'greatleader_minifig':
                setSelectedValues('2', true, true, '4', '2', true, true, 5, 0);
                $('#statcard_damagetable').prop('checked', false).change();
                break;
            case 'horse':
                setSelectedValues('1', true, true, '4', '1', true, true, 10, 0);
                $('#statcard_damagetable').prop('checked', false).change();
                break;
            case 'creature':
                setSelectedValues('3', false, true, '2d10', '2', true, true, 4, 0);
                $('#statcard_damagetable').prop('checked', false).change();
                break;
            case 'flying_creature':
                setSelectedValues('2', false, true, '4', '0.5', true, true, 0, 5);
                $('#statcard_damagetable').prop('checked', false).change();
                break;
            case 'vehicle':
            case 'structure':
                setSelectedValues('2', false, false, '', '0.5', false, true, 0, 0);
                break;
            case 'flying_machine':
                setSelectedValues('2', false, false, '', '0.5', false, true, 0, 5);
                break;
        }
    }

    function setSelectedValues(size, disable, custom_armor, armor, level, available, custom_move, propulsion, flight) {
        $("#structure_size").val(size).prop("disabled", disable);
        $("input[name='custom_armor']").prop("checked", custom_armor).change();
        $("#armor").val(armor);
        $("#structure_level").val(level);
        if ($("input[name='type_attr']:checked").val() == 'enhanced' && available) {
            $("input[name='type_attr'][value='default']").prop("checked", true).change();
        }

        $("input[name='type_attr'][value='enhanced']").prop("disabled", available);

        // Set 'prop_ground' checkbox and input
        $("#prop_ground").prop("checked", custom_move).prop("disabled", disable);
        $("input[name='prop_ground_speed']").val(propulsion).prop("disabled", disable).change();

        // Set 'prop_flying' checkbox and input
        $("input[name='prop_flying']").prop("checked", custom_move).prop("disabled", disable);
        $("input[name='prop_flying_speed']").val(flight).prop("disabled", disable).change();

        
        
    }
});