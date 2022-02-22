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

        if (result) {
            calcArr.push(e.target.id);
            calcInput = '';
            symbolDecider();
            updateTopScreen();
            return;
        }
        calcArr.push(parseInt(calcInput));
        calcArr.push(e.target.id);
        calcInput = ''
        updateTopScreen();
        // return calcInput;
    });
});

// select final number for equation and equate
buttonEquals.addEventListener('click', () => {
    calcArr.push(parseInt(calcInput));
    operate(calcArr[1], calcArr[0], calcArr[2]);
    completeEquation();
});

// unsure how to do this a better way, so added this function in for now
const symbolDecider = () => {
    if (calcArr[1] === 'add') {
        symbol = '+';
    } else if (calcArr[1] === 'subtract') {
        symbol = '-';
    } else if (calcArr[1] === 'multiply') {
        symbol = 'x';
    } else if (calcArr[1] === 'divide') {
        symbol = '÷';
    } else {
        console.log('There is an issue with the operator object');
    }
}

// function that runs the actual calculations
const operate = (operator, a, b) => {
    return operations[operator](a, b);
};

// dom manipulation functions - things that update the stuff on screen
const updateTopScreen = () => {
    symbolDecider();
    if (result) {
        return screenTop.textContent = `${result} ${symbol}`;
    }
    return screenTop.textContent = `${calcArr[0]} ${symbol}`;
};

const updateBottomScreen = () => {
    return screenBottom.textContent = calcInput;
};

const completeEquation = () => {
    screenTop.textContent = `${calcArr[0]} ${symbol} ${calcArr[2]} =`;
    screenBottom.textContent = result;
    while (calcArr.length > 0) {
        calcArr.pop()
    }
    calcArr.push(result);
};