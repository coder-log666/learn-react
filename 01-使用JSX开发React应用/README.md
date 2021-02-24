本文首发自公众号【乐戈er】原文链接：[使用JSX开发React应用](https://mp.weixin.qq.com/s?__biz=MzU2ODM3ODA4Mw==&mid=2247483950&idx=1&sn=6621664912657ec2b8ae8a87e877b537&chksm=fc8f95a2cbf81cb4ebe5b89d19397511bceb2b342beb64eb6638849cfd61df27c076b8aa79b4&token=1102166470&lang=zh_CN#rd)

### 问题

- 在我们编写项目的时候React代码转换HTML代码经历了哪些阶段？
- 在这些阶段中使用了哪些工具，你有什么体会。

### 代码的演进过程

我们要实现一个登录和退出的功能，我们可以以`HTML+JavaScript`的方式进行开发，这是最原始的方法，代码如下：

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script  src="./react.development.js"></script>
    <script  src="./react-dom.development.js"></script>
</head>
<body>
    <div id="root">
        <h2 class='head'></h2>
        <button class='btn' onClick="changeText()"></button>
    </div>
</body>
<script>
    let isLogin = false;
    let root = document.getElementById("root");
    let h2 = document.getElementsByClassName("head")[0];
    let button = document.getElementsByClassName("btn")[0];
    function changeText() {
        isLogin = !isLogin; 
        render();   
    }
    function render() {
        h2.innerHTML = isLogin ? '欢迎驽马' : '请先登录';
        button.innerHTML = isLogin ? '退出' : '登录'; 
    }
    render();
</script>
</html>
```

在上面的代码中，我们根据登录的状态，在界面上显示不同的UI。这种方式想必前端开发人员都能信手拈来。

那么，用纯React框架要怎么编写代码呢？例程如下，使用React框架开发web应用需要引入两个包`react.js`和`react-dom.js`。

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script  src="./react.development.js"></script>
    <script  src="./react-dom.development.js"></script>
</head>
<body>
    <div id="root">
    </div>
</body>
<script>
    let isLogin = false;
    function changeText() {
        isLogin = !isLogin;
        render();
    }
    function render() {
        let root = document.getElementById("root");
        let h2 = React.createElement('h2', null, isLogin ?'欢迎驽马':'请先登录');
        let button = React.createElement('button',{onClick:changeText}, isLogin ? '退出' : '登录');
        let e = React.createElement('div',null, h2, button);
        ReactDOM.render(e, root);
    }
    render();

</script>
</html>
```

从上面的代码我们可以看出，React通过` React.createElement`方法创建出来元素，然后通过`ReactDOM.render`将创建的元素插入到指定的`html`标签内，这里是id为root的标签。通过与最原始的`html+JavaScript`方式相比，React的开发方式并不优雅，反而比较复杂，`createElement`方法写起来太不方便了。令人高兴的是，真实的开发中，我们也不会使用这样的开发方式，一般我们都是用JSX语言进行代码编写。

将上面代码使用JSX实现，使用JSX需要将`script`的`type`设置为`type="text/babel"`，标志这些代码需要使用`babel`进行转换。另外需要引入`babel.js`包。

```jsx
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script  src="./react.development.js"></script>
    <script  src="./react-dom.development.js"></script>
    <script src="./babel.min.js"></script>
</head>
<body>
    <div id="root">
    </div>
</body>
    <script type="text/babel">
        let root = document.getElementById("root");
        let isLogin = false;
        function render() {
            ReactDOM.render(
                <div>
                    <h2>{isLogin ?'欢迎驽马':'请先登录'}</h2>
                    <button onClick={changeText}>{isLogin ? '退出' : '登录'}</button>
                </div>,
                root
            )
        }
        function changeText() {
            isLogin = !isLogin;
            render();
        }
        render();
    </script>
</html>
```

通过与上述两个代码编辑，使用JSX语法的方式我们不在使用DOM方法或者React提供的操作DOM的方法进行UI书写，而是直接使用html标签。这样进一步降低了开发门槛，使开发者更加的关注与业务逻辑。

### 关于babel

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。同时，Babel 能够转换 JSX 语法。更多信息查询： https://www.babeljs.cn/。你可以使用官网的`试一试`功能，看一下转换结果。

![image-20210116095956355](https://riverli.oss-cn-beijing.aliyuncs.com/riverli/image-20210116095956355.png)

### 回答问题

我们编写的`JSX`代码通过`babel`转换为`React`代码，`React`代码通过`ReactDOM`被转换为`html`代码并插入到文档流中。

![image-20210116092529198](https://riverli.oss-cn-beijing.aliyuncs.com/riverli/image-20210116092529198.png)

这里面主要使用的工具就是babel框架，通过增加了babel转换这一层，将复杂的React开发变得简单且聚焦。最大的触发是`在不合理的地方增加层可以起到意想不到的收获。`



