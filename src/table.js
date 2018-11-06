function Table(){
	const instance = this
	const children = []
	const parentWrapper = {parent: {}}
	Object.defineProperties(instance, {
		base: {
			get: ()=>instance.parent
		},
		addTo: Cafesheet.instanceMethods.addTo(parentWrapper),
		parent: {
			get: ()=>parentWrapper.parent
		},
		removeFromParent: Cafesheet.instanceMethods.removeFromParent(parentWrapper),
		sections: {
			get: ()=>Array.from(children),
			enumerable: true
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
