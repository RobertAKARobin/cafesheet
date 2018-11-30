function Cell(parent = undefined, input = {}){
	const instance = this
	const pvt = {
		instance,
		parent
	}

	Object.defineProperties(instance, {
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

	Object.defineProperties(instance, {
		place: {
			get: instance.getPlace,
			enumerable: true
		}
	})

	instance.datum = input.datum
}
Object.defineProperties(Cell.prototype, {
	empty: {
		value: function(){
			const instance = this
			instance.datum = ''
			return instance
		}
	},
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
