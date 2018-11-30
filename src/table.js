function Table(parent = undefined, input = {}){
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
		sections: {
			get: instance.getChildren,
			enumerable: true
		},

		createSection: {
			value: instance.createChild
		}
	})

	if(input.sections){
		input.sections.forEach(instance.createChild)
	}
}
Object.defineProperties(Table.prototype, {
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
