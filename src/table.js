function Table(){
}
Object.defineProperties(Table, {
	ancestors: {
		value: [Sheet]
	},
	child: {
		value: Section,
		enumerable: true
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	parent: {
		value: Sheet
	}
})
