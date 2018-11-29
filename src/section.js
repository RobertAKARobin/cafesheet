function Section(parent = undefined, input = {}){
	const section = this
	const pvt = {
		children: [],
		instance: section,
		parent
	}

	Object.defineProperties(section, {
		addChild: {
			value: Cafesheet.instance.addChild(pvt)
		},
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
		removeChild: {
			value: Cafesheet.instance.removeChild(pvt)
		},
		removeFromParent: {
			value: Cafesheet.instance.removeFromParent(pvt)
		}
	})
	Object.defineProperties(section, {
		rows: {
			get: section.getChildren,
			enumerable: true
		}
	})
}
Object.defineProperties(Section.prototype, {
	getSiblings: {
		value: Cafesheet.proto.getSiblings
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
