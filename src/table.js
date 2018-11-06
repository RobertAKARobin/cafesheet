function Table(){
	const instance = this
	const children = []
	const parentWrapper = {parent: {}}
	Object.defineProperties(instance, {
		base: {
			get: ()=>instance.parent
		},
		parent: {
			get: ()=>parentWrapper.parent
		},
		sections: {
			get: ()=>Array.from(children),
			enumerable: true
		},
		
		addTo: {
			value: Cafesheet.instanceMethods.addTo(parentWrapper)
		},
		removeFromParent: {
			value: Cafesheet.instanceMethods.removeFromParent(parentWrapper)
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
