### 1、理解 ECMAScript 和 JavaScript 的关系

Javascript 是脚本语言，ECMAScript 是规范。Javascript 是基于 ECMAScript 规范的脚本语言

<br />

### 2、熟练运用 es5、es6 提供的语法规范

**es5 重点语法: Object**

```javascript
// 检测 key 是否是 obj 自身属性
Object.hasOwnProperty.call(obj, "key")

// 配置一个或多个属性的描述
Object.defineProperty(obj, "key", {
	configurable: true,
	writable: true,
	value: "value",
	enumerable: true,
})
Object.defineProperties(obj, {
	key1: {
		configurable: true,
		writable: true,
		value: "value",
		enumerable: true,
	},
	key2: {
		configurable: true,
		writable: true,
		value: "value",
		enumerable: true,
	},
})

// Object.keys 只可获得可枚举的属性
// Object.getOwnPropertyNames 可获取不可枚举的属性key
var a = {}
Object.defineProperties(a, {
	one: { enumerable: true, value: 1 },
	two: { enumerable: false, value: 2 },
})
Object.keys(a) // ["one"]
Object.getOwnPropertyNames(a) // ["one", "two"]

// 冻结对象 & 检测冻结
Object.freeze(obj)
Object.isFrozen(obj) // boolean

// 锁定对象（不可新增但可以修改现有属性的值）& 检测锁定
Object.seal(obj)
Object.isSealed(obj) // boolean
```

**es5 重点语法: Array**

```javascript
Array.prototype.push // 后加
Array.prototype.pop // 后减
Array.prototype.shift // 前减
Array.prototype.unshift // 前加
Array.prototype.join(",") // 数组转字符串 [1,2,3] => '1,2,3'
Array.prototype.slice(start, end) // 包含start，不包含end
Array.prototype.splice(index, length, ?content) // 会改动到原数组
Array.prototype.indexOf(content)  // 返回大于 -1 说明存在
Array.prototype.filter((item,i) => {})  // 返回被筛选过的数组
Array.prototype.map((item,i) => {})  // 返回被处理过的数组
Array.prototype.reduce((prev,curr) => {}, initValue) // prev 作为上一轮的结果传递给下一轮
```

**es5 重点语法: String**

```javascript
String.prototype.charAt(index) // 返回对应index未知的字符
String.prototype.split(",") // 字符转数组 '1,2,3'.split(',') => ['1','2','3']
String.prototype.slice(start, end) // 包含start，不包含end
String.prototype.substr(start, length) // 返回start开始length长度的字符
String.prototype.substring(start, end) // 包含start，不包含end
```

**es5 重点语法: Funtion**

```javascript
Function.prototype.bind(context, ...args)()
Function.prototype.call(context, ...args)
Function.prototype.apply(context, [...args])
```

**es5 重点语法: other**

```javascript
Date.now() // 当前时间戳,毫秒
performance.now() // 当前距离网页打开时间，微秒
Math.min(...args) // 确定一组数值中的最小值
Math.max(...args) //确定一组数值中的最大值
Math.random() // 返回大于 0 小于 1 的一个随机数
Number.prototype.toFixed(number) // 按照指定的小数位返回数值的字符串表示
```

**es6: 基础**

```javascript
let a = 1 // 可变
const b = 2 // 不可变

// 解构函数
let [a, b, c] = [1, 2] // a:1 b:2 c: undefined

// 箭头函数
const handle = () => {} // 其 this 和外层的 this 相同, 不可作为构造函数
```

**es6: class 继承**

```javascript
class A {}
class B extends A {
	constructor() {
		// super 相当于执行 A 的constructor，B 得到 this
		super()
	}
}
```

**es6: Set、Map、WeakSet、WeakMap**

```javascript
// Set 里每个元素值保持唯一性
const arr = new Set([1, 1, 2, 3, 4, 4, 5, 6]) // [1,2,3,4,5,6]
new Set([]).has(element)
new Set([]).add(element)
new Set([]).delete(element)
new Set([]).clear()

// WeakSet 只接收数组成员为对象，对每一个对象是弱引用，不计入垃圾回收
const arr = new WeakSet([new Number(1), new Number(2), new Number(3)]) // [Number(1),Number(2),Number(3)]

// Map 接收 key 不为 string 得对象
var a = new Map()
// set 如果是同一个键值会修改，如果不是会新增
a.set(new Boolean(true), 1) // Map(1) {Boolean => 1}
a.set(new Boolean(true), 2) // Map(2) {Boolean => 1, Boolean => 2}
a.get(key)
a.has(key)
a.delete(key)
a.clear()

// WeakMap 只接收键值为对象，对每一个对象是弱引用，不计入垃圾回收
const wm = new WeakMap()
wm.set(new String(""), 1)
```

**es6: Symbol**

```javascript
// Symbol 独一无二的值
Symbol(1) === Symbol(1) // false
typeof Symbol(1) // 'symbol'

// Symbol 属性的键值无法枚举
var ss = Symbol("")
var obj = {
	[ss]: "123",
}
Object.keys(obj) // []
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [Symbol('')]
```

**es6: Promise**

- 状态一经触发不可更改
- return 不会出发 reject, 但是 throw err 会

