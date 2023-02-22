var rate = {
	600: 3,
	800: 4,
	1200: 6,
}

let leg = new Proxy(
	{
		value: 0,
	},
	{
		set: function (target, key, value, receiver) {
			if (value === target.value) {
				changeWidth()
			}
			return Reflect.set(target, key, value, receiver)
		},
	}
)

function changeWidth() {
	const items = document.getElementsByClassName("item")
	const itemWidth = window.innerWidth / leg.value
	for (let i = 0; i < items.length; i++) {
		items[i].style.width = itemWidth + "px"
	}
}

function changeleg() {
	let value = 2
	Object.keys(rate).forEach((item) => {
		if (item <= window.innerWidth) {
			value = rate[item]
		}
	})
	leg.value = value
}

function _create() {
	const box = document.getElementById("box")
	const windowWidth = window.innerWidth
	const itemWidth = windowWidth / leg.value
	const fragment = document.createDocumentFragment("div")

	for (let i = 1; i <= 50; i++) {
		const div = document.createElement("div")
		div.innerHTML = i
		div.style.width = itemWidth + "px"
		div.style.backgroundColor = `rgba(${Math.random() * 255}, ${
			Math.random() * 255
		},${Math.random() * 255}, ${Math.max(Math.random(), 0.4)})`
		div.style.height = Math.random() * 200 + 200 + "px"
		div.classList.add("item")
		fragment.appendChild(div)
	}

	box.appendChild(fragment)
}

function _waterfalls() {
	const items = document.getElementsByClassName("item")
	const itemWidth = items[0].clientWidth
	const arr = []

	for (let i = 0; i < items.length; i++) {
		if (i < leg.value) {
			items[i].style.top = 0
			items[i].style.left = itemWidth * i + "px"
			arr.push(items[i].clientHeight)
		} else {
			const min = arr.reduce((prev, curr, index) => {
				if (prev.value < curr) {
					return prev
				} else {
					return {
						value: curr,
						index,
					}
				}
			}, {})

			items[i].style.top = arr[min.index] + "px"
			items[i].style.left = itemWidth * min.index + "px"
			arr[min.index] += items[i].clientHeight
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {
	changeleg()
	_create()
	_waterfalls()
})

window.onresize = () => {
	changeleg()
	_waterfalls()
}
