function add (a,b) {
	return a+b;
}

function subtract (a,b) {
	return a-b;
}

function divide (a,b) {                         //divides a per b

    if (b == 0) return 'Err0r';
    
	return a/b;
}

function multiply (a,b) {

	return a*b;
}

function sqrt(a) {

    if (a < 0) return 'Err0r';

	return Math.sqrt(a);
}

function numDigits(num) {                                           //math function to count number of digits before decimals     

    return Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
}

function operate (arr) {                                                             //[number, operator(string), number]

    let result;

    switch (arr[1]) {
        
        case '+':
            result = add(arr[0],arr[2]);
        break;

        case '-':
            result = subtract(arr[0],arr[2]);
        break;

        case '/':
            result = divide(arr[0],arr[2]);
        break;

        case '*':
            result = multiply(arr[0],arr[2]);
        break;

        case 's':
            result = sqrt(arr[0]);
        break;
    }

    if (result === 'Err0r') 
    {
        return result; 
    
    } else {    
        
        if (numDigits(result) > 12) 
        {
            return result; 

        } else {
        
            for (let i = 0; i <= 11; i++) {                                                   //rounds to match 12 digits on display
                if (numDigits(result) == (12-i)) return +result.toFixed(i); 
            }
        }
    }
}

const display = document.querySelector('.display');
const clearButton = document.querySelector('#C');

let pressedButton;
let inputValues = [];
let checkDisplayClear;
let currentValue;
let replacedNumber;

function resetQueue() {
    inputValues = [];
}

function clearDisplay() {
    display.textContent = '0';
    checkDisplayClear = false;
}                        

function isThereADot(str) {                                                             //checks for a dot on a string

    return str.indexOf('.') < 0 ? false : true;
}

const buttons = document.querySelectorAll('.singleButton');
buttons.forEach(button => button.addEventListener('click', calculatorFunction));

function calculatorFunction(e) {
    
    pressedButton = Array.from(e.target.id);                                            //gets array from id of element clicked to determine action


    if (pressedButton.length == 4) {                                                    //checks if pressedButton is a number (id == numX)
        
        if (checkDisplayClear) clearDisplay();

        if (display.textContent === '0')  display.textContent = '';                     //overwriting zero from clear display

        if (Array.from(display.textContent).length > 11) {                              //if its bigger than 12 digits, starts substituting number entered
            replacedNumber = Array.from(display.textContent);
            replacedNumber.shift();
            replacedNumber.push(pressedButton[3]);

            if (replacedNumber[0] === '.') replacedNumber.shift();                      //removes the dot if its alone before the number

            display.textContent = replacedNumber.join('');

        } else {

            display.textContent += pressedButton[3];     
        }
            if (inputValues.length == 0 || inputValues.length == 1) inputValues[0] = Number(display.textContent);

            if (inputValues.length == 2 || inputValues.length == 3) inputValues[2] = Number(display.textContent);
           
        clearButton.textContent = 'C';                                   
    }

    switch (pressedButton[0]) {
        case '/':
        case '*':
        case '+':
        case '-':

            if (inputValues.length == 3) {                                                              //checks if there is already a number and an operation in queue        
                
                    currentValue = operate(inputValues);

                    if (numDigits(currentValue) > 12)                                                   //transforms big numbers into exponential form, so it doenst expand the display
                    {
                        display.textContent = currentValue.toExponential(2);
                    } else {
                        display.textContent = currentValue;
                    }
                    
                    clearButton.textContent = 'CE';

                    if (currentValue === 'Err0r') {                                                     //checks if math function returns Err0r
                        currentValue = 0;
                        resetQueue();
                    
                    } else {

                        resetQueue();                                                           

                        inputValues.push(currentValue);                                     //queues the result for next operation
                        inputValues.push(pressedButton[0]);                                 //queues the operation again    
                    }

            } else if (inputValues.length == 2){

                inputValues[1] = pressedButton[0];

            } else if (inputValues.length == 1){

                inputValues.push(pressedButton[0]);

            } else {                                                                        //after a resetQueue for instance

                inputValues.push(Number(display.textContent));
                inputValues.push(pressedButton[0]);
            }

            checkDisplayClear = true;

        break;

        case '=':                                                                       //follows the same logic but doesnt queue operation, just the result

            if (inputValues.length == 3) {                                  

                currentValue = operate(inputValues);

                if (numDigits(currentValue) > 12)                                                   //transforms big numbers into exponential form, so it doenst expand the display
                    {
                        display.textContent = currentValue.toExponential(2);
                    } else {
                        display.textContent = currentValue;
                    }

                clearButton.textContent = 'CE';

                if (currentValue === 'Err0r') {                                         //checks if math function returns Err0r
                    currentValue = 0;
                    resetQueue();
                
                } else {

                    resetQueue();                                                           
                    inputValues.push(currentValue);                                     //queues the result for next operation
                }
                checkDisplayClear = true;
            }

        break;

        case 'C':
            if (inputValues.length == 3) {                                               //num, operation and num in queue
                
                clearDisplay();
                inputValues[2] = 0;

            } else {                                                                     //1 number || 1 number and operation
                resetQueue();                                             
                clearDisplay();
            }
            
            clearButton.textContent = 'CE';

        break;
    
        case 's':                                                                       
            
            if (inputValues.length == 1 || inputValues.length == 2) {              //logic similar to operator but takes only 1 number to solve
                
                if (inputValues.length == 2) inputValues[1] = pressedButton[0];

                if (inputValues.length == 1) inputValues.push(pressedButton[0]);

                currentValue = operate(inputValues);
                
                if (numDigits(currentValue) > 12)                                                   //transforms big numbers into exponential form, so it doenst expand the display
                    {
                        display.textContent = currentValue.toExponential(2);
                    } else {
                        display.textContent = currentValue;
                    }
                   
                clearButton.textContent = 'CE';

                    if (currentValue === 'Err0r') {                                     //checks if math function returns Err0r
                        currentValue = 0;
                        resetQueue();
                    
                    } else {

                        resetQueue();                                                           
                        inputValues.push(currentValue);                                 //queues the result for next operation
                    }
            
            }

            checkDisplayClear = true;

        break;

        case 'm':
        
            let index;

            if (inputValues.length == 3) index = 2;                            

            if (inputValues.length == 2 || inputValues.length == 1) index = 0; 

            inputValues[index] = inputValues[index]*(-1);                                             //changes the signal of last number on queue
                
            numDigits(inputValues[index]) > 12 ? display.textContent = inputValues[index].toExponential(2) : display.textContent = inputValues[index];         //transforms big numbers into exponential form, so it doenst leak in the display

        break;
        
        case '.':

            if (inputValues.length > 0) {

                if (!isThereADot(display.textContent))  display.textContent += '.';
            }            

            if (inputValues.length == 0) {

                if (!isThereADot(display.textContent))  display.textContent = '0.';
            }    

        break;
    }   
}   