function Table(base){
	const instance = this
	const parentWrapper = {parent: (base || {})}
	Object.defineProperties(instance, {
		base: {
			get: ()=>instance.parent
		},
		parent: {
			get: ()=>parentWrapper.parent
		}
	})
}
Object.defineProperties(Table, {
	ancestors: {
		value: [Base]
	},
	child: {
		value: Section,
		enumerable: true
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	parent: {
		value: Base
	}
})
