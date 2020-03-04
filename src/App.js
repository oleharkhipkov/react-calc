import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      compute: "0",
      decimalCount: 0,
      equalsWasLast: false,
      operationWasLast: false,
      blink: false
    };
  }

  addNumber = e => {
    const value = e.target.value;
    const { display, compute, operationWasLast, equalsWasLast } = this.state;

    if (operationWasLast) {
      this.setState({
        display: value,
        compute: compute + value
      });
    } else if (display === "0" || equalsWasLast) {
      this.setState({
        display: value,
        compute: value
      });
    } else {
      this.setState({
        display: display + value,
        compute: compute + value
      });
    }

    this.setState({
      equalsWasLast: false,
      operationWasLast: false
    });
  };

  addDecimal = () => {
    const {
      display,
      compute,
      operationWasLast,
      equalsWasLast,
      decimalCount
    } = this.state;

    if (decimalCount > 0) {
      return;
    } else if (equalsWasLast || display === "0") {
      this.setState({
        display: "0.",
        compute: "0."
      });
    } else if (operationWasLast) {
      this.setState({
        display: "0.",
        compute: compute + "."
      });
    } else {
      this.setState({
        display: display + ".",
        compute: compute + "."
      });
    }

    this.setState({
      decimalCount: decimalCount + 1,
      equalsWasLast: false,
      operationWasLast: false
    });
  };

  handleOperation = e => {
    this.blinkDisplay();

    const value = e.target.value;
    const display = this.state.display;

    this.setState({
      compute: display + value
    });

    this.setState({
      equalsWasLast: false,
      operationWasLast: true,
      decimalCount: 0
    });
  };

  handleClear = () => {
    this.blinkDisplay();

    this.setState({
      compute: "0",
      display: "0",
      decimalCount: 0,
      equalsWasLast: false,
      operationWasLast: false
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
        equalsWasLast: true
      });
    } else {
      this.setState({
        display: compute.toExponential(5),
        compute: compute.toExponential(5),
        decimalCount: 0,
        equalsWasLast: true
      });
    }
  };

  blinkDisplay = () => {
    this.setState({
      blink: true
    });

    setTimeout(
      () =>
        this.setState({
          blink: false
        }),
      50
    );
  };

  render() {
    const displayStyle = this.state.blink
      ? { color: "white" }
      : { color: "black" };

    return (
      <div id="container">
        <div id="calc-container">
          <div id="calc-btns">
            <div id="display" style={displayStyle}>
              {this.state.display}
            </div>
            <button className="number" id="clear" onClick={this.handleClear}>
              AC
            </button>
            <button
              className="decimal-btn"
              id="decimal"
              value="."
              onClick={this.addDecimal}
            >
              .
            </button>
            <button
              className="number"
              id="zero"
              value="0"
              onClick={this.addNumber}
            >
              0
            </button>
            <button
              className="operation"
              id="multiply"
              value="*"
              onClick={this.handleOperation}
            >
              X
            </button>
            <button
              className="number"
              id="one"
              value="1"
              onClick={this.addNumber}
            >
              1
            </button>
            <button
              className="number"
              id="two"
              value="2"
              onClick={this.addNumber}
            >
              2
            </button>
            <button
              className="number"
              id="three"
              value="3"
              onClick={this.addNumber}
            >
              3
            </button>
            <button
              className="operation"
              id="subtract"
              value="-"
              onClick={this.handleOperation}
            >
              -
            </button>
            <button
              className="number"
              id="four"
              value="4"
              onClick={this.addNumber}
            >
              4
            </button>
            <button
              className="number"
              id="five"
              value="5"
              onClick={this.addNumber}
            >
              5
            </button>
            <button
              className="number"
              id="six"
              value="6"
              onClick={this.addNumber}
            >
              6
            </button>
            <button
              className="operation"
              id="add"
              value="+"
              onClick={this.handleOperation}
            >
              +
            </button>
            <button
              className="number"
              id="seven"
              value="7"
              onClick={this.addNumber}
            >
              7
            </button>
            <button
              className="number"
              id="eight"
              value="8"
              onClick={this.addNumber}
            >
              8
            </button>
            <button
              className="number"
              id="nine"
              value="9"
              onClick={this.addNumber}
            >
              9
            </button>
            <button
              className="operation"
              id="divide"
              value="/"
              onClick={this.handleOperation}
            >
              /
            </button>
            <button
              className="operation"
              id="equals-btn"
              value="="
              onClick={this.handleEquals}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
