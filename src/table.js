function Table(){
	const table = this
	Object.defineProperties(table, {
		parent: {
			configurable: true
		},
		sheet: {
			get: ()=>table.parent
		}
	})
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
