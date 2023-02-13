setTimeout(() => {
	console.log("setTimeout")
}, 0)

Promise.resolve().then(() => {
	console.log("Promise.resolve call")
	Promise.resolve().then(() => {
		console.log("Promise.resolve call 22")
	})
})

queueMicrotask(() => {
	console.log("queueMicrotask call")

	queueMicrotask(() => {
		console.log("queueMicrotask call 222")
	})
})

const promise = function () {
	new Promise((rs) => {
		setTimeout(() => {
			rs()
		}, 0)
	}).then(() => {
		console.log("sleep ")
	})
}

queueMicrotask(() => {
	console.log("start sleep")
	promise()
})
