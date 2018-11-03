function Section(){
}
Object.defineProperties(Section, {
	ancestors: {
		value: [Table, Base]
	},
	child: {
		value: Row,
		enumerable: true
	},
	descendants: {
		value: [Row, Cell]
	},
	parent: {
		value: Table
	}
})
