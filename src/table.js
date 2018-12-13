function Table(){
	const instance = this
	const pvt = {
		children: [],
		instance,
		parent: undefined
	}

	Object.defineProperties(instance, {
		addTo: {
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
	getColumnAt: {
		value: function(place){
			const instance = this
			return TableColumn.get({
				parent: instance,
				place
			})
		}
	},
	getColumns: {
		value: function(){
			const instance = this
			return instance.getWidth().map(place => {
				return instance.getColumnAt(place)
			})
		}
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
		get: ()=>[Base]
	},
	child: {
		get: ()=>Section
	},
	create: {
		value: Cafesheet.class.create(Table)
	},
	defaultNumberOfChildren: {
		value: 1
	},
	descendants: {
		get: ()=>[Section, Row, Cell]
	},
	new: {
		value: ()=>new Table()
	},
	parent: {
		get: ()=>Base
	},
	pluralName: {
		value: 'tables'
	}
})
