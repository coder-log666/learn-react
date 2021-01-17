import React, { Component, PureComponent } from 'react'

class Counter extends Component {

  render() {
    console.log('call---render');
    return (
      <div>
        <h2>当前计数器：{this.props.counter}</h2>
      </div>
    )
  }
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 20,
      counter2: 0
    }
  }
  render() {
    return (
      <div>
        <Counter counter={this.state.counter}></Counter>
        <hr/>
        <button onClick={e=>this.addCounter()}>触发Counter更新</button>
        <br/>
        <button onClick={e=>this.addCounter2()}>触发改变counter2</button>

      </div>
    )
  }

  addCounter() {
    this.setState({
      counter: this.state.counter+1
    })
  }
  addCounter2() {
    this.setState({
      counter2: this.state.counter2+1
    })
  }
}
