function Row(){}
Object.defineProperties(Row, {
	ancestors: {
		value: [Section, Table, Base]
	},
	child: {
		value: Cell
	},
	descendants: {
		value: [Cell]
	},
	parent: {
		value: Section
	}
})
