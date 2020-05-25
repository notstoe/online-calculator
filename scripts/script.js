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
let pressedButton;
let inputValues = [];
let checkDisplayClear;
let currentValue;
let lastButtonPressed = '';

function clearDisplay() {
    display.textContent = '';
    checkDisplayClear = false;
}

const buttons = document.querySelectorAll('.singleButton');
buttons.forEach(button => button.addEventListener('click', (e) => {
    
    pressedButton = Array.from(e.target.id);                                            //gets array from id of element clicked to determine action


    if (pressedButton.length == 4) {                                                    //checks if pressedButton is a number (id == numX)
        
        if (checkDisplayClear) clearDisplay();

        display.textContent += pressedButton[3];     
        lastButtonPressed = 'number';                                   
    }

    if (lastButtonPressed === 'number') {

        switch (pressedButton[0]) {
            case '/':
            case '*':
            case '+':
            case '-':

                if (inputValues.length == 2) {                                              //checks if there is already a number and an operation in queue        
                    
                        inputValues.push(Number(display.textContent));
                        currentValue = operate(inputValues[0], inputValues[1], inputValues[2]);
                        inputValues = [];                                                       //clears the queue
                        display.textContent = currentValue;

                        inputValues.push(currentValue);                                         //queues the result for next operation
                        inputValues.push(pressedButton[0]);                                     //queues the operation again    

                } else {

                    inputValues.push(Number(display.textContent));
                    inputValues.push(pressedButton[0]);

                }

                checkDisplayClear = true;
                lastButtonPressed = 'operator';

            break;

            case '=':                                                                       //follows the same logic but doesnt queue operation, just the result

                if (inputValues.length == 2) {                                  

                    inputValues.push(Number(display.textContent));
                    currentValue = operate(inputValues[0], inputValues[1], inputValues[2]);
                    inputValues = [];
                    display.textContent = currentValue;

                    inputValues.push(currentValue);
                    checkDisplayClear = true;
                }

            break;
        

        } 
    } else {

        switch (pressedButton[0]) {
            
            case '/':
                
                if (inputValues.length > 1) {
                    if (inputValues[1] !== '/') inputValues[1] = '/';                   
                }
                
            break;
        
        }
    
    }   
}));

