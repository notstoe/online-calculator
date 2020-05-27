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

function operate (arr) {                                    //[number, operator(string), number]

    switch (arr[1]) {
        
        case '+':
            return add(arr[0],arr[2]);
        break;

        case '-':
            return subtract(arr[0],arr[2]);
        break;

        case '/':
            return divide(arr[0],arr[2]);
        break;

        case '*':
            return multiply(arr[0],arr[2]);
        break;

        case 's':
            return sqrt(arr[0]);
        break;

        case 'm':
            return arr[0]*(-1);
        break;
    }

}

const containerCalculator = document.querySelector('.containerCalculator');
let buttonNumber;

for (let i = 0; i < 10; i++) {                                                      //creating number buttons

    buttonNumber = document.createElement('button');
    buttonNumber.setAttribute('id', `num${i}`);
    buttonNumber.textContent = i;
    buttonNumber.classList.add('singleButton');
    containerCalculator.appendChild(buttonNumber);
}

const display = document.querySelector('.display');
const clearButton = document.querySelector('#C');
let pressedButton;
let inputValues = [];
let checkDisplayClear;
let currentValue;
let lastButtonPressed;
let temp;

function resetQueue() {
    inputValues = [];
}

function clearDisplay() {
    display.textContent = '0';
    checkDisplayClear = false;
}

const buttons = document.querySelectorAll('.singleButton');
buttons.forEach(button => button.addEventListener('click', (e) => {
    
    pressedButton = Array.from(e.target.id);                                            //gets array from id of element clicked to determine action


    if (pressedButton.length == 4) {                                                    //checks if pressedButton is a number (id == numX)
        
        if (checkDisplayClear) clearDisplay();

        if (display.textContent === '0')  display.textContent = '';                     //overwriting zero from clear display

        display.textContent += pressedButton[3];     
        lastButtonPressed = 'number';
        clearButton.textContent = 'C';                                   
    }

    if (lastButtonPressed === 'number' || lastButtonPressed === 'equal' || lastButtonPressed === 'clear' || lastButtonPressed === 'plusminus') {            

        switch (pressedButton[0]) {
            case '/':
            case '*':
            case '+':
            case '-':

                if (inputValues.length == 2) {                                                  //checks if there is already a number and an operation in queue        
                    
                        inputValues.push(Number(display.textContent));
                        currentValue = operate(inputValues);
                        display.textContent = currentValue;
                        clearButton.textContent = 'CE';

                        if (currentValue === 'Err0r') {                                         //checks if math function returns Err0r
                            currentValue = 0;
                            resetQueue();
                        
                        } else {

                            resetQueue();                                                           

                            inputValues.push(currentValue);                                     //queues the result for next operation
                            inputValues.push(pressedButton[0]);                                 //queues the operation again    
                        }

                } else if (inputValues.length == 1){

                    inputValues.push(pressedButton[0]);

                } else {
                    
                    inputValues.push(Number(display.textContent));
                    inputValues.push(pressedButton[0]);}

                checkDisplayClear = true;
                lastButtonPressed = 'operator';

            break;

            case '=':                                                                       //follows the same logic but doesnt queue operation, just the result

                if (inputValues.length == 2) {                                  

                    inputValues.push(Number(display.textContent));
                    currentValue = operate(inputValues);
                    display.textContent = currentValue;
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

                lastButtonPressed = 'equal';

            break;

            case 'C':
                if (lastButtonPressed !== 'equal') {                                        //if last pressed is number
                    clearDisplay();

                } else {                                                                    //if last pressed is equal or clear
                    clearDisplay();
                    resetQueue();
                }

                clearButton.textContent = 'CE';
                lastButtonPressed = 'clear';
                
            break;
        
            case 's':                                                                       //falls here when lastButtonPressed is number, equal or clear      
                        resetQueue();                                                       //logic similar to operator but takes only 1 number to solve
                        inputValues.push(Number(display.textContent));
                        inputValues.push(pressedButton[0]);
                        currentValue = operate(inputValues);
                        display.textContent = currentValue;
                        clearButton.textContent = 'CE';

                        if (currentValue === 'Err0r') {                                     //checks if math function returns Err0r
                            currentValue = 0;
                            resetQueue();
                        
                        } else {

                            resetQueue();                                                           
                            inputValues.push(currentValue);                                 //queues the result for next operation
                        }
                
                checkDisplayClear = true;
                lastButtonPressed = 'equal';                                                //same logic as equal just changes operation
            break;

            case 'm':
            
                if (lastButtonPressed === 'equal' || lastButtonPressed === 'plusminus') {

                    resetQueue();
                    inputValues[0] = Number(display.textContent)*(-1);                      //queues new value
                    display.textContent = inputValues[0];

                }

            lastButtonPressed = 'plusminus';

            break;
        } 
    } else {                                                                                 //comes here only if lastButtonPressed === 'operator'

        switch (pressedButton[0]) {
            
            case '/':
            case '*':
            case '+':
            case '-':
                
                if (inputValues.length > 1) {
                    if (inputValues[1] !== pressedButton[0]) inputValues[1] = pressedButton[0];                   
                
                } else if (display.textContent === '0') {
                    
                    inputValues.push(Number(display.textContent));
                    inputValues.push(pressedButton[0]);
                }
                
                lastButtonPressed = 'operator';

            break;

            case 'C':
            
                clearDisplay();
                resetQueue();

                clearButton.textContent = 'CE';
                lastButtonPressed = 'clear';

            break;

            case 's':
            
                if (inputValues.length > 1) {
                        
                        resetQueue();                                                       
                        inputValues.push(Number(display.textContent));
                        inputValues.push('s');
                        currentValue = operate(inputValues);
                        display.textContent = currentValue;
                        clearButton.textContent = 'CE';

                        if (currentValue === 'Err0r') {                                     //checks if math function returns Err0r
                            currentValue = 0;
                            resetQueue();
                        
                        } else {

                            resetQueue();                                                           
                            inputValues.push(currentValue);                                 //queues the result for next operation
                        }
                
                checkDisplayClear = true;
                lastButtonPressed = 'equal';                                                //for code purpose, same logic as after equal is pressed
                }    

            break;

            case '=':
                return;
            break;
        }
    
    }   
}));
