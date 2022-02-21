let calcArr = [];

// query selectors
const buttons = document.querySelectorAll('.button');

// event listeners
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(e.target.value);
        calcArr.push(parseInt(e.target.value));
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