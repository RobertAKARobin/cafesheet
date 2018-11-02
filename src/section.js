function Section(){
}
Object.defineProperties(Section, {
	ancestors: {
		value: [Table, Sheet]
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
