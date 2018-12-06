function Cell(){
	const instance = this
	const pvt = {
		instance,
		parent: undefined
	}

	Object.defineProperties(instance, {
		addTo: {
			value: Cafesheet.instance.addTo(pvt)
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
	},
	scanFor: {
		value: Cafesheet.proto.scanForFamily
	}
})
Object.defineProperties(Cell, {
	ancestors: {
		value: [Row, Section, Table, Base]
	},
	create: {
		value: function(input = {}){
			const cell = new Cell()
			cell.datum = input.datum
			return cell
		}
	},
	new: {
		value: Cafesheet.class.new(Cell)
	},
	parent: {
		value: Row
	}
})
