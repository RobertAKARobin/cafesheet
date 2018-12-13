function Row(){
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
		cells: {
			get: instance.getChildren,
			enumerable: true
		},

		createCell: {
			value: instance.createChild
		}
	})
}
Object.defineProperties(Row.prototype, {
	empty: {
		value: Cafesheet.proto.empty
	},
	getPlace: {
		value: Cafesheet.proto.getPlace
	},
	getSiblings: {
		value: Cafesheet.proto.getSiblings
	},
	getWidth: {
		value: function(){
			const instance = this
			return instance.getChildren().length
		}
	},
	placeAt: {
		value: Cafesheet.proto.placeAt
	},
	scanFor: {
		value: Cafesheet.proto.scanForFamily
	}
})
Object.defineProperties(Row, {
	ancestors: {
		value: [Section, Table, Base]
	},
	child: {
		value: Cell
	},
	create: {
		value: function(input = {}){
			const row = Row.new()
			if(input.cells){
				input.cells.forEach(row.createChild)
			}else{
				const table = row.scanFor(Table)
				if(table){
					table.getWidth().times(row.createChild)
				}else{
					(Row.defaultNumberOfChildren).times(row.createChild)
				}
			}
			return row
		}
	},
	defaultNumberOfChildren: {
		value: 5
	},
	descendants: {
		value: [Cell]
	},
	new: {
		value: ()=>new Row()
	},
	parent: {
		value: Section
	},
	pluralName: {
		value: 'rows'
	}
})
