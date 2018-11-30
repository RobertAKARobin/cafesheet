function Section(){
	const instance = this
	const pvt = {
		children: [],
		instance,
		parent: undefined
	}

	Object.defineProperties(instance, {
		addToParent: {
			value: Cafesheet.instance.addToParent(pvt)
		},
		createChild: {
			value: Cafesheet.instance.createChild(pvt)
		},
		getChildren: {
			value: Cafesheet.instance.getChildren(pvt)
		},
		getParent: {
			value: Cafesheet.instance.getParent(pvt)
		},
		placeChild: {
			value: Cafesheet.instance.placeChild(pvt)
		},
		removeChild: {
			value: Cafesheet.instance.removeChild(pvt)
		},
		removeFromParent: {
			value: Cafesheet.instance.removeFromParent(pvt)
		}
	})
	Object.defineProperties(instance, {
		place: {
			get: instance.getPlace,
			enumerable: true
		},
		rows: {
			get: instance.getChildren,
			enumerable: true
		},

		createRow: {
			value: instance.createChild
		}
	})
}
Object.defineProperties(Section.prototype, {
	empty: {
		value: Cafesheet.proto.empty
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
	scan: {
		value: Cafesheet.proto.scan
	}
})
Object.defineProperties(Section, {
	ancestors: {
		value: [Table, Base]
	},
	child: {
		value: Row
	},
	create: {
		value: Cafesheet.class.create(Section, 'rows')
	},
	defaultNumberOfChildren: {
		value: 3
	},
	descendants: {
		value: [Row, Cell]
	},
	new: {
		value: Cafesheet.class.new(Section)
	},
	parent: {
		value: Table
	}
})
