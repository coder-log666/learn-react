import React, { Component } from 'react'

class Counter extends Component {
    render() {
        console.log('call---render');
        return (
            <div>
                <h2>随机数：{Math.random()}</h2>
                <button onClick={()=>{this.forceUpdate()}}>强制刷新</button>
            </div>
        )
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