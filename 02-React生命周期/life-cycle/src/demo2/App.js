import React, { Component } from 'react'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }
    render() {
        console.log('call---render');
        return (
            <div>
                <h2>当前计数器：{this.state.counter}</h2>
                <button onClick={()=>{this.addOne()}}>增加1</button>
            </div>
        )
    }

    addOne() {
        this.setState({
            counter: this.state.counter + 1
        })
    }
}
export default class App extends Component {
  render() {
    return (
      <div>
        <Counter></Counter>
      </div>
    )
  }
}
