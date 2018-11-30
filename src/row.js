function Row(parent = undefined, input = {}){
	const instance = this
	const pvt = {
		children: [],
		instance,
		parent
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
		cells: {
			get: instance.getChildren,
			enumerable: true
		},

		createCell: {
			value: instance.createChild
		}
	})

	if(input.cells){
		input.cells.forEach(instance.createChild)
	}
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
