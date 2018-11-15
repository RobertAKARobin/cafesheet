function Row(parent){
	const instance = this
	const children = new Cafesheet.childCollection(instance)
	const pvt = {
		parent: (parent || undefined)
	}
	Object.defineProperties(instance, {
		children: {
			value: children
		},
		parent: {
			get: ()=>pvt.parent
		},

		addTo: {
			value: Cafesheet.instanceMethods.addToParent(instance, pvt)
		},
		removeFromParent: {
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
