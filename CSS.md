### 1、CSS 盒模型，在不同浏览器的差异

```css
box-sizing: border-box; // width = contentWidth + paddindWidth + borderWidth
box-sizing: content-box; // width = contentWidth
```

<br />

### 2、CSS 所有选择器及其优先级、使用场景，哪些可以继承，如何运用 at 规则

1. !import: 100000
2. 行内样式: 10000
3. id 选择器: 1000
4. 类、伪类、属性选择器（.foo, :first-child, div[class="foo"]）: 100
5. 标签: 10
6. 通配符、子类、兄弟选择器：1
7. 继承样式：0.1

**哪些 css 属性可以继承？**

- 字体相关：font、font-size、font-family 等等
- 文本相关：text-indent、text-align、line-height、color
- 元素可见性：visibility
- 列表属性：list-style

**@import**：导入其他 css 文件，阻塞请求不建议使用

```css
@import "global.css";
```

**@font-face**: 自定义字体

```css
@font-face {
	font-family: "MyWebFont";
	src: url("myfont.woff2") format("woff2"), url("myfont.woff") format("woff");
}
```

**@keyframes**: 动画关键帧

```css
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
```

**@media**: 媒体查询

```css
@media all and (min-width: 1280px) {
	//
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
	//
}
```

### 3、CSS 伪类和伪元素有哪些，它们的区别和实际应用

**伪类:hover**: 选择哪些不能被普通选择器选中的文档之外的元素，如:hover, :active, :focus, :nth-child, :first-child, :last-child

**伪元素::before**: 创建不存在文档之中的元素，如 :before, :after, :first-line, :first-letter

- 伪类和伪元素都是用来表示文档树以外的"元素"。
- 伪类和伪元素分别用单冒号:和双冒号::来表示。
- 伪类和伪元素的区别，最关键的点在于如果没有伪元素(或伪类)，是否需要添加元素才能达到目的，如果是则是伪元素，反之则是伪类。

<br />

### 4、CSS 几种定位的规则、定位参照物、对文档流的影响，如何选择最好的定位方式，雪碧图实现原理

```css
position: static;
position: relative; // 该元素在文档流中的位置为标准
position: absolute; // 最近的相对定位属性的父级
position: fixed; // 页面窗口为基准
position: sticky; // 粘性定位
```

**雪碧图原理**: 通过 background-position 的图片位置不同实现不同 icon 的使用

```css
a1 {
	background: url(sprite.png) 0 10px no-repeat;
}
a2{
  background-image: url(sprite.png)
  background-position: 0 20px;
  background-repeat: no-repeat
}
```

<br />

### 5、水平垂直居中的方案、可以实现 6 种以上并对比它们的优缺点

```css
.father {
	display: flex;
	align-items: center;
	justify-content: center;
}
```

```css
.father {
	position: relative;
}
.son {
	position: absolute;
	left: 50%;
	top: 50%;
	transfrom: translate(-50%, -50%);
}
```

```css
.father {
	position: relative;
}
.son {
	width: 50px;
	height: 50px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -25px;
	margin-top: -25px;
}
```

### 6、BFC 实现原理，可以解决的问题，如何创建 BFC

**BFC**: block format context, 独立块级作用域，也就是说拥有 BFC 的元素内部发生变化的时候，不会影响到 BFC 元素外 DOM 发生重排重绘;

**如何创建 BFC**:

- display: inline-block | flex
- position: absolute | fixed
- overflow 非 visible 的属性
- float 非 none 的属性

<br />

### 7、PostCSS、Sass、Less 的异同，以及使用配置，至少掌握一种

**PostCSS**：css => AST => strong css

通过对 css 文件进行转换为 AST 分析其语法，再通过配置的插件对文件进行一定程度的增加或兼容，从平台层面减少业务开发对浏览器差异的影响

```javascript
// webpack.config.js
module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
					},
				],
			},
		],
	},
}
```

```javascript
// postcss.config.js
module.exports = {
	plugins: [require("autoprefixer"), require("postcss-nested")],
}
```

**Sass**: sass => css

相当于 css 的超集，在原有 css 语法的基础上，增加了编程语言的特性，如变量、逻辑语句、函数等，使 css 代码更易维护和复用

Sass vs Scss: Sass v3.0 === Scss。语法上的区别在于 Sass 是没有 {} 包裹的。

```sass
#sidebar
  width: 30%
  background-color: #faa
```

```scss
#sidebar {
  width: 30%
  background-color: #faa
}
```

**Less**: less => css

预线处理语言，扩展了 css 语言，使拥有变量、Mixin、函数等特性，使 css 更易维护复用

变量

```less
@nice-blue: #5b83ad;

#header {
	color: @nice-blue;
}
```

