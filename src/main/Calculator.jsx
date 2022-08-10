import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  // O construtor é um método especial para criar e
  // inicializar um objeto criado a partir de uma classe.
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  // Essa função vai limpar o display da calculadora
  clearMemory() {
    this.setState({ ...initialState });
  }

  // alterar o current (indice do array) de 0 para 1
  // receber a operação
  // marcar flag para 'true' para limpar o display
  // mudar a operação
  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
        const equals = operation==='='
        const currentOperation=this.state.operation

        const values=[...this.state.values]

// A função eval() computa um código JavaScript 
// representado como uma string.
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
        values[1]=0
        this.setState({
            displayValue:values[0],
            operation:equals?null:operation,
            current:equals?0:1,
            clearDisplay:!equals,
            values,
        })
    }
  }
  // Lógica dada caso o input seja um número
  // validar se o numero não possue 2 "."
  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    // se o input for diferente de '.':
    // *alterar o estado da aplicação
    // *passar o valor para a constante newValue
    // *adicionar o valor ao array values
    // *pegar indice do array
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
      console.log(values);
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
