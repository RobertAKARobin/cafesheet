function Cell(){
}
Object.defineProperties(Cell, {
	ancestors: {
		value: [Row, Section, Table, Sheet]
	},
	parent: {
		value: Row
	}
})
