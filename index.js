const calcArr = [];
let calcInput = '';
const operations = {
    add: (a, b) => {
        return a + b;
    },
    subtract: (a, b) => {
        return a - b;
    },
    multiply: (a, b) => {
        return a * b;
    },
    divide: (a, b) => {
        return a / b;
    }
}

// query selectors
// button query selectors
const buttons = document.querySelectorAll('.button');
const buttonOperators = document.querySelectorAll('.button-operator');
const buttonEquals = document.getElementById('equals');

// event listeners
// select numbers for equation
buttons.forEach(button => {

    button.addEventListener('click', (e) => {
        calcInput = calcInput + e.target.value;
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
        return calcInput = '';
    });
});

// select final number for equation and equate
buttonEquals.addEventListener('click', () => {
    calcArr.push(parseInt(calcInput));
    console.log(operate(calcArr[0], calcArr[1], calcArr[2]));
});

const operate = (operator, a, b) => {
    return operations[operator](a, b);
};