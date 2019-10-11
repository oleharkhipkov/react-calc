import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compute: "0",
      display: "0",
      decimalCount: 0,
      freshEquals: false
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.addDec = this.addDec.bind(this);
    this.handleOp = this.handleOp.bind(this);
  }
  handleClear() {
    this.setState({
      compute: "0",
      display: "0",
      decimalCount: 0,
      freshEquals: false
    });
    this.blinkDisplay();
  }
  blinkDisplay() {
    let display = document.getElementById("display");
    display.style.color = "white";
    setTimeout(() => (display.style.color = "black"), 50);
  }
  handleOp(e) {
    this.blinkDisplay();
    let compute = this.state.compute;
    let display = this.state.display;
    if (display == "0") {
      return;
    }
    switch (compute[compute.length - 1]) {
      case "-":
      case "+":
      case "*":
      case "/":
        return;
        break;
      default: {
        this.addNumber(e);
      }
    }
  }
  addDec(e) {
    if (this.state.decimalCount == 0) {
      this.addNumber(e);
    }
    this.setState({
      decimalCount: this.state.decimalCount + 1
    });
  }

  addNumber(e) {
    let value = e.target.value;
    let display = this.state.display;
    let compute = this.state.compute;
    if (this.state.freshEquals == true && e.target.className == "number") {
      this.setState({
        display: value,
        compute: value,
        freshEquals: false
      });
    } else if (this.state.freshEquals == true && value == ".") {
      this.setState({
        display: "0.",
        compute: "0.",
        freshEquals: false
      });
    } else if (display == 0 && value == ".") {
      this.setState({
        display: 0 + ".",
        compute: 0 + ".",
        freshEquals: false
      });
    } else if (
      (compute[compute.length - 1] == "*" ||
        compute[compute.length - 1] == "/" ||
        compute[compute.length - 1] == "-" ||
        compute[compute.length - 1] == "+") &&
      display == "0."
    ) {
      this.setState({
        display: value,
        compute: value
      });
    } else if (
      (compute[compute.length - 1] == "*" ||
        compute[compute.length - 1] == "/" ||
        compute[compute.length - 1] == "-" ||
        compute[compute.length - 1] == "+") &&
      value == "."
    ) {
      this.setState({
        display: 0 + ".",
        compute: compute + value
      });
    } else if (display == "0." && e.target.className == "operand") {
      this.setState({
        compute: display + value
      });
    } else if (
      (compute[compute.length - 1] == "*" ||
        compute[compute.length - 1] == "/" ||
        compute[compute.length - 1] == "-" ||
        compute[compute.length - 1] == "+") &&
      display === "0."
    ) {
      this.setState({
        compute: value,
        display: value
      });
    } else if (display == "0.") {
      this.setState({
        display: display + value,
        compute: compute + value,
        freshEquals: false
      });
    } else if (display == "0") {
      this.setState({
        display: value,
        compute: value,
        freshEquals: false
      });
    } else if (value == "." && this.state.decimalCount > 0) {
      return;
    } else if (e.target.className == "operand") {
      this.setState({
        compute: display + value,
        freshEquals: false,
        decimalCount: 0
      });
    } else if (
      compute[compute.length - 1] == "*" ||
      compute[compute.length - 1] == "/" ||
      compute[compute.length - 1] == "-" ||
      compute[compute.length - 1] == "+"
    ) {
      this.setState({
        display: value,
        compute: compute + value
      });
    } else {
      this.setState({
        display: display + value,
        compute: compute + value,
        freshEquals: false
      });
    }
  }
  handleEquals() {
    this.blinkDisplay();
    var compute = eval(this.state.compute);
    if (compute < 10000000000000) {
      this.setState({
        display: parseFloat(compute.toFixed(6)),
        compute: parseFloat(compute.toFixed(6)),
        freshEquals: true,
        decimalCount: 0
      });
    } else {
      this.setState({
        display: compute.toExponential(5),
        compute: compute.toExponential(5),
        freshEquals: true,
        decimalCount: 0
      });
    }
  }

  render() {
    const numbers = [];
    return (
      <div id="container">
        <div id="calc-container">
          <div id="calc-buttons">
            <div id="display">{this.state.display}</div>
            <button className="number" id="clear" onClick={this.handleClear}>
              AC
            </button>
            <button
              className="decimalBtn"
              id="decimal"
              value="."
              onClick={this.addDec}
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
              className="operand"
              id="multiply"
              value="*"
              onClick={this.handleOp}
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
              className="operand"
              id="subtract"
              value="-"
              onClick={this.handleOp}
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
              className="operand"
              id="add"
              value="+"
              onClick={this.handleOp}
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
              className="operand"
              id="divide"
              value="/"
              onClick={this.handleOp}
            >
              /
            </button>
            <button
              className="operand"
              id="equals"
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