混合 Mixins

```less
.border {
	border: 1px solide #aaa;
}

#menu a {
	color: #abc;
	.border;
}

.post a {
	color: red;
	.border;
}
```

嵌套

```less
#header {
	color: black;
	.navigation {
		font-size: 12px;
	}
	.logo {
		width: 300px;
	}
}
```

函数

```less
@base: #f04615;
@width: 0.5;

.class {
	width: percentage(@width); // returns `50%`
	color: saturate(@base, 5%);
	background-color: spin(lighten(@base, 25%), 8);
}
```

作用域

```less
@var: red;

#page {
	@var: white;
	#header {
		color: @var; // white
	}
}
```

导入

```less
@import "library"; // library.less
@import "typo.css";
```

**Stylus**: 同时支持缩进的和通俗的两种风格的 CSS 语法风格。扩展名为 \*.styl 格式。Stylus 功能上和 Sass 相似，都在 Less 之上，所以也导致 Stylus 写法更多样性

**Sass 和 Less、Stylus 的配置方式**: 通过配置对应的 loader 找到对应格式结尾的文件，将它们翻译成 css 文件

```javascript
// webpack.config.js
module.exports = {
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				// test: /\.less$/,
				// test: /\.styl$/,
				use: [
					"style-loader", // 将 JS 字符串生成为 style 节点
					"css-loader", // 将 CSS 转化成 CommonJS 模块
					"sass-loader", // 将 Sass 编译成 CSS
					// "less-loader",
					// "stylus-loader",
				],
			},
		],
	},
}
```

### 8、CSS 模块化方案、如何配置按需加载、如何防止 CSS 阻塞渲染

#### CSS 模块化方案

**BEM 命名方式**：通过块（Block）、元素（Element）、修饰符（Modifier）统一开发规范以便维护，例： .bar_title_logo

**css Modules**: 在 build-time 阶段对类名进行一定的处理，避免撞车的事件发生

效果

```javascript
// style.css
.title {
  color: red;
}
// app.jsx
import style from './style.css';

export default () => {
  return (
    <p className={style.title}>
      I am KaSong.
    </p>
  );
};

// 会被编译成以下
._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
<h1 class="_3zyde4l1yATCOkgn-DBWEL">
  Hello World
</h1>
```

配置方式

```javascript
// webpack.config.js
{
    test: /.css$/,
    loader: "style-loader!css-loader?modules"
}
```

**css-in-js** 衍生开源：[Styled-Components](https://styled-components.com/) 、[radium](https://formidable.com/open-source/radium/)

Styled-Components: 通过标签模版字符串语法实现对 css 的定义，在运行时会把创建的对象替换为对应的 DOM 标签，样式会动态生成一个 css 选择器，并将该选择器插入到对应的 DOM 标签中实现应用

```javascript
import React from "react"
import styled from "styled-components"

const Container = styled.main`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
	background-color: #f6f9fc;
`

const Stripe = styled.div`
	height: 10vh;
	overflow: hidden;
	transform: skewY(-8deg);
	transform-origin: 0;
	background: linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%);
`

export default function Login() {
	return (
		<Container>
			<Stripe />
		</Container>
	)
}
```

radium: 与 style-components 的区别在于<font color=seagreen>将样式动态插入到标签的行内样式上</font>

```javascript
import React from "react"
import radium from "radium"

const styles = {
  container: {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    background-color: #f6f9fc;
  },
  stripe: {
    height: 10vh;
    overflow: hidden;
    transform: skewY(-8deg);
    transform-origin: 0;
    background: linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%);
  }
}

function Login() {
	return (
		<div style={style.container}>
			<div style={style.stripe}/>
		</div>
	)
}

export default radium(Login)
```

**css 如何配置按需加载**

手动加载

```javascript
import Button from "vant/lib/button"
import "vant/lib/button/style"
```

使用 babel-plugin-import：插件的本质就是将源代码的中的 import { Button } from "vant" 通过 AST 转换为 import Button from "vant/lib/button" 和 import "vant/lib/button/style"

```javascript
// babel.config.js
module.exports = {
	plugins: [
		[
			"import",
			{
				libraryName: "vant",
				libraryDirectory: "es",
				style: true,
			},
			"vant",
		],
	],
}

// App.vue
import { Button } from "vant"
Vue.use(Button)
```

**如何防止 CSS 阻塞渲染**

**css 加载不会阻塞 DOM 树的解析**

html 解析的过程中遇到 css，会交给网络线程请求 css 文件，同时会往后继续加载，所以 css 加载不会阻塞 DOM 的解析

**css 加载会阻塞 DOM 树的渲染**

