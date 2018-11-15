function Cell(parent){
	const instance = this
	const pvt = {
		parent: (parent || undefined)
	}
	Object.defineProperties(instance, {
		parent: {
			get: ()=>pvt.parent
		},

		addTo: {
			value: Cafesheet.instanceMethods.addToParent(instance, pvt)
		},
		removeFromParent: {
			value: Cafesheet.instanceMethods.removeFromParent(instance, pvt)
		},

		row: {
			get: ()=>pvt.parent
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
