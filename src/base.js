function Base(input = {}){
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

	if(input.tables){
		input.tables.forEach(instance.createTable)
	}
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
