### 1、从规范的角度理解 HTML，从分类和语义的角度使用标签

使用相对应合适的元素描述文件结构，这样可以有利于页面被搜索引擎检索，也可以让后续开发者被容易理解

- title 描述页面信息
- meta 标签添加页面描述信息等
- 头部导航栏：header
- 页面底部：footer
- 页面主要内容区域：content、section

<br />

### 2、常用页面标签的默认样式、自带属性、不同浏览器的差异、处理浏览器兼容问题的方式

- 因为每个浏览器都有自己的默认样式，所以需要导入初始化样式进行清理，例如：css reset、normalize.css
  - css reset：清理所有元素默认样式，强行使得元素有相同的视觉效果
  - normalize.css: 更加细节，保留了有用的默认样式。
- polyfill 垫片：通过构建更低版本的代码兼容远古浏览器

<br />

### 3、元信息类标签(head、title、meta)的使用目的和配置方法

**<font color=green>head</font>**

head 内部可以存放：

- \<base href='http://xxx' target="\_blank" /> 为页面上的所有链接规定默认地址或默认目标。
- \<link href="index.css" rel="stylesheet" type="text/css" /> 导入 css 文件
- \<style> 行内元素
- \<title> 页面标题
- \<mate> 页面元信息

**<font color=green>meta</font>**

```html
<meta name="keywords" content="xxx,xxx,xxx" />
<meta name="description" content="xxxxxxxxx" />
<meta
	name="viewport"
	content="width=device-width;initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
/>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-touch-fullscreen" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

<br />

### 4、可以使用 Canvas API、SVG 等绘制高性能的动画

**SVG vs Canvas 的不同**

- 绘制方式不同：
  - SVG 使用 XML 描述 2D 图形语言，每个被绘制的图形均被视为对象，如果 SVG 对象的属性发生变化，浏览器会自动重现图形
  - Canvas 使用 JS 绘制图形，一旦绘制完成吗不会得到浏览器的关注
- 可监听：
  - SVG 基于 XML。所以它实现了 DOM 接口，为某个元素添加事件的能力
  - Canvas: 逐像素渲染
- 场景区别：
  - Canvas 适合像素绘制，动态渲染和大数据量渲染
  - SVG 适合大面积，小数量应用场景

Canvas 绘制

```javascript
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = "rgba(0, 200, 200, 0.5)"
ctx.fillRect(10, 10, 55, 50)

// // 绘制第二个长方形
ctx.fillStyle = "rgba(0, 0, 200, 0.5)"
ctx.strokeRect(30, 30, 50, 50)
ctx.clearRect(0, 0, canvas.width, canvas.height)

ctx.beginPath()
ctx.moveTo(25, 25)
ctx.lineTo(105, 25)
ctx.lineTo(25, 105)
ctx.fill() // 自动闭合路径
```

SVG 基本结构

```XML
<svg
  version="1.1"
  baseProfile="full"
  width="300"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="100%" height="100%" fill="red" />

  <circle cx="150" cy="100" r="80" fill="green" />

  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">
    SVG
  </text>
</svg>

```

### 5、DOMContentLoaded 和 load 的区别

**[DOMContentLoaded](https://zh.javascript.info/onload-ondomcontentloaded)**: 页面已加载完 HTML，构建完 DOM 树，但是动态添加的资源和图片等资源并为加载。

```javascript
<script>
	function ready() {
		alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`)
	}

	document.addEventListener("DOMContentLoaded", ready)
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
```

上述方法，当 DOMContentLoaded 触发式，获取到的 IMG 尺寸大小为 0，说明 DOMContentLoaded 不会等待图片资源完成就会触发

<br />

```javascript
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("inline script executed");
</script>
```

上述脚本中，"executed" 会触发再响应 DOM ready，所以 <font color=red>DOMContentLoaded 会等 script 脚本完成执行后再触发，也就是说 DOMContentLoaded 里面包含了 script 脚本的解析运行时间</font>

为什么设计了？因为脚本可能想修改 DOM，所以 DOMContentLoaded 必须等脚本执行结束

不阻塞 DOMContentLoaded 的脚本

- <font color=green>async 属性的脚本不会阻塞 DOMContentLoaded</font>
- 动态添加的 script 脚本

原则上，外部样式表也就是 link 不会影响 DOM，因此 DOMContentLoaded 不会等待它们。但是如果 css 的后面有脚本

1. 脚本可以操作 css，所以 js 的执行必须等 css 加载解析完成
2. DOMContentLoaded 需要等 js 执行完成，所以依赖关系变成了 DOMContentLoaded => js 执行 => Link css
3. 上述的情况下 DOMContentLoaded 使需要等待 css 解析完成的。

而现代大多的页面都是头部 css，尾部 js，所以 DOMContentLoaded 以来 HTML、页面内的 css、页面的 js 加载解析完成才会触发

**onload**

onload 事件会在页面完成需有外部资源加载时触发，例如下方的事件中可以拿到图片大小

```javascript
<script>
  window.onload = function() { // 也可以用 window.addEventListener('load', (event) => {
    alert('Page loaded');

    // 此时图片已经加载完成
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

#### 6、async 和 defer

**defer**: <font color=red>异步加载，稍后解析</font>，不会阻塞页面解析，会在 DOMContentLoaded 之后运行

```javascript
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

<font color=red>俩个脚本会并行请求，但是 defer 属性会使它们按照前后的顺序执行</font>

**async**: <font color=red>异步加载，加载回来立即解析</font>。因为文件大小不可控，所以 async 的脚本可以理解是完全独立的，不能保证按顺序执行

```javascript
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

1. 页面会立即渲染，async 不会阻塞页面的渲染
2. DOMContentLoaded 可能在 async 之前或之后触发，不能保证谁先谁后。
3. small 可能会先执行，因为 small 体积较小，所以它会比 long 更早回到浏览器，当它回来时会被理解解析。也就是说 async 脚本以谁先完成加载谁先解析的顺序
