$(document).ready(function () {
    // Listen for the change of radio buttons.
    // Hides both sections initially.
    $("#amor_input").hide();
    $("#enhancements").hide();

    // Show the section based on the checked radio button on page load.
    let initialSelectedType = $("input[name='type_attr']:checked").val();
    if (initialSelectedType == 'default') {
        $("#amor_input").show();
    } else if (initialSelectedType == 'enhanced') {
        $("#enhancements").show();
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

        // Show appropriate section according to the selected radio button value.
        if (this.value == 'default') {
            $("#amor_input").show();
            handleUnitType($("#unit_type").val());
        } else if (this.value == 'enhanced') {
            $("#enhancements").show();
        }
    });

    function handleUnitType(selectedUnitType) {
        switch (selectedUnitType) {
            case 'minifig':
                setSelectedValues('1', true, '4', '1', true);
                break;
            case 'hero_minifig':
                setSelectedValues('2', true, '2d6', '2', true);
                break;
            case 'greatleader_minifig':
                setSelectedValues('2', true, '4', '2', true);
                break;
            case 'horse':
                setSelectedValues('1', false, '4', '1', true);
                break;
            case 'vehicle':
            case 'flying_machine':
            case 'creature':
            case 'flying_creature':
            case 'structure':
                setSelectedValues('2', false, '', '0.5', false);
                break;
        }
    }

    function setSelectedValues(size, disable, armor, level, available) {
        $("#structure_size").val(size).prop("disabled", disable);
        $("input[name='custom_armor']").prop("checked", disable).change();
        $("#armor").val(armor);
        $("#structure_level").val(level);
        if ($("input[name='type_attr']:checked").val() == 'enhanced' && available) {
            $("input[name='type_attr'][value='default']").prop("checked", true).change();
        }
    
        $("input[name='type_attr'][value='enhanced']").prop("disabled", available);
    }
});