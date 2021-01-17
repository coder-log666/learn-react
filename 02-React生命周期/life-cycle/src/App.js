import React, { Component } from 'react'

export const MyContext = React.createContext({
  num: 0,
  age:10,
  bigObj: null,
});
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      age: 20
    }
    console.log('call---constructor');
  }

  UNSAFE_componentWillMount() {
    console.log('call----UNSAFE_componentWillMount');
  }

  UNSAFE_componentWillUpdate() {

  }

  UNSAFE_componentWillReceiveProps() {
    
  }

  //每次render前都会调用该方法
  // static getDerivedStateFromProps(nextProps, currentState) {
  //   console.log('call---getDerivedStateFromProps');
  // }

  componentDidMount() {
    console.log('call---componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState, nextContext){
    console.log('call---shouldComponentUpdate');
    return true;
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   // return {
  //   //   age: 40
  //   // }
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('call---componentDidUpdate');
  }

  // 卸载
  componentWillUnmount() {
    console.log('call---componentWillUnmount');
  }

  render() {
    console.log('call---render');
    return (
      <div>
        <h2>当前计数器：{this.state.counter}</h2>
        <button onClick={(e)=>this.addOne(e)}>更新组件</button>
      </div>
    )
  }

  addOne(e) {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

Counter.contextType = MyContext;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCounter: true,
      age: false,
    }
  }
 
  render() {
    const num = 1;
    const bigObj = {name: "lijiang"}
    const age = this.state.age;
    return (
      <div>
        <MyContext.Provider value={{num,age, bigObj}}>
          {this.state.showCounter && <Counter age={this.state.age}/>}
        </MyContext.Provider>
        <hr/>
        <button onClick={e=>this.changeShowCounter(e)}>{this.state.showCounter ? "卸载" : "挂载"}</button>
        <button onClick={e=>this.addAge(e)}>age+1</button>
      </div>
    )
  }

  addAge(e) {
    this.setState({
      age: this.state.age+1
    })
  }
  changeShowCounter(e) {
    this.setState({
      showCounter: !this.state.showCounter
    })
  }
}
