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
