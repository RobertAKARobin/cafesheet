function Row(parent = undefined, input = {}){
	const row = this
	const pvt = {
		children: [],
		instance: row,
		parent
	}

	Object.defineProperties(row, {
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
	Object.defineProperties(row, {
		cells: {
			get: row.getChildren,
			enumerable: true
		}
	})
}
Object.defineProperties(Row.prototype, {
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
Object.defineProperties(Row, {
	ancestors: {
		value: [Section, Table, Base]
	},
	child: {
		value: Cell
	},
	descendants: {
		value: [Cell]
	},
	parent: {
		value: Section
	}
})
