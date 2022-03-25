from flask import Flask
from flask import render_template
from flask import request
import math

app = Flask(__name__)

@app.route("/")
def default():
    return render_template(
        "calculator.html",
        sub_output = 0,
        main_output = "",
        output_history = []
    )

# assigning default entries to the lists
sub_calc_list = []
main_calc_list = ["0"]
output_history = []

operator_list = ["+", "-", "/", "*", "^"]

def adjusted_output():
    sub_output = "".join(sub_calc_list) # converting list to string
    output_replace = sub_output.replace("^", "**") # replacing power syntax so that equations can be evaluated
    return sub_output, output_replace

# resetting list
def reset_list():
    for i in range(0, len(sub_calc_list)):
        sub_calc_list.pop(0)
    main_calc_list.pop()
    main_calc_list.append("0")
    return;

# assigning evaluated output to empty lists
def reassign_list(main_output):
    reset_list()
    sub_calc_list.append(str(main_output))
    main_calc_list[0] = str(main_output)
    # Preventing overflow
    if len(output_history) == 18:
        output_history.pop()
    output_history.insert(0, str(main_output))
    return;

@app.route('/', methods = ['POST', 'GET'])
def calculator():
    if request.method == 'POST':
        calc_input = list(request.form.to_dict().values()) # converting button value to a list
        # Prevents user from selecting an operator if one was just selected
        if (calc_input[0] in operator_list or "=" in calc_input) and len(sub_calc_list) > 0 and sub_calc_list[len(sub_calc_list) - 1] in operator_list:
            sub_output = adjusted_output()[0]
            main_output = ""
        elif "=" in calc_input:
            try:
                sub_output = adjusted_output()[0]
                main_output = eval(adjusted_output()[1])
                reassign_list(main_output)
                
            except ValueError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except SyntaxError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except ZeroDivisionError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
        
        elif "sqrt(x)" in calc_input: 
            try:
                sub_output = math.sqrt(eval(adjusted_output()[1]))
                main_output = sub_output
                reassign_list(main_output)
                
            except ValueError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except SyntaxError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except ZeroDivisionError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()

        elif "x^2" in calc_input: 
            try:
                sub_output = math.pow(eval(adjusted_output()[1]), 2)
                main_output = sub_output
                reassign_list(main_output)

            except ValueError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except SyntaxError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except ZeroDivisionError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()

        elif "1/x" in calc_input: 
            try:
                sub_output = 1 / eval(adjusted_output()[1])
                main_output = sub_output
                reassign_list(main_output)

            except ValueError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except SyntaxError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except ZeroDivisionError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
        
        elif "+/-" in calc_input: 
            try:
                sub_output = -eval(adjusted_output()[1])
                main_output = sub_output
                reassign_list(main_output)
                
            except ValueError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except SyntaxError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
            except ZeroDivisionError:
                sub_output = ""
                main_output = "This operation is not allowed"
                reset_list()
                
        elif "C" in calc_input:
            sub_output = 0
            main_output = ""
            reset_list()

        elif "delete" in calc_input:
            # disables delete functionality if evaluated output is on both screens
            if sub_calc_list == main_calc_list:
                sub_output = adjusted_output()[0]
                main_output = "".join(main_calc_list)
            # leaves both screens blank if there is nothing to delete
            elif len(sub_calc_list) < 1:
                sub_output = ""
                main_output = ""
            else:
                sub_calc_list.pop()
                sub_output = adjusted_output()[0]

        elif "clear_history" in calc_input:
            for i in range(0, len(output_history)):
                output_history.pop(0)
            sub_output = adjusted_output()[0]
            main_output = "".join(main_calc_list)

        else:
            sub_calc_list.extend(calc_input)
            sub_output = adjusted_output()[0]
            # limiting the number of inputs the user can enter
            if len(sub_output) > 28:
                sub_calc_list.pop(len(sub_calc_list) - 1)
                sub_output = adjusted_output()[0]
                
        try:
            return render_template(
                "calculator.html",
                sub_output = sub_output,
                main_output = main_output,
                output_history = output_history
            )
        except UnboundLocalError:
            return render_template(
                "calculator.html",
                sub_output = sub_output,
                main_output = "",
                output_history = output_history
            )