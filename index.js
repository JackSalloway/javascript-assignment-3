const calcArr = [];
let calcInput = '';
let result = undefined;
const operations = {
    add: (a, b) => {
        return result = a + b;
    },
    subtract: (a, b) => {
        return result = a - b;
    },
    multiply: (a, b) => {
        return result = a * b;
    },
    divide: (a, b) => {
        return result = a / b;
    }
}
let symbol = ''

// query selectors
// button query selectors
const buttons = document.querySelectorAll('.button');
const buttonOperators = document.querySelectorAll('.button-operator');
const buttonEquals = document.getElementById('equals');

const screenTop = document.querySelector('.screen-top');
const screenBottom = document.querySelector('.screen-bottom');

// event listeners
// select numbers for equation
buttons.forEach(button => {

    button.addEventListener('click', (e) => {
        calcInput = calcInput + e.target.value;
        updateBottomScreen();
    });
});

// select operator for equation
buttonOperators.forEach(button => {
    button.addEventListener('click', (e) => {
        if (calcArr.length === 2) {
            return;
        }
        calcArr.push(e.target.id);
        calcArr.push(parseInt(calcInput));
        calcInput = ''
        updateTopScreen();
        return calcInput;
    });
});

// select final number for equation and equate
buttonEquals.addEventListener('click', () => {
    calcArr.push(parseInt(calcInput));
    operate(calcArr[0], calcArr[1], calcArr[2]);
    completeEquation();
});

// unsure how to do this a better way, so added this function in for now
const symbolDecider = () => {
    if (calcArr[0] === 'add') {
        symbol = '+';
    } else if (calcArr[0] === 'subtract') {
        symbol = '-';
    } else if (calcArr[0] === 'multiply') {
        symbol = 'x';
    } else if (calcArr[0] === 'divide') {
        symbol = '÷';
    } else {
        console.log('There is an issue with the operator object');
    }
}

const updateTopScreen = () => {
    symbolDecider();
    return screenTop.textContent = `${calcArr[1]} ${symbol}`;
};

const updateBottomScreen = () => {
    return screenBottom.textContent = calcInput;
};

const completeEquation = () => {

    screenTop.textContent = `${calcArr[1]} ${symbol} ${calcArr[2]} =`;
    screenBottom.textContent = result;
};

const operate = (operator, a, b) => {
    return operations[operator](a, b);
};