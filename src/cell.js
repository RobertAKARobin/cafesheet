function Cell(parent){
	const instance = this
	const pvt = {
		parent: (parent || undefined)
	}
	Object.defineProperties(instance, {
		row: {
			get: ()=>pvt.parent
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
Object.defineProperties(Cell, {
	ancestors: {
		value: [Row, Section, Table, Base]
	},
	parent: {
		value: Row
	}
})
