function Section(parent = undefined, input = {}){
	const section = this
	const pvt = {
		children: [],
		instance: section,
		parent
	}

	Object.defineProperties(section, {
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
	Object.defineProperties(section, {
		place: {
			get: section.getPlace,
			enumerable: true
		},
		rows: {
			get: section.getChildren,
			enumerable: true
		},

		createRow: {
			value: section.createChild
		}
	})

	if(input.rows){
		input.rows.forEach(section.createRow)
	}
}
Object.defineProperties(Section.prototype, {
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
Object.defineProperties(Section, {
	ancestors: {
		value: [Table, Base]
	},
	child: {
		value: Row
	},
	descendants: {
		value: [Row, Cell]
	},
	parent: {
		value: Table
	}
})
