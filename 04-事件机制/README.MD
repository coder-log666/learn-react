[TOC]
### 处理事件的几种方式
#### 行内事件
通过给html标签添加`onclick` 属性来添加事件，如下代码：可以给直接写代码，或者写方法名+()
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <button onclick='alert(1111)'>点击我</button>
        <button onclick='click_me()'>click me</button>
    </div>
</body>
<script>
    function click_me() {
        alert('2222222');
    }
</script>
</html>
```

#### 通过js添加属性
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <button>点击我</button>
    </div>
</body>
<script>
    const btn = document.querySelector('button');
    btn.onclick = function() {
        alert('hello javascript');
    }
</script>
</html>
```

#### 通过监听的方式
通过addEventListener() 和removeEventListener() 两个方法对事件添加和移除监听。
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <button>点击我</button>
        <button id='remove_lister'>移除监听</button>
    </div>
</body>
<script>
    const btn = document.querySelector('button');
    function click_me() {
        alert('hello javascript');
    }
    btn.addEventListener('click', click_me);
    function click_me2() {
        alert('hello javascript--2');
    }
    btn.addEventListener('click', click_me2);

    const btn2 = document.getElementById('remove_lister')
    function remove_lister() {
        btn.removeEventListener('click', click_me);
    }
    btn2.addEventListener('click', remove_lister);
</script>
</html>
```
可以给同一个监听器注册多个处理器，click_me2 和 click_me 都会响应。通过第二种方式不能实现这种效果。

### 默认行为
某些html标签有默认值的响应行为，如form表单，点击提交按钮之后会跳转到指定的界面。我们可以使用event的`preventDefault()`方法，阻止默认行为。
下面代码，如果姓名或年龄为空就会阻止提交行为。
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form>
        <div>
          <label for="name">姓名: </label>
          <input id="name" type="text">
        </div>
        <div>
          <label for="age">年龄: </label>
          <input id="age" type="text">
        </div>
        <div>
           <input id="submit" type="submit">
        </div>
      </form>
      <p style="color: red;"></p>
</body>
<script>
const form = document.querySelector('form');
const name = document.getElementById('name');
const age = document.getElementById('age');
const submit = document.getElementById('submit');
const para = document.querySelector('p');
form.onsubmit = function(e) {
  if (age.value === '' || age.value === '') {
    e.preventDefault();
    para.textContent = '姓名和年龄都不能为空';
  }
}
</script>
</html>
```
兼容IE`e.returnValue = false;`


### 事件冒泡及捕获
事件冒泡和捕捉是两种机制，主要描述当在一个元素上有两个相同类型的事件处理器被激活会发生什么。

如下代码,我们添加了2个div, class为parent的div是class为child的div的父节点。分别给他们添加onclick事件。
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .parent {
        width: 300px;
        height: 300px;
        font-size: 30px;
        background-color: blue;
      }
      .child {
        width: 150px;
        height: 150px;
        font-size: 30px;
        background-color: green;
      }
    </style>
</head>
<body>
    <div class="parent">
      <p>1</p>
      <div class="child">
        <p>2</p>
      </div>
    </div>
</body>
<script>
  const parent = document.querySelector('.parent')
  const child = document.querySelector('.child')

  parent.onclick = function() {
    alert('parent-clicked');
  }
  
  child.onclick = function() {
    alert('child-clicked');
  }
</script>
</html>
```
效果如下
![效果图](https://riverli.oss-cn-beijing.aliyuncs.com/riverli/image-20210224195222717.png)
在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。所以在我们的程序中当点击child的时候的时候，会先响应clild的事件，再响应parent的事件。这就是事件冒泡导致的。

但如果我们将事件的添加方式改为下面这种方式：通过`addEventListener`添加事件，并将第三个参数改为true，将事件的响应机制改为捕获。
```js
  function parentClicked() {
    alert('parent-clicked');
  }
  function childClicked() {
    alert('child-clicked');
  }
  parent.addEventListener('click', parentClicked, true)
  child.addEventListener('click', childClicked, true)
