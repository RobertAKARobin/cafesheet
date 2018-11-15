function Table(parent){
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

		base: {
			get: ()=>pvt.parent
		},
		sections: {
			get: children.get,
			enumerable: true
		},

		addSection: {
			value: children.add
		},
		createSection: {
			value: children.create
		},
		removeSection: {
			value: children.remove
		}
	})
}
Object.defineProperties(Table, {
	ancestors: {
		value: [Base]
	},
	child: {
		value: Section,
		enumerable: true
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	parent: {
		value: Base
	}
})
