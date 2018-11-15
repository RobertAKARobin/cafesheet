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
