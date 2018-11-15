function Table(parent){
	const instance = this
	const children = new Cafesheet.childCollection(instance, Section)
	const pvt = {
		parent: (parent || undefined)
	}
	Object.defineProperties(instance, {
		base: {
			get: ()=>pvt.parent
		},
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
