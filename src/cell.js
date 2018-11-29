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
	Object.defineProperties(cell, {
		place: {
			get: cell.getPlace,
			enumerable: true
		}
	})
}
Object.defineProperties(Cell.prototype, {
	getPlace: {
		value: Cafesheet.proto.getPlace
	},
	getSiblings: {
		value: Cafesheet.proto.getSiblings
	},
	placeAt: {
		value: Cafesheet.proto.placeAt
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
