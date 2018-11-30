function Base(input = {}){
	const instance = this
	const pvt = {
		children: [],
		instance
	}

	Object.defineProperties(instance, {
		createChild: {
			value: Cafesheet.instance.createChild(pvt)
		},
		getChildren: {
			value: Cafesheet.instance.getChildren(pvt)
		},
		placeChild: {
			value: Cafesheet.instance.placeChild(pvt)
		},
		removeChild: {
			value: Cafesheet.instance.removeChild(pvt)
		}
	})
	Object.defineProperties(instance, {
		tables: {
			get: instance.getChildren,
			enumerable: true
		},

		addTable: {
			value: instance.addChild
		},
		createTable: {
			value: instance.createChild
		},
		removeTable: {
			value: instance.removeChild
		}
	})

	if(input.tables){
		input.tables.forEach(instance.createChild)
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
