import React from 'react';
import './App.css';
import Button from './components/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      compute: '0',
      decimalCount: 0,
      equalsWasLast: false,
      operationWasLast: false,
      blink: false,
    };
  }

  addNumber = (e) => {
    const value = e.target.value;
    const { display, compute, operationWasLast, equalsWasLast } = this.state;

    if (operationWasLast) {
      this.setState({
        display: value,
        compute: compute + value,
      });
    } else if (display === '0' || equalsWasLast) {
      this.setState({
        display: value,
        compute: value,
      });
    } else {
      this.setState({
        display: display + value,
        compute: compute + value,
      });
    }

    this.setState({
      equalsWasLast: false,
      operationWasLast: false,
    });
  };

  addDecimal = () => {
    const {
      display,
      compute,
      operationWasLast,
      equalsWasLast,
      decimalCount,
    } = this.state;

    if (decimalCount > 0) {
      return;
    } else if (equalsWasLast || display === '0') {
      this.setState({
        display: '0.',
        compute: '0.',
      });
    } else if (operationWasLast) {
      this.setState({
        display: '0.',
        compute: compute + '.',
      });
    } else {
      this.setState({
        display: display + '.',
        compute: compute + '.',
      });
    }

    this.setState({
      decimalCount: decimalCount + 1,
      equalsWasLast: false,
      operationWasLast: false,
    });
  };

  handleOperation = (e) => {
    this.blinkDisplay();

    const value = e.target.value;
    const display = this.state.display;

    this.setState({
      compute: display + value,
    });

    this.setState({
      equalsWasLast: false,
      operationWasLast: true,
      decimalCount: 0,
    });
  };

  handleClear = () => {
    this.blinkDisplay();

    this.setState({
      compute: '0',
      display: '0',
      decimalCount: 0,
      equalsWasLast: false,
      operationWasLast: false,
    });
  };

  handleEquals = () => {
    this.blinkDisplay();
    const display = this.state.display;
    let computation;

    if (this.state.operationWasLast) {
      computation = this.state.compute;
      computation += display;
    } else {
      computation = this.state.compute;
    }

    let compute = eval(computation);

    if (compute < 10000000000000) {
      this.setState({
        display: parseFloat(compute.toFixed(6)),
        compute: parseFloat(compute.toFixed(6)),
        decimalCount: 0,
        equalsWasLast: true,
      });
    } else {
      this.setState({
        display: compute.toExponential(5),
        compute: compute.toExponential(5),
        decimalCount: 0,
        equalsWasLast: true,
      });
    }
  };

  blinkDisplay = () => {
    this.setState({
      blink: true,
    });

    setTimeout(
      () =>
        this.setState({
          blink: false,
        }),
      50
    );
  };

  render() {
    const displayStyle = this.state.blink
      ? { color: 'white' }
      : { color: 'black' };

    return (
      <div id="container">
        <div id="calc-container">
          <div id="calc-btns">
            <div id="display" style={displayStyle}>
              {this.state.display}
            </div>
            <Button
              content="AC"
              className="number"
              id="clear"
              clickHandler={this.handleClear}
            />
            <Button
              content="."
              className="decimal-btn"
              id="decimal"
              clickHandler={this.addDecimal}
            />
            <Button
              content={0}
              value="0"
              className="number"
              id="zero"
              clickHandler={this.addNumber}
            />
            <Button
              content="X"
              value="*"
              className="operation"
              id="multiply"
              clickHandler={this.handleOperation}
            />

            <Button
              content={1}
              value="1"
              className="number"
              id="one"
              clickHandler={this.addNumber}
            />
            <Button
              content={2}
              value="2"
              className="number"
              id="two"
              clickHandler={this.addNumber}
            />
            <Button
              content={3}
              value="3"
              className="number"
              id="three"
              clickHandler={this.addNumber}
            />
            <Button
              content="-"
              value="-"
              className="operation"
              id="subtract"
              clickHandler={this.handleOperation}
            />
            <Button
              content={4}
              value="4"
              className="number"
              id="four"
              clickHandler={this.addNumber}
            />
            <Button
              content={5}
              value="5"
              className="number"
              id="five"
              clickHandler={this.addNumber}
            />
            <Button
              content={6}
              value="6"
              className="number"
              id="six"
              clickHandler={this.addNumber}
            />
            <Button
              content="+"
              value="+"
              className="operation"
              id="add"
              clickHandler={this.handleOperation}
            />
            <Button
              content={7}
              value="7"
              className="number"
              id="seven"
              clickHandler={this.addNumber}
            />
            <Button
              content={8}
              value="8"
              className="number"
              id="eight"
              clickHandler={this.addNumber}
            />
            <Button
              content={9}
              value="9"
              className="number"
              id="nine"
              clickHandler={this.addNumber}
            />
            <Button
              content="/"
              value="/"
              className="operation"
              id="divide"
              clickHandler={this.handleOperation}
            />
            <Button
              content="="
              value="="
              className="operation"
              id="equals-btn"
              clickHandler={this.handleEquals}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
