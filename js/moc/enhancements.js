function handleInputChange() {
    // Call original calculate function
    calculate();
    updateUInchesValue();
}

function updateUInchesValue() {
    let structureSizeInput = document.getElementById('structure_size').value;
    let uInchesInput = document.getElementById('u_inches');

    // Ensures Enhanced Attributes is selected
    if (document.getElementById('enhanced_attr').checked) {
        let value = Math.min(Math.max(parseInt(structureSizeInput), 1), 5);
        
        // If structureSizeInput is a number then value will be the number else it will be NaN
        if(!isNaN(value)){
            uInchesInput.value = value;
        }
    }
}