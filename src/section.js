function Section(parent = undefined, input = {}){
	const instance = this
	const children = new Cafesheet.childCollection(instance)
	const pvt = {
		parent
	}
	Object.defineProperties(instance, {
		children: {
			value: children
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

		table: {
			get: ()=>pvt.parent
		},
		rows: {
			get: children.get,
			enumerable: true
		},

		addRow: {
			value: children.add
		},
		createRow: {
			value: children.create
		},
		removeRow: {
			value: children.remove
		}
	})

	if(input.rows){
		input.rows.forEach(instance.createRow)
	}
}
Object.defineProperties(Section, {
	ancestors: {
		value: [Table, Base]
	},
	child: {
		value: Row,
		enumerable: true
	},
	descendants: {
		value: [Row, Cell]
	},
	parent: {
		value: Table
	}
})
