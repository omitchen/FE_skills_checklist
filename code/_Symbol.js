/**
 * 实现了的功能：
 * 1、Symbol 函数前不能使用 new 命令，否则会报错
 * 2、instanceof 的结果为 false
 * 3、将其转为字符串，然后才生成一个 Symbol 值
 * 4、Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数的返回值是不相等的。
 * 5、Symbol 值可以作为标识符，用于对象的属性名，可以保证不会出现同名的属性。
 */

;(function () {
	root = this

	var generateName = (function () {
		let postfix = 0
		return function (descrption) {
			postfix++
			return `__NAME__${descrption}__${postfix}__`
		}
	})()

	var _Symbol = function (descrption) {
		if (this instanceof _Symbol) throw new Error("_Symbol is not a constructor")

		descrption === undefined ? undefined : String(descrption)

		var symbol = Object.create({
			toString: function () {
				return this.__Name__
			},
		})

		Object.defineProperties(symbol, {
			__Name__: {
				value: generateName(descrption),
				writable: false,
				enumerable: false,
				configurable: false,
			},
		})

		return symbol
	}

	root._Symbol = _Symbol
})()

// 实现一下功能
var a = _Symbol("key")
var b = _Symbol("key")
var c = {
	[a]: 1,
}

console.log(c[a]) // 1
console.log(c[b]) // undefined

var d = new _Symbol("key") // Error: _Symbol is not a constructor
