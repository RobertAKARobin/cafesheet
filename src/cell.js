function Cell(parent = undefined, input = {}){
	const instance = this
	const pvt = {
		parent
	}
	
	Object.defineProperties(instance, {
		parent: {
			get: ()=>pvt.parent
		},
		index: {
			get: Cafesheet.instanceMethods.index
		},
		siblings: {
			get: Cafesheet.instanceMethods.siblings
		},

		addTo: {
			value: Cafesheet.instanceMethods.addToParent(instance, pvt)
		},
		placeAt: {
			value: Cafesheet.instanceMethods.placeAt
		},
		remove: {
			value: Cafesheet.instanceMethods.removeFromParent(instance, pvt)
		},

		row: {
			get: ()=>pvt.parent
		}
	})

	if(input.datum){
		instance.datum = input.datum
	}
}
Object.defineProperties(Cell, {
	ancestors: {
		value: [Row, Section, Table, Base]
	},
	parent: {
		value: Row
	}
})