DOM 树加 CSSDOM 合并成渲染树，如果 CSSDOM 未加载完成，DOM 树只有等待，所以如果 css 太大并且加载很慢会推迟渲染树的生成时间

**css 加载会阻塞后面 js 语句的执行**

js 可以操作 css，如果在 js 开始执行之前，css 还没有准备好，浏览器只能等待 css 继续解析，等 css 完成了再开始执行 js，所以 css 是可能会阻塞 js 的执行的

**解决办法**

- 将 css 放在 html 的头部，使渲染树尽快完成
- 减小 css 的数据量（手动优化、压缩、缓存、critical css 将首屏的样式单独抽离）
- 使用 CDN

### 9、熟练使用 CSS 实现常见动画，如渐变、移动、旋转、缩放等等

[demo](./code/transform.css)

**transform**

```css
transform: translate(10px, 20px); // x 点位移 +10px， y+20px
transform: translate3d(
	10px,
	20px,
	30px
); // z 轴脱离文档流，该DOM会建议单独的渲染层
transform: scale(0.5) // 按原有比列缩放
transform: scale3d(0.5, 0.5, 2);
transform: rotate(45deg);  // 旋转，需要要 deg 得单位
transform: rotate3d(0.5, 0.5, 0.5, 45deg);
transform: matrix(1, 2, -1, 1, 80, 80);
transform: skew(10deg, 10deg);
```

**transition**

```css
.root {
	width: 200px;
	transition: width 2s;
	/* transition-duration: 2s;
	transition-timing-function: ease;
	transition-delay: 0;
	transition-property: width; */
}

.root:hover {
	width: 400px;
}
```

**animation**

```css
@keyframes move {
	0% {
		top: 0;
		left: 0;
	}
	25% {
		top: 0;
		left: 400px;
	}
	50% {
		top: 400px;
		left: 400px;
	}
	75% {
		top: 400px;
		left: 0;
	}
	100% {
		top: 0;
		left: 0;
	}
}

animation: move 5s infinite;
```

### 10、CSS 浏览器兼容性写法，了解不同 API 在不同浏览器下的兼容性情况

**条件注释**：gt 大于，lt 小于

```javascript
<!--[if lt IE 9]>
   <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
   <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
```

**autoprefixer**: postcss 插件之一，可以为 css 自动添加前缀

```javascript
// 源码
div {
  transform: rotate(30deg);
}

// 构建后的代码自动补全
div {
  -ms-transform: rotate(30deg);
  -webkit-transform: rotate(30deg);
  -o-transform: rotate(30deg);
  -moz-transform: rotate(30deg);
  transform: rotate(30deg);
}
```

### 11、掌握一套完整的响应式布局方案

**媒体查询**

```css
@media screen and (min-width: 375px) and (-webkit-device-pixel-ratio: 3) {
	body {
		background-color: #0ff000;
	}
}

@media screen and (min-width: 414px) {
	body {
		background-color: blue;
	}
}
```

**vw&vh**：视口宽度的 0-100 的值

```css
html {
	fons-size: 1vw; /* 1vw = width / 100 */
}
```

**rem**: 利用 rem 的特性，子节点的 rem 值为根节点的属性为基准

- 设置 html 标签的 font-size 为页面大小十分之一，子节点都以此大小为基准
- 设置 body font-size 大小为 dpr \* 12, 因为页面最小的字号为 12

```css
html {
	font-size: 37.5px;
}
p {
	width: 2rem; // 相当于 75px
}
```

**响应式图片**

img 标签的 srcset、sizes 属性

- srcset: 指定多张图像，适应不同宽度的屏幕
- sizes: 不同设备的图片显示的宽度
  - 前一个条件代表设备的宽度
  - 第二值代表图像需要显示的宽度

```html
<img
	srcset="
		elva-fairy-480w.jpg   480w,
		elva-fairy-800w.jpg   800w,
		elva-fairy-1200w.jpg 1200w
	"
	sizes="
		(max-width: 600px) 480px,
		(max-width: 1000px) 800px,
		1200px
	"
	src="elva-fairy-800w.jpg"
	alt="Elva dressed as a fairy"
/>
```

picture、source 标签 type 属性

- picture 作为容器包裹 source 和 image 标签
- source 标签中的 media 可以进行媒体查询，依次往下查询对应的 media。当条件符合加载 srcset 里面的图片
  - source 标签的 type 属性给出图片的 MIME 类型，浏览器会自动判断是否支持该类型而进行加载
- image 标签作为默认图片

```html
<picture>
	<source type="image/svg+xml" srcset="logo.xml" />
	<source type="image/webp" srcset="logo.webp" />
	<img src="logo.png" alt="ACME Corp" />
</picture>
```
