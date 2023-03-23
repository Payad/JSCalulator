class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // this.currentOperand = number;
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+': computation = prev + current;
            break
            case '-': computation = prev - current;
            break
            case '*': computation = prev * current;
            break
            case '÷': computation = prev / current;
            break
            default:
                return 
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
       
       const floatNumber = number.toString();

       let displayScreen
        const integerDigits = parseFloat(floatNumber.split('.')[0]);
        const decimalDigits = floatNumber.split('.')[1];

        if(isNaN(integerDigits)) {
            displayScreen = ''
        } else {
            displayScreen = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
       
        if(decimalDigits != null) {
            return `${displayScreen}.${decimalDigits}`
        } else {
            return displayScreen
        }
        // const floatNumber = parseFloat(number);
        // if (isNaN(floatNumber)) {
        //     return '';
        // } else {
        //     return floatNumber.toLocaleString('en')
        // }

    }

    updateDisplay() {
        if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClear = document.querySelector('[data-allClear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
        // console.log(btn.innerText)
    })
})

operationButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    })
})

allClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})