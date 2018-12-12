function Section(){
	const instance = this
	const pvt = {
		children: [],
		instance,
		parent: undefined
	}

	Object.defineProperties(instance, {
		addTo: {
			value: Cafesheet.instance.addTo(pvt)
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
		value: ()=>new Section()
	},
	parent: {
		value: Table
	}
})
