function Cell(){
}
Object.defineProperties(Cell, {
	ancestors: {
		value: [Row, Section, Table, Base]
	},
	parent: {
		value: Row
	}
})
