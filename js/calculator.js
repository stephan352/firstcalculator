class Calculator {
    constructor(upperline, lowerline) {
        this.upperline = upperline
        this.lowerline = lowerline
        this.clear()
    }

    clear() {
        this.upperline.innerText = ""
        this.lowerline.innerText = ""
        this.operation = undefined
    }

    append_number(number) {
        if (number == "." && this.upperline.innerText.includes(number)) {
            return
        } else if (["+", "-", "x", "÷"].includes(number)) {
            if (!this.operation) {
                this.operation = number
                this.upperline.append(number)
            }
        } else this.upperline.append(number)
    }
}

const numberButton = document.querySelectorAll('[number]')
const operandButton = document.querySelectorAll('[operand]')
const clearButton = document.querySelector('[clear]')
const delButton = document.querySelector('[delete]')
const equalsButton = document.querySelectorAll('[equals]')
const firstoperand = document.querySelector('[firstline]')
const secondoperand = document.querySelector('[secondline]')

const calculator = new Calculator(firstoperand, secondoperand)

numberButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.append_number(button.innerText)
    })
})

clearButton.addEventListener("click", () => {
    calculator.clear()
})

operandButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.append_number(button.innerText)
    })
})