import { useState } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

const MAX_DIGITS = 14;

const Calculator = () => {
  const [sum, setSum] = useState('');
  const [hasError, setHasError] = useState(false);

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', 'CE'
  ];

const handleClick = (button) => {
  if (hasError) {
    setHasError(false);
    setSum('');
  } else if (button === '=') {
    try {
      const result = evaluate(sum);
      setSum(result.toString().slice(0, MAX_DIGITS));
    } catch (error) {
      setHasError(true);
      setSum('Error');
    }
  } else if (button === 'C') {
    if (typeof sum === 'string') {
      setSum(sum.slice(0, -1));
    } else {
      setSum('');
    }
  } else if (button === 'CE') {
    setSum('');
  } else if (/[*\-+/]/.test(button)) {
    if (/[*\-+/]$/.test(sum)) {
      setSum(sum.slice(0, -1) + button);
    } else {
      setSum(sum + button);
    }
  } else if (button === '.') {
    const lastNumIndex = sum.split(/[*\-+/]/).pop().lastIndexOf('.');
    if (lastNumIndex === -1) {
      setSum(sum + button);
    } else if (sum.slice(lastNumIndex + 1).indexOf('.') === -1) {
      setSum(sum + button);
    }
  } else {
    const lastNum = sum.split(/[*\-+/]/).pop();
    if (lastNum.length < MAX_DIGITS) {
      setSum(sum + button);
    } else {
      setHasError(true);
      setSum('Error');
    }
  }
}

  return (
    <div className={`calculator${hasError ? ' error' : ''}`}>
      <div className="display">{sum || 0}</div>
      <div className="button-container">
        {buttons.map((button) => (
          <button key={button} onClick={() => handleClick(button)}>{button}</button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;