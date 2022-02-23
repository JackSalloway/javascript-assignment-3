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
const prevValues = [];

// query selectors
// button query selectors
const buttons = document.querySelectorAll('.button');
const buttonOperators = document.querySelectorAll('.button-operator');
const buttonEquals = document.getElementById('equals');
const buttonReset = document.getElementById('reset');
const buttonBack = document.getElementById('back');

const screenTop = document.querySelector('.screen-top');
const screenBottom = document.querySelector('.screen-bottom');

// event listeners

// reset all variable values and Element inner text
buttonReset.addEventListener('click', () => {
    while (calcArr.length > 0) {
        calcArr.pop();
    }
    while (prevValues.length > 0) {
        prevValues.pop();
    }
    calcInput = '';
    result = undefined;
    symbol = '';
    screenTop.textContent = '';
    screenBottom.textContent = '';
    console.log('Calculator cleared!');
});

// select numbers for equation
buttons.forEach(button => {

    button.addEventListener('click', (e) => {
        if (calcInput.includes('.') && e.target.value === '.') {
            return;
        }
        if (calcInput === '0' && e.target.value === '0') {
            return
        }
        calcInput = calcInput + e.target.value;
        if (result && !calcArr[1]) {
            calcArr.push(prevValues[0]);
            calcInput = e.target.value;
        }
        updateBottomScreen();
    });
});

buttonBack.addEventListener('click', () => {
    if (calcInput === '') {
        console.log('No input to remove.');
        return;
    }

    if (result && calcInput == prevValues[1]) {
        console.log('Calculator is displaying old input, to remove values select a new input');
        return;
    }

    calcInput = calcInput.substring(0, calcInput.length - 1);
    updateBottomScreen();
});

// select operator for equation
buttonOperators.forEach(button => {
    button.addEventListener('click', (e) => {
        // early return if first number and operator have been selected
        if (calcArr.length === 2 && calcInput !== '') {
            calcArr.push(parseFloat(calcInput));
            operate(calcArr[1], calcArr[0], calcArr[2]);
            completeEquation();
        }

        if (calcArr.length === 2) {
            return;
        }
        // checks if one calculation has already been completed
        if (result || result === 0) {
            calcArr.push(e.target.id);
            calcInput = '';
            symbolDecider();
            updateTopScreen();
            // prevents using previous values
            if (prevValues.length > 0) {
                while (prevValues.length > 0) {
                    prevValues.pop()
                }
            }
            return;
        }

        // checks if the inputted number is an integer or not
        if (parseFloat(calcInput) - parseInt(calcInput, 10) !== 0) {
            calcArr.push(parseFloat(calcInput));
        } else {
            calcArr.push(parseInt(calcInput, 10));
        }
        calcArr.push(e.target.id);
        calcInput = ''
        updateTopScreen();
    });
});

// select final number for equation and equate
buttonEquals.addEventListener('click', () => {
    if (calcArr.length < 1) {
        console.log('select a number/operator');
        return;
    }

    if (!calcArr[1] && prevValues.length > 0) {
        // prevents chaining new calcInput value on the end of the old one
        if (prevValues[1] !== parseInt(calcInput, 10)) {
            prevValues[1] = parseInt(calcInput, 10);
        }
        operate(prevValues[0], calcArr[0], prevValues[1]);
        completeEquation();
        return;
    }
    // why use parseInt over parseFloat??
    calcArr.push(parseFloat(calcInput));
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
    // 9 + 10 logic(meme)
    // if (calcArr[0] == 9 && symbol == '+' && calcArr[2] == 10) {
    //     screenTop.textContent = `${calcArr[0]} ${symbol} ${calcArr[2]} =`;
    //     screenBottom.textContent = 21;
    //     return;
    // }
    if (symbol === '÷' && calcArr[2] === 0) {
        screenTop.textContent = 'Bruh';
        screenBottom.textContent = 'What the hell bruh';
        return
    }
    // checks if using quick calculate functionality with previous values
    if (!calcArr[1] && prevValues.length > 0) {
        screenTop.textContent = `${calcArr[0]} ${symbol} ${prevValues[1]} =`;
        screenBottom.textContent = result;
    } else {
        screenTop.textContent = `${calcArr[0]} ${symbol} ${calcArr[2]} =`;
        screenBottom.textContent = result;
        prevValues.push(calcArr[1], calcArr[2]);
    }

    while (calcArr.length > 0) {
        calcArr.pop()
    }
    calcArr.push(result);
};