function Section(parent){
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
