function Table(){
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
		sections: {
			get: instance.getChildren,
			enumerable: true
		},

		createSection: {
			value: instance.createChild
		}
	})
}
Object.defineProperties(Table.prototype, {
	empty: {
		value: Cafesheet.proto.empty
	},
	getColumns: {
		value: Cafesheet.proto.getColumns
	},
	getPlace: {
		value: Cafesheet.proto.getPlace
	},
	getSiblings: {
		value: Cafesheet.proto.getSiblings
	},
	getWidth: {
		value: Cafesheet.proto.getWidthOfRows
	},
	placeAt: {
		value: Cafesheet.proto.placeAt
	},
	scanFor: {
		value: Cafesheet.proto.scanForFamily
	}
})
Object.defineProperties(Table, {
	ancestors: {
		value: [Base]
	},
	child: {
		value: Section
	},
	defaultNumberOfChildren: {
		value: 1
	},
	create: {
		value: Cafesheet.class.create(Table, 'sections')
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	new: {
		value: Cafesheet.class.new(Table)
	},
	parent: {
		value: Base
	}
})
