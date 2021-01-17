### 问题

1. 什么操作会触发组件的重新渲染。
2. 详细描述React的生命周期。
3. 在使用上有哪些注意点。

### 组件渲染

当我们的网页要响应用户的操作，或者响应网络回调都需要重新刷新页面，以便显示新的数据。渲染组件最终反应在React中就是调用组件中的`render()`方法。

通常以下三种操作会触发组件的渲染操作：

1. 属性值发生变更。
2. 状态值发生变更。
3. 强制更新。

#### 属性值发生变更触发刷新

```react
import React, { Component } from 'react'

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
      counter: 20
    }
  }
  render() {
    return (
      <div>
        <Counter counter={this.state.counter}></Counter>
        <hr/>
        <button onClick={e=>this.addCounter()}>触发Counter更新</button>
      </div>
    )
  }

  addCounter() {
    this.setState({
      counter: this.state.counter+1
    })
  }
}
```

阅读上面代码：我们可以知道`Counter` 组件接收一个属性`counter`。当传入的`counter`值变更的时候`Counter` 组件会跟着更新。需要注意的是，这种方式的触发我们也可以理解为父组件的render触发导致子组件的render触发。看一下如下代码：

```react
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
```

相比于第一份代码，父组件的state里多了一个`counter2`，点击`触发改变counter2`a按钮会变更`state`中`counter2`的值，但不会触发`counter`的变更，从控制台中我们可以看到`Counter`组件`render`方法里面的`    console.log('call---render');`依然被执行到了。所以说父组件的渲染会触发子组件的渲染。但是从性能优化的角度，这种场景下是不应该触发`Counter`组件的渲染的，我们可以通过将`Counter`组件继承自`PureComponent`来进行优化。这里不具体展开讲了。

####  状态值发生变更触发刷新

这种方式其实很好理解，上面的代码其实已经涉及到了。但还是举个例子。

```react
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
```

上面代码中`Counter`组件内部维护值`state`，界面上显示的是`state`中的`counter`。每次调用`setState`变更`counter`都会触发组件渲染。

#### 强制刷新

```react
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
```

如上代码，点击强制刷新按钮，调用`forceUpdate`方法，会强制刷新当前组件，重新调用`render`方法，产生新的随机数。

了解完组件触发渲染的三种方式之后，我们来详细了解一下React组件的生命周期。

### 组件生命周期

下面表达了组件在整个运行期间所经历的生命周期阶段以及调用的相关方法。

<img src="https://riverli.oss-cn-beijing.aliyuncs.com/riverli/image-20210109202314443.png" alt="image-20210109202314443"  />

从上图中可以看出，组件生命周期可以分为三个阶段：

- 挂载阶段
- 更新阶段
- 卸载阶段

#### 挂载阶段

相关方法：

- constructor— 构造方法，一般我们会在改方法里面做一些初始化操作，如：初始化state的默认值。
- getDerivedStateFromProps—该方法的存在只有一个目的，就是让组件在props变化时更新到state上。该方法接收两个参数。
- nextProps—传入的props, 当前组件的props还没有更新。
  - currentState—当前的state数据。
- render—该方法必须实现，书写UI的地方。
- componentDidMount—会在组件挂载后（插入到DOM树中）立即调用。依赖于DOM节点的初始化应该放在这里。如需通过网络请求获取数据。增加订阅事件。***可以在改方法中直接调用setState()方法触发额外渲染，但此次渲染会发生在浏览器更新屏幕之前，如此保证了即使在render()两次调用的情况下，用户也不会看到中间状态。它会导致性能问题，因此要谨慎使用。如果你的渲染依赖DOM节点的大小或者位置，比如实现modals和tooltips等情况下，你可以使用此方式处理。***

#### 更新阶段

- getDerivedStateFromProps—同上
- shouldComponentUpdate—根据该方法的返回值，判断React组件的输出是否受当前state或者props的变更影响，返回true，会触发组件渲染，返回false阻止组件渲染。该方法接收三个参数：
- nextProps—传入的props, 当前组件的props还没有更新。
  -  nextState—变更前的state数据。
- nextContext—通过contextType共享的数据。
- render
- getSnapshotBeforeUpdate—该方法会在更新DOM之前被调用，次方法的返回值会作为componentDidUpdate的第三个参数传递给下去。该方法接收两个参数：
- prevProps—变更之前的props数据。
  - prevState—变更之前的state数据。
- componentDidUpdate—该方法会在更新后被立即调用，首次渲染不会执行此方法。当组件更新后，可在此处对DOM进行操作。该方法接收三个参数：
- prevProps—变更之前的props数据。
  - prevState—变更之前的state数据。
- snapshot—改参数只有在getSnapshotBeforeUpdate方法有返回值的情况下有值。

#### 卸载阶段

- componentWillUnmount

通过下面代码，你可以查看到各个方法的调用时机。

```react
import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
    console.log('call---constructor');
  }

  //每次render前都会调用该方法
  static getDerivedStateFromProps(nextProps, currentState) {
    console.log('call---getDerivedStateFromProps');
  }

  componentDidMount() {
    console.log('call---componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('call---shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('call---getSnapshotBeforeUpdate');
  }

  componentDidUpdate() {
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
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCounter: false,
    }
  }
  render() {
    return (
      <div>
        {this.state.showCounter && <Counter/>}
        <hr/>
        <button onClick={e=>this.changeShowCounter(e)}>{this.state.showCounter ? "卸载" : "挂载"}</button>
      </div>
    )
  }
  changeShowCounter(e) {
    this.setState({
      showCounter: !this.state.showCounter
    })
  }
}
```



### 使用上的一些建议

- 不建议在 `shouldComponentUpdate()` 中进行深层比较或使用 `JSON.stringify()`。这样非常影响效率，且会损害性能，考虑使用内置的 `PureComponent `组件

- 后续版本，React 可能会将 `shouldComponentUpdate` 视为提示而不是严格的指令，并且，当返回 `false` 时，仍可能导致组件重新渲染。

- 避免在`componentDidUpdate`调用`setState`方法，容易导致循环渲染。

- 避免使用过时的生命周期方法，如：`componentWillMount,componentWillReceiveProps,componentWillUpdate`这三个方法在React 17中已经停止使用。`UNSAFE_`开头的方法虽然在React 17中可以使用，但如果组件中实现了`getSnapshotBeforeUpdate`或者`getDerivedStateFromProps`方法，会阻断`UNSAFE_` 开发方法的调用。

  - UNSAFE_componentWillMount()/componentWillMount
  - UNSAFE_componentWillReceiveProps/componentWillReceiveProps
  - UNSAFE_componentWillUpdate/componentWillUpdate
  

### 相关wiki

[React.Component](https://zh-hans.reactjs.org/docs/react-component.html)

[逐步迁移路径](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)





