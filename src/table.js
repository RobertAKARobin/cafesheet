function Table(){
	const table = this
	Object.defineProperties(table, {
		parent: {
			configurable: true
		},
		base: {
			get: ()=>table.parent
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
