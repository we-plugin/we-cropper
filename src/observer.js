/**
 *
 */
import { firstLetterUpper } from './utils'

export default function observer() {
	const self = this

	const EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad']

	self.on = (event, fn) => {
		if (EVENT_TYPE.indexOf(event) > -1) {
			if (typeof(fn) === 'function') {
				event === 'ready'
					? fn(self)
					: self[`on${ firstLetterUpper(event) }`] = fn
			}
		} else {
			console.error(`event: ${ event } is invalid`)
		}
		return self
	}
}