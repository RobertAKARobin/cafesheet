function Table(parent = undefined, input = {}){
	const instance = this
	const pvt = {
		children: [],
		instance,
		parent
	}

	Object.defineProperties(instance, {
		addTo: {
			value: Cafesheet.instance.addToParent(pvt)
		},
		getParent: {
			value: Cafesheet.instance.getParent(pvt)
		},
		removeFromParent: {
			value: Cafesheet.instance.removeFromParent(pvt)
		}
	})
}
Object.defineProperties(Table, {
	ancestors: {
		value: [Base]
	},
	child: {
		value: Section
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	parent: {
		value: Base
	}
})
