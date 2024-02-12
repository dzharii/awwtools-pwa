
let currentInput = '';
let previousInput = '';
let operation = null;

function press(key) {
  const screen = document.getElementById('calculator-screen');

  if (key >= '0' && key <= '9') {
    if (currentInput === '0') {
      currentInput = key;
    } else {
      currentInput += key;
    }
    screen.textContent = currentInput;
  } else if (key === 'C') {
    currentInput = '';
    previousInput = '';
    operation = null;
    screen.textContent = '0';
  } else if (key === '=') {
    if (operation && previousInput && currentInput) {
      currentInput = String(evaluate(operation, previousInput, currentInput));
      screen.textContent = currentInput;
      operation = null;
      previousInput = '';
    }
  } else {
    if (currentInput) {
      if (operation) {
        currentInput = String(evaluate(operation, previousInput, currentInput));
        screen.textContent = currentInput;
      }
      previousInput = currentInput;
      currentInput = '';
    }
    operation = key;
  }
}

function evaluate(operation, prev, curr) {
  const prevNum = parseFloat(prev);
  const currNum = parseFloat(curr);

  switch (operation) {
    case '+':
      return prevNum + currNum;
    case '-':
      return prevNum - currNum;
    case '*':
      return prevNum * currNum;
    case '/':
      if (currNum === 0) {
        alert('Cannot divide by zero.');
        return 0;
      }
      return prevNum / currNum;
    default:
      return 0;
  }
}

// Draggable functionality
const calculator = document.getElementById('calculator');
const titleBar = document.getElementById('title-bar');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - calculator.offsetLeft;
  offsetY = e.clientY - calculator.offsetTop;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
  if (!isDragging) return;
  calculator.style.left = `${e.clientX - offsetX}px`;
  calculator.style.top = `${e.clientY - offsetY}px`;
}

function onMouseUp() {
  isDragging = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}


