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
        
            if (inputValues.length == 0) inputValues[0] = Number(display.textContent);

            if (inputValues.length == 2) inputValues[2] = Number(display.textContent);
        
        clearButton.textContent = 'C';                                   
    }

    switch (pressedButton[0]) {
        case '/':
        case '*':
        case '+':
        case '-':

            if (inputValues.length == 3) {                                                  //checks if there is already a number and an operation in queue        
                
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
                display.textContent = currentValue;
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
        
            if (inputValues.length == 3) {                                              //changes the signal of last number on queue

                inputValues[2] = inputValues[2]*(-1);
                display.textContent = inputValues[2];
            }
            if (inputValues.length == 2 || inputValues.length == 1) {

                inputValues[0] = inputValues[0]*(-1);
                display.textContent = inputValues[0];
            }

        break;  
    }   
}));

