let tmp = {}

export default {
	id: {
		default: 'cropper',
		get () {
			return tmp.id
		},
		set (value) {
			if (typeof(value) !== 'string') {
				console.error(`id：${value} is invalid`)
			}
			tmp.id = value
		}
	},
	width: {
		default: 750,
		get () {
			return tmp.width
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`width：${value} is invalid`)
			}
			tmp.width = value
		}
	},
	height: {
		default: 750,
		get () {
			return tmp.height
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`height：${value} is invalid`)
			}
			tmp.height = value
		}
	},
	scale: {
		default: 2.5,
		get () {
			return tmp.scale
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`scale：${value} is invalid`)
			}
			tmp.scale = value
		}
	},
	zoom: {
		default: 5,
		get () {
			return tmp.zoom
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`zoom：${value} is invalid`)
			} else if (value < 0 || value > 10) {
				console.error(`zoom should be ranged in 0 ~ 10`)
			}
			tmp.zoom = value
		}
	},
	src: {
		default: 'cropper',
		get () {
			return tmp.src
		},
		set (value) {
			if (typeof(value) !== 'string') {
				console.error(`id：${value} is invalid`)
			}
			tmp.src = value
		}
	},
	cut: {
		default: {},
		get () {
			return tmp.cut
		},
		set (value) {
			if (typeof(value) !== 'object') {
				console.error(`id：${value} is invalid`)
			}
			tmp.cut = value
		}
	},
	onReady: {
		default: null,
		get () {
			return tmp.ready
		},
		set (value) {
			tmp.ready = value
		}
	},
	onBeforeImageLoad: {
		default: null,
		get () {
			return tmp.beforeImageLoad
		},
		set (value) {
			tmp.beforeImageLoad = value
		}
	},
	onImageLoad: {
		default: null,
		get () {
			return tmp.imageLoad
		},
		set (value) {
			tmp.imageLoad = value
		}
	},
	onBeforeDraw: {
		default: null,
		get () {
			return tmp.beforeDraw
		},
		set (value) {
			tmp.beforeDraw = value
		}
	}
}