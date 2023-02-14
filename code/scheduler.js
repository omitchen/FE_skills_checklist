class Scheduler {
	constructor() {
		this.running = []
		this.waiting = []
		this.limit = 2
	}
	add(promiseMaker) {
		if (this.running.length < this.limit) {
			this.run(promiseMaker)
		} else {
			this.waiting.push(promiseMaker)
		}
	}
	run(promiseMaker) {
		this.running.push(promiseMaker)
		promiseMaker().then(() => {
			this.running = this.running.filter((item) => {
				return item !== promiseMaker
			})
			if (this.waiting.length > 0) {
				this.run(this.waiting.shift())
			}
		})
	}
}

const timeout = (time) =>
	new Promise((resolve) => {
		setTimeout(resolve, time)
	})

const scheduler = new Scheduler()
const addTask = (time, order) => {
	scheduler.add(() => {
		return timeout(time).then(() => {
			console.log(order, performance.now())
		})
	})
}

console.log("start", performance.now())
addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")
// output：2 3 1 4
// 一开始，1，2两个任务进入队列。
// 500ms 时，2完成，输出2，任务3入队。
// 800ms 时，3完成，输出3，任务4入队。
// 1000ms 时，1完成，输出1。
