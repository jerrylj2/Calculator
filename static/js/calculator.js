// Changes button color on click
function mDown(obj) {
    obj.style.backgroundColor = "#40d84c";
}

// Changes button color on click release
function mUp(obj) {
    obj.style.backgroundColor="white";
}

// Changes button color on mouse over
function mOver(obj) {
    obj.style.backgroundColor="grey";
}

// Changes button color on mouse out
function mOut(obj) {
    obj.style.backgroundColor="white";
}

// Solves equation that is in string format
function parse(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

// Replaces '^' with '**' so that JS can answer equation
function convert_equation(obj) {
    let converted_equation = obj.replace("^", "**");
    return converted_equation;
}

// Displays button input 
function display_input(obj) {
    let calc_input = document.getElementById("sub_output");
    if(calc_input.innerHTML == "Infinity"){
    calc_input.innerHTML = obj.getAttribute('value'); // Restarting input if previous output is infinity
    } else if(calc_input.innerHTML.length > 24){
    null; // Limiting the number of inputs a user can enter
    } else {
    calc_input.innerHTML = calc_input.innerHTML + obj.getAttribute('value'); // Concatenating current input with the previous input
    }
}

// Solves equation
function solve(obj) {
    let sub_calc_output = document.getElementById("sub_output");
    let main_calc_output = document.getElementById("main_output");
    let sub_calc_output_value = sub_calc_output.innerHTML;
    let output_history = document.getElementById("output_history");
    let operation = obj.getAttribute('value');
    
    switch (operation) {
    case "sqrt(x)":
        try {
        sub_calc_output_value = parse("(" + convert_equation(sub_calc_output_value) + ")**.5");
        if(isNaN(sub_calc_output_value)) throw "This operation is not allowed";
        sub_calc_output.innerHTML = sub_calc_output_value;
        main_calc_output.innerHTML = sub_calc_output_value;
        add_output_row(output_history, sub_calc_output_value);
        }
        catch(err) {
        sub_calc_output.innerHTML = null;
        main_calc_output.innerHTML = "This operation is not allowed";
        }
        break;

    case "x^2":
        try {
        sub_calc_output_value = parse("(" + convert_equation(sub_calc_output_value) + ")**2");
        if(isNaN(sub_calc_output_value)) throw "This operation is not allowed";
        sub_calc_output.innerHTML = sub_calc_output_value;
        main_calc_output.innerHTML = sub_calc_output_value;
        add_output_row(output_history, sub_calc_output_value);
        }
        catch(err) {
        sub_calc_output.innerHTML = null;
        main_calc_output.innerHTML = "This operation is not allowed";
        }
        break;

    case "1/x":
        try {
        sub_calc_output_value = parse("1/(" + convert_equation(sub_calc_output_value) + ")");
        if(isNaN(sub_calc_output_value)) throw "This operation is not allowed";
        sub_calc_output.innerHTML = sub_calc_output_value;
        main_calc_output.innerHTML = sub_calc_output_value;
        add_output_row(output_history, sub_calc_output_value);
        }
        catch(err) {
        sub_calc_output.innerHTML = null;
        main_calc_output.innerHTML = "This operation is not allowed";
        }
        break;

    case "+/-":
        try {
        sub_calc_output_value = parse("-1*(" + convert_equation(sub_calc_output_value) + ")");
        if(isNaN(sub_calc_output_value)) throw "This operation is not allowed";
        sub_calc_output.innerHTML = sub_calc_output_value;
        main_calc_output.innerHTML = sub_calc_output_value;
        add_output_row(output_history, sub_calc_output_value);
        }
        catch(err) {
        sub_calc_output.innerHTML = null;
        main_calc_output.innerHTML = "This operation is not allowed";
        }
        break;

    case "C":
        sub_calc_output_value = null;
        sub_calc_output.innerHTML = sub_calc_output_value;
        main_calc_output.innerHTML = sub_calc_output_value;
        break;

    case "delete":
        if(sub_calc_output_value.length > 0){
        sub_calc_output_value = sub_calc_output_value.slice(0, sub_calc_output_value.length - 1);
        sub_calc_output.innerHTML = sub_calc_output_value;
        }
        break;
        
    case "=":
        try {
        sub_calc_output_value = parse(convert_equation(sub_calc_output_value));
        if(isNaN(sub_calc_output_value)) throw "This operation is not allowed";
        sub_calc_output.innerHTML = sub_calc_output_value;
        main_calc_output.innerHTML = sub_calc_output_value;
        add_output_row(output_history, sub_calc_output_value);
        }
        catch(err) {
        sub_calc_output.innerHTML = null;
        main_calc_output.innerHTML = "This operation is not allowed";
        }
    }
}

function add_output_row(output_history, sub_calc_output_value) {
    if(output_history.innerHTML == ""){
        // Add first row to output table
        output_history.innerHTML = "<tr><td>" + sub_calc_output_value + "</td></tr>";
        } else if(document.getElementsByTagName("tr").length < 18){
        // Add subsequent row to output table
        output_history.innerHTML = "<tbody><tr><td>" + sub_calc_output_value + "</td></tr></tbody>" +
        output_history.innerHTML;
        } else {
        // Limiting the number of rows in the output table; Removes last row, Adds new row as the first row
        output_history.removeChild(output_history.lastElementChild);
        output_history.innerHTML = "<tbody><tr><td>" + sub_calc_output_value + "</td></tr></tbody>" +
        output_history.innerHTML;
    }
}

// Clears output history table
function clear_output_history() {
    let output_history = document.getElementById("output_history");
    output_history.innerHTML = null;
}