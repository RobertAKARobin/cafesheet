function Row(parent = undefined, input = {}){
	const instance = this
	const children = new Cafesheet.childCollection(instance)
	const pvt = {
		parent
	}
	Object.defineProperties(instance, {
		children: {
			value: children
		},
		index: {
			get: Cafesheet.instanceMethods.index
		},
		parent: {
			get: ()=>pvt.parent
		},
		siblings: {
			get: Cafesheet.instanceMethods.siblings
		},

		addTo: {
			value: Cafesheet.instanceMethods.addToParent(instance, pvt)
		},
		placeAt: {
			value: Cafesheet.instanceMethods.placeAt
		},
		remove: {
			value: Cafesheet.instanceMethods.removeFromParent(instance, pvt)
		},

		section: {
			get: ()=>pvt.parent
		},
		cells: {
			get: children.get,
			enumerable: true
		},

		addCell: {
			value: children.add
		},
		createCell: {
			value: children.create
		},
		removeCell: {
			value: children.remove
		}
	})

	if(input.cells){
		input.cells.forEach(instance.createCell)
	}
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
