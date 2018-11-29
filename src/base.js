function Base(input = {}){
	const base = this
	const pvt = {
		children: [],
		instance: base
	}

	Object.defineProperties(base, {
		getChildren: {
			value: Cafesheet.instance.getChildren(pvt)
		},
		createChild: {
			value: Cafesheet.instance.createChild(pvt)
		},
		placeChild: {
			value: Cafesheet.instance.placeChild(pvt)
		},
		removeChild: {
			value: Cafesheet.instance.removeChild(pvt)
		}
	})
	Object.defineProperties(base, {
		tables: {
			get: base.getChildren,
			enumerable: true
		},

		addTable: {
			value: base.addChild
		},
		createTable: {
			value: base.createChild
		},
		removeTable: {
			value: base.removeChild
		}
	})

	if(input.tables){
		input.tables.forEach(base.createTable)
	}
}
Object.defineProperties(Base, {
	child: {
		value: Table
	},
	descendants: {
		value: [Table, Section, Row, Cell]
	}
})
