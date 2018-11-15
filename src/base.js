function Base(){
	const instance = this
	const children = new Cafesheet.childCollection(instance)

	Object.defineProperties(instance, {
		children: {
			value: children
		},
		tables: {
			get: children.get,
			enumerable: true
		},

		addTable: {
			value: children.add
		},
		createTable: {
			value: children.create
		},
		removeTable: {
			value: children.remove
		}
	})
}
Object.defineProperties(Base, {
	child: {
		value: Table,
		enumerable: true
	},
	descendants: {
		value: [Table, Section, Row, Cell]
	}
})
