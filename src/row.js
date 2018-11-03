function Row(){
}
Object.defineProperties(Row, {
	ancestors: {
		value: [Section, Table, Base]
	},
	child: {
		value: Cell,
		enumerable: true
	},
	descendants: {
		value: [Cell]
	},
	parent: {
		value: Section
	}
})
