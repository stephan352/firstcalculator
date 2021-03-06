class Calculator {
    constructor(upperline, lowerline) {
        this.lefthandinput = upperline[0]
        this.oper = upperline[1]
        this.righthandinput = upperline[2]

        this.lowerline = lowerline;
        this.clear();
    }

    clear() {
        this.lefthandinput.innerText = "";
        this.oper.innerText = "";
        this.righthandinput.innerText = "";

        this.lowerline.innerText = "";
    }

    append_number(number) {
        if (!this.oper.innerText) {
            if (["+", "-", "x", "÷"].includes(number)) {
                if (this.lefthandinput.innerText) {
                    this.oper.innerText = number;
                } else if (!this.lefthandinput.innerText) {
                    return
                }
            } else if (number == ".") {
                if (!this.lefthandinput.innerText.includes(".")) {
                    this.lefthandinput.append(".")
                } else return;
            } else {this.lefthandinput.append(number)};
        } else if (this.oper.innerText) {
            if (["+", "-", "x", "÷"].includes(number)) {
                return
            } else if (number == ".") {
                if (!this.righthandinput.innerText.includes(".")) {
                    this.righthandinput.append(".")
                } else return;
            } else this.righthandinput.append(number)
        }
    }

    delete() {
        if (this.righthandinput.innerText) {
            this.righthandinput.innerText = this.righthandinput.innerText.slice(0, -1)
        } else if (this.oper.innerText) {
            this.oper.innerText = ""
        } else if (this.lefthandinput.innerText) {
            this.lefthandinput.innerText = this.lefthandinput.innerText.slice(0, -1)
        }
    }

    compute() {
        if (this.oper.innerText == "+") {
            let answer = Number(this.lefthandinput.innerText) + Number(this.righthandinput.innerText);
            this.lowerline.innerText = answer;
        } else if (this.oper.innerText == "-") {
            let answer = Number(this.lefthandinput.innerText) - Number(this.righthandinput.innerText);
            this.lowerline.innerText = String(answer);
        } else if (this.oper.innerText == "x") {
            let answer = Number(this.lefthandinput.innerText)*Number(this.righthandinput.innerText);
            this.lowerline.innerText = String(answer);
        } else if (this.oper.innerText == "÷") {
            let answer = Number(this.lefthandinput.innerText)/Number(this.righthandinput.innerText);
            this.lowerline.innerText = String(answer);
        }
    }
}

const numberButton = document.querySelectorAll('[number]');
const operandButton = document.querySelectorAll('[operand]');
const clearButton = document.querySelector('[clear]');
const delButton = document.querySelector('[delete]');
const equalsButton = document.querySelector('[equals]');
const secondoperand = document.querySelector('[secondline]');
const input = [document.querySelector('[lefthand]'), document.querySelector('[symbol]'), document.querySelector('[righthand]')];


const calculator = new Calculator(input, secondoperand);

numberButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.append_number(button.innerText);
    })
})

clearButton.addEventListener("click", () => {
    calculator.clear();
})

operandButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.append_number(button.innerText);
    })
})

delButton.addEventListener("click", () => {
    calculator.delete();
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
})