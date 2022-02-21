let calcArr = [];
let calcInput = '';

// query selectors
const buttons = document.querySelectorAll('.button');
const buttonOperators = document.querySelectorAll('.button-operator');


// event listeners
buttons.forEach(button => {

    button.addEventListener('click', (e) => {
        console.log(e.target.value);
        calcInput = calcInput + e.target.value;
        console.log(calcInput);
        // calcArr.push(parseInt(e.target.value));
    });
});

buttonOperators.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(e);
        calcArr.push(parseInt(calcInput));
        return calcInput = '';
    });
});

const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};

const operate = (operator, a, b) => {
    return operator(a, b);
};