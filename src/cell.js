function Cell(parent = undefined, input = {}){
	const cell = this
	const pvt = {
		instance: cell,
		parent
	}

	Object.defineProperties(cell, {
		addToParent: {
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
Object.defineProperties(Cell.prototype, {
	getSiblings: {
		value: Cafesheet.proto.getSiblings
	}
})
Object.defineProperties(Cell, {
	ancestors: {
		value: [Row, Section, Table, Base]
	},
	parent: {
		value: Row
	}
})