```
在这种情况下，点击clild会先响应parent的事件，再响应clild的事件。这是因为事件的捕获机制导致的。
阻止冒泡行为, 调用event对象的`stopPropagation()`方法。

**总结：**
冒泡机制：
1. 从被点击元素开始
2. 检查元素是否有事件的处理方法：
    a. 如果有对应的事件方法，就调用事件方法，然后进入步骤3
    b. 如果没有事件方法，进入步骤3
3. 找到元素的父元素，然后对父元素进行步骤2的操作。直到html根节点。

捕获机制：
1. 从html元素开始
2. 检查元素是否有事件的处理方法：
    a. 如果有对应的事件方法，就调用事件方法，然后进入步骤3(叔叔节点也会响应事件)
    b. 如果没有事件方法，进入步骤3
3. 找到元素的子元素，然后对子元素进行步骤2的操作。直到到达实际点击的元素。

### 事件委托
事件委托是一种代码设计方式，如果你想要在大量子元素中单击任何一个都可以运行同一段代码，您可以将事件监听器设置在其父节点上，并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <ul id="parent-list">
            <li id="post-1">Item 1</li>
            <li id="post-2">Item 2</li>
            <li id="post-3">Item 3</li>
            <li id="post-4">Item 4</li>
            <li id="post-5">Item 5</li>
            <li id="post-6">Item 6</li>
        </ul>
    </div>
</body>

<script>
    document.getElementById("parent-list").addEventListener("click", function(e) {
	if(e.target && e.target.nodeName == "LI") {
		console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
	}
});
</script>
</html>
```

### React 事件机制

#### 合成事件
SyntheticEvent 是浏览器的原生事件的跨浏览器包装。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()。React中它作为实例参数将被传递给你的事件处理函数。
当你需要使用浏览器的底层事件时，只需要使用 nativeEvent 属性来获取即可。
合成事件与浏览器的原生事件不同，也不会直接映射到原生事件。

#### React事件分类
React中将事件分为三种类型，分别是：
- DiscreteEvent：click，blur,focus,submit,tuchStart 等，优先级是 0。
- UserBlockingEvent：touchMove,mouseMove,scroll,drag,dragOver 等，这些事件会阻塞用户的交互，优先级是 1。
- ContinuousEvent：load,error,loadStart,abort,animationend 等，优先级是 2，这个优先级最高，不会被打断。

React通过委托的形式将元素的事件绑定到跟节点，React17之前事件与React17之后绑定差异

![差异比较](https://riverli.oss-cn-beijing.aliyuncs.com/riverli/image-20210224194959193.png)

17之前事件是绑定到`document`上的。17之后是绑定到根标签上的, 即下面代码中的第二个参数：`document.getElementById('root')`
```js
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```

注意：dom事件可以阻止合成事件的冒泡，合成事件不能阻止dom事件冒泡
```js
import React, { PureComponent } from 'react'
import './style.css'

export default class EventTest extends PureComponent {
  constructor(props) {
    super(props);
    this.grandClicked = this.grandClicked.bind(this)
    this.fatherClicked = this.fatherClicked.bind(this)
    this.sonClicked = this.sonClicked.bind(this)
    this.sonClicked1 = this.sonClicked1.bind(this)
  }

  componentDidMount() {
    const grand = document.querySelector('.grand')
    const father = document.querySelector('.father')
    const son = document.querySelector('.son')
    // grand.onclick = function() {
    //     console.log('dom-grand')
    // }
    // father.onclick = function() {
    //     console.log('dom-father')
    // }
    // son.onclick = function(e) {
    //     console.log('dom-son')
    //     //会阻止合成事件以及dom冒泡
    //     e.stopPropagation();
    // }
    son.addEventListener('click', this.sonClicked1)
    father.addEventListener('click', this.fatherClicked)
    grand.addEventListener('click', this.grandClicked)
  }

  grandClicked(e) {
    console.log('grand');
    // e.stopPropagation()
  }

  fatherClicked(e) {
    console.log('father');
    // e.stopPropagation()
  }

  sonClicked(e) {
    console.log('son');
    //会阻止合成事件的冒泡
    e.stopPropagation()
  }
  sonClicked1(e) {
    console.log('dom-son');
    //会阻止合成事件以及dom冒泡
    // e.stopPropagation()
  }

  render() {
    return (
      <div className='grand' onClick={this.grandClicked}>
        <div className='father' onClick={this.fatherClicked}>
          <div className='son' onClick={
            this.sonClicked
          }>

          </div>
        </div>
      </div>
    )
  }
}

```


### 参考
[事件介绍](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)
[React17更新公告](https://reactjs.org/blog/2020/08/10/react-v17-rc.html)