function Table(parent = undefined, input = {}){
	const table = this
	const pvt = {
		children: [],
		instance: table,
		parent
	}

	Object.defineProperties(table, {
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
	Object.defineProperties(table, {
		sections: {
			get: table.getChildren,
			enumerable: true
		}
	})
}
Object.defineProperties(Table.prototype, {
	getPlace: {
		value: Cafesheet.proto.getPlace
	},
	getSiblings: {
		value: Cafesheet.proto.getSiblings
	}
})
Object.defineProperties(Table, {
	ancestors: {
		value: [Base]
	},
	child: {
		value: Section
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	parent: {
		value: Base
	}
})
