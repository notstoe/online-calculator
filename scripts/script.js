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

function operate (a,operator,b) {

    switch (operator) {
        
        case '+':
            return add(a,b);
        break;

        case '-':
            return subtract(a,b);
        break;

        case '/':
            return divide(a,b);
        break;

        case '*':
            return multiply(a,b);
        break;

        case '':
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

        if (display.textContent === '0') display.textContent = '';                      //overwriting zero from clear display

        display.textContent += pressedButton[3];     
        lastButtonPressed = 'number';
        clearButton.textContent = 'C';                                   
    }

    if (lastButtonPressed === 'number' || lastButtonPressed === 'equal' || lastButtonPressed === 'clear') {            

        switch (pressedButton[0]) {
            case '/':
            case '*':
            case '+':
            case '-':

                if (inputValues.length == 2) {                                                  //checks if there is already a number and an operation in queue        
                    
                        inputValues.push(Number(display.textContent));
                        currentValue = operate(inputValues[0], inputValues[1], inputValues[2]);
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

                } else if (lastButtonPressed === 'equal'){

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
                    currentValue = operate(inputValues[0], inputValues[1], inputValues[2]);
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
        
            case 's':                                                                      //falls here when lastButtonPressed is number, equal or clear      

                        resetQueue();                                                       //logic similar to equal but takes only 1 number to solve
                        inputValues.push(Number(display.textContent));
                        currentValue = sqrt(inputValues[0]);
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

        } 
    } else {                                                            //comes here only if lastButtonPressed === 'operator'

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
                        currentValue = sqrt(inputValues[0]);
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
                lastButtonPressed = 'equal';
                }    

            break;

        }
    
    }   
}));

