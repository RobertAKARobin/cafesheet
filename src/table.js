function Table(parent = undefined, input = {}){
	const instance = this
	const pvt = {
		children: [],
		instance,
		parent
	}
}
Object.defineProperties(Table, {
	ancestors: {
		value: [Base]
	},
	child: {
		value: Section
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	parent: {
		value: Base
	}
})