```javascript
Promise.resolve()
	.then(() => {
		throw new Error("")
	})
	.then((data) => {
		console.log("success")
	})
	.catch((err) => {
		console.log("error") // 'error'
	})

Promise.resolve()
	.then(() => {
		return new Error("")
	})
	.then((data) => {
		console.log("success") // 'success'
	})
	.catch((err) => {
		console.log("error")
	})
```

**es6: Proxy & Reflect**

- Proxy 用于代理对象的属性监听和操作（可以监听到数组 push 操作）,执行等更多中行为的拦截
- 使用 Reflect 进行操作比直接使用 Object.xxx 更像函数行为

```javascript
var po = new Proxy(obj, {
	get: function (target, key, proxySelf) {
		return Reflect.get(target, key, proxySelf)
	},
	set: function (target, key, value, proxySelf) {
		return Reflect.set(target, key, value, proxySelf)
	},
})
```

### 3、熟练掌握 JavaScript 提供的全局对象（例如 Date、Math）、全局函数（例如 decodeURI、isNaN）、全局属性（例如 Infinity、undefined）

```javascript
Date.now() // 时间戳
new Date().toJSON() //  '2023-01-03T09:26:39.857Z'

Math.floor(3.14) // 3
Math.ceil(3.14) // 4
Math.abs(-1) // 1
Math.pow(2, 4) // 16

// encodeURI 不会编码 ASCII字母 数字 ~!@#$&*()=:/,;?+'
// 如果是直接使用的 url 使用 encodeURI
encodeURI("http://www.cnblogs.com/season-huang/some other thing") // 'http://www.cnblogs.com/season-huang/some%20other%20thing'

// encodeURIComponent 不会编码 ASCII字母 数字 ~!*()'
// 如果链接作为参数用 encodeURIComponent
encodeURIComponent("http://www.cnblogs.com/season-huang/some other thing") // "http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2Fsome%20other%20thing"

isNaN() // true
isNaN(0) // false
isNaN("") // false
isNaN(null) // false
isNaN(undefined) // true
isNaN(NaN) // true

// 超过 1.797693134862315E+308 被认为是 Infinity
let x = 1.797693134862315e308
let y = x * 1.001 // Infinity

// undefined 认为是未定义的值
undefined === "" // false
undefined === 0 // false
undefined === null // false
```

<br />

### 4、熟练应用 map、reduce、filter 等高阶函数解决问题

```javascript
;["1", "2", "3"].map((item) => Number(item)) // [1,2,3]
;[1, 2, 3].filter((item) => item >= 2) // [2,3]
;[1, 2, 3].every((item) => item < 4) // false
;[1, 2, 3].find((item) => item > 2) // 3
;[1, 2, 3].findIndex((item) => item > 2) // 2
;[1, 2, 3].some((item) => item > 2) // true
;[1, 2, 3].reduce((prev, item) => prev + item) // 6
;[1, 2, 3].reduceRight((prev, item) => prev + item) // 6
```

<br />

### 5、setInterval 需要注意的点，使用 settimeout 实现 setInterval

**<font color=chocolate>this 指向问题</font>**：setInterval 是全剧对象上方法，在方法内部直接使用 this 可能导致指向错误。

```javascript
setInterval(function () {
	console.log(this) // window
}, 100)

// 解决办法
setInterval(() => {
	console.log(this) // 指向最近的this
}, 100)

var obj = {
  name: 'nana'
  fn: function(){
    console.log(this.name)
  }
}

setInterval.call(obj, obj.fn)
```

**<font color=tomato>最小间隔 4ms</font>**：每调用一次定时器的最小间隔是 4ms。而在非激活的页面下，定时器的最小延迟为 1000ms

<font color=chocolate>0 延时定时器方法</font>

```javascript
;(function () {
	var timeouts = []
	var message = "zero-timeout-message"

	function setZeroTimeout(fn) {
		timeouts.push(fn)
		window.postMessage(messageName, "*")
	}

	function handleMessage(event) {
		if (event.source === window && event.data === message) {
			event.stopPropagation()
			if (timeouts.length > 0) {
				var fn = timeouts.shift()
				fn()
			}
		}
	}

	window.addEventListener("message", handleMessage, true)

	window.setZeroTimeout = setZeroTimeout
})()
```

### 6、JavaScript 异常处理的方式，统一的异常处理方案

**<font color=green>try catch</font>**: 抓取抛出的异常错误

```javascript
function handleError() {
	throw new Error("")
}

try {
	handleError()
} catch (error) {
	console.log(error)
}
```

**<font color=green>onunhandledrejection</font>**: 捕获 promise 的异常处理

```javascript
window.onunhandledrejection = function (err) {
	console.log("onunhandledrejection==", err)
}

new Promise((rs, rj) => {
	setTimeout(rj)
})
```

**<font color=green>onerror</font>**: 捕获全局异常

```javascript
window.onerror = function (error) {
	console.log("error==", error)
}
```

**<font color=green>addEventListener('error')</font>**: 捕获全局异常，并且可以抓取全局资源获取异常

```javascript
window.addEventListener("error", function (event) {
	console.log(event.target)
})

new Image().src = "xxx/error.png"
```

**<font color=green>react 组建获取错误和渲染降级</font>**

```javascript
class ErrorBoundary extends React.Components {
	static getDerivedStateFromError(error) {
		// 这里做降级处理
		return { isError: true }
	}

	componentsDidCatch(error, errorInfo) {
		// 这里上报给服务器
	}
}
```
