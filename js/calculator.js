// First of all, formattingnya beneran perlu dibenerin, ada yang pake semicolon ada yang engga gitu lumayan ga enak dibacanya.
// tiba tiba ada else statement else {} yang isinya di line yang sama juga dibacanya sakit
// terus tiba tiba ada else yang ga pake {} langsung inline itu juga dibacanya sakit
// Bisa consider pake this tool: https://prettier.io/


class Calculator {
    // equation dan answer probably a better naming dari upperline dan lowerline
    constructor(upperline, lowerline) {
        // leftHandInput mungkin lebih enak dibaca
        this.lefthandinput = upperline[0]
        this.oper = upperline[1]
        // rightHandInput mungkin lebih enak dibaca
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

    // javascript conventionnya camelCase bukan snake_case
    append_number(number) {
        // Generally structure
        // if (!x) {
        // } else {
        // }
        // tidak direkomendasikan, prefer structure
        // if (x) {
        // } else {
        // }
        // Human brain lebih gampang baca kalau ga dinegasi, gunakan negasi kalau bener2 diperlukan aja
        if (!this.oper.innerText) {
            if (["+", "-", "x", "÷"].includes(number)) {
                if (this.lefthandinput.innerText) {
                    this.oper.innerText = number;
                //unneccessary if
                } else if (!this.lefthandinput.innerText) {
                    return
                }
            // avoid == kalo javascript, selalu pake === (coba cek apa bedanya)
            } else if (number == ".") {
                if (!this.lefthandinput.innerText.includes(".")) {
                    this.lefthandinput.append(".")
                } else return;
            // tanda komamya salah tempat.....
            } else {this.lefthandinput.append(number)};
            // unneccessary if, kalo ga !this.oper.innerText berarti this.oper.innerText kan....
        } else if (this.oper.innerText) {
            if (["+", "-", "x", "÷"].includes(number)) {
                return
            } else if (number == ".") {
                // Duplicated, mungkin if else condition structurenya perlu dibenerin lagi
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
        // lots of duplicated statement, mungkin calculate answernya bisa dilakukan in a separate function
        // Number(this.lefthandinput.innerText) sama yang righthandinputnya bisa diekstrak ke separate variable
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

// Im not sure kenapa ini semua pake attribute ya, mending pake class atau id ga sih
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