function Table(parent = undefined, input = {}){
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
		remove: {
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

	if(input.sections){
		input.sections.forEach(instance.createSection)
	}
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
