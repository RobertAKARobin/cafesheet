function Section(){}
Object.defineProperties(Section, {
	ancestors: {
		value: [Table, Base]
	},
	child: {
		value: Row
	},
	descendants: {
		value: [Row, Cell]
	},
	parent: {
		value: Table
	}
})
