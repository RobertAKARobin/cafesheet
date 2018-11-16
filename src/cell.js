function Cell(parent = undefined, input = {}){
	const instance = this
	const pvt = {
		parent
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
