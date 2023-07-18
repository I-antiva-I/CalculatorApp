var currentOperand=         "";
var previousOperand=        "";
var currentOperator=        "";


function onDigitPressed(digit)
{
    if ((digit == "0") && (currentOperand.length!=1))
    {
        currentOperand+= digit;
    
    } 
    else if (currentOperand!="0")
    {
        currentOperand+= digit;
    }
    else
    {
        currentOperand= digit;
    }

    displayOnScreen();
}


function onOperatorPressed(operator)
{
    switch(operator) 
    {
        case "=":
            if (previousOperand != "" &&  currentOperator != "")
            {
                result =    performOperation(currentOperator);
                if (result != undefined)
                {
                    currentOperand = result.toString();
                    previousOperand = "";
                    currentOperator= "";
                }
            }
            break; 
        case ".":
            if(!currentOperand.includes("."))
            {
                currentOperand+= ".";
            }
            break;  
        default:
            if (previousOperand != "" &&  currentOperator != "")
            {
                result =    performOperation(operator);
                if (result != undefined)
                {
                    previousOperand = result.toString();
                    currentOperand = "0";
                }
                currentOperator= operator;
            }
            else
            {
                previousOperand = currentOperand || "0";
                currentOperand = "0";
                currentOperator= operator;
            }     
    }
    displayOnScreen();
}


function performOperation(operator)
{
    result = undefined;

    switch(operator) 
    {
        case "+":
            result = parseFloat(previousOperand) + parseFloat(currentOperand);
            break;
        case "-":
            result = parseFloat(previousOperand) - parseFloat(currentOperand);
            break;
        case "x":
            result = parseFloat(previousOperand) * parseFloat(currentOperand);
            break;
        case "/":
            if (parseFloat(currentOperand)!=0)
            {
                result = parseFloat(previousOperand) / parseFloat(currentOperand);
            }
            else
            {
                alert("Division by Zero!");
            }
            break; 
        default:
    }

    return result;
}


function displayOnScreen()
{
    var screenPrimary =     document.getElementById("screen-primary");
    var screenSecondary =   document.getElementById("screen-secondary");

    screenPrimary.innerHTML =       prepareForDisplay(currentOperand);
    screenSecondary.innerHTML =     prepareForDisplay(previousOperand, true) + currentOperator;
}


function prepareForDisplay(stringValue="", isForSecondary=false)
{
    var parts = stringValue.split(".");

    var integerPart =           parts[0];
    var fractionalPart =        parts[1];

    var preparedIntegerlPart =      "";
    var preparedFractionalPart =    "";

    var separator = " ";

    if (fractionalPart != undefined)
    {
        if ((fractionalPart.length == 0) && (isForSecondary))
        {
            preparedFractionalPart="0";
        }
        else
        {
            preparedFractionalPart=fractionalPart;
        }

    }


    var reversed = integerPart.split('').reverse().join('');
    var counter= 0;
    for (var digit of reversed)
    {
        preparedIntegerlPart=digit+preparedIntegerlPart;
        counter++;
        if (counter % 3 ==0)
        {
            preparedIntegerlPart=separator+preparedIntegerlPart;
        }
    }
    preparedIntegerlPart=preparedIntegerlPart.trim();

    if (fractionalPart != undefined)
    {
        return preparedIntegerlPart+"."+preparedFractionalPart;
    }
    else
    {
        return preparedIntegerlPart;
    }

}


function onControlPressed(control)
{
    switch(control)
    {
        case "DELETE":
            if (currentOperand == "0")
            {
                currentOperand=previousOperand;
                previousOperand="";
                currentOperator="";
            
            }
            else
            {
                currentOperand = currentOperand.slice(0, -1); 
                if(currentOperand == "") 
                {
                    currentOperand="0";
                }
            }
            break;
        case "RESET":
            previousOperand=""
            currentOperator="";
            currentOperand="";
            break;
        default:
    }

    displayOnScreen();
}



