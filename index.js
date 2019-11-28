const calculator = document.querySelector("#calculator");
const formulaScreen = document.querySelector("#formula-screen");
const outputScreen = document.querySelector("#output-screen");
const equalOperator = document.querySelector("#equals");
const allClear = document.querySelector("#ac");
const evaluate = document.querySelector("#equals");

let previousOperand = "";
let currentOperand = "";
let mathOperator = undefined;

function doAllClear() {
  formulaScreen.value = "";
  outputScreen.value = "0";
  mathOperator = undefined;
  previousOperand = "";
  currentOperand = "";
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function appendMathOperator(operator) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    evaluateExpression();
  }
  mathOperator = operator;
  previousOperand = currentOperand;
  currentOperand = "";
}

function evaluateExpression() {
  let result;
  const previousValue = parseFloat(previousOperand);
  const currentValue = parseFloat(currentOperand);
  switch (mathOperator) {
    case "%":
      result = previousValue % currentValue;
      break;
    case "/":
      result = previousValue / currentValue;
      break;
    case "*":
      result = previousValue * currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "+":
      result = previousValue + currentValue;
      break;
    default:
      return;
  }
  currentOperand = result;
  mathOperator = undefined;
  previousOperand = "";
}

function updateDisplay() {
  outputScreen.value = currentOperand;
  if (mathOperator) {
    formulaScreen.value = `${previousOperand} ${mathOperator}`;
  } else {
    formulaScreen.value = "";
  }
}

calculator.addEventListener("click", e => {
  if (e.target.matches("button.button")) {
    let clickedButton = e.target.value;

    switch (clickedButton) {
      case "AC":
        console.log("all clear");
        doAllClear();
        break;
      case "%":
      case "/":
      case "*":
      case "-":
      case "+":
        console.log("append a math operator");
        appendMathOperator(clickedButton);
        updateDisplay();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        console.log("append a number");
        appendNumber(clickedButton);
        updateDisplay();
        break;
      case "=":
        console.log("evaluate the expression");
        evaluateExpression();
        updateDisplay();
        break;
      default:
        console.log("something went wrong");
    }
  }
});
