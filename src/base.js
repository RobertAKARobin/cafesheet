function Base(){
	const instance = this
	const pvt = {
		children: [],
		instance
	}

	Object.defineProperties(instance, {
		createChild: {
			value: Cafesheet.instance.createChild(pvt)
		},
		getChildren: {
			value: Cafesheet.instance.getChildren(pvt)
		},
		placeChild: {
			value: Cafesheet.instance.placeChild(pvt)
		},
		removeChild: {
			value: Cafesheet.instance.removeChild(pvt)
		}
	})
	Object.defineProperties(instance, {
		tables: {
			get: instance.getChildren,
			enumerable: true
		},

		addTable: {
			value: instance.addChild
		},
		createTable: {
			value: instance.createChild
		},
		removeTable: {
			value: instance.removeChild
		}
	})
}
Object.defineProperties(Base.prototype, {
	empty: {
		value: Cafesheet.proto.empty
	},
	scanFor: {
		value: Cafesheet.proto.scanForFamily
	}
})
Object.defineProperties(Base, {
	child: {
		value: Table
	},
	create: {
		value: Cafesheet.class.create(Base, 'tables')
	},
	defaultNumberOfChildren: {
		value: 1
	},
	descendants: {
		value: [Table, Section, Row, Cell]
	},
	new: {
		value: ()=>new Base()
	}
})
