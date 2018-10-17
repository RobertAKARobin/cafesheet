function Section(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, {
		addChild: {
			value: CafesheetBase.instanceMethods.addChild(children)
		},
		getChildren: {
			value: CafesheetBase.instanceMethods.getChildren(children)
		},
		id: {
			value: id,
			enumerable: true
		}
	})
}
Object.defineProperties(Section, (function(){
	const all = CafesheetBase.allObj()
	return {
		ancestors: {
			value: [Table, Sheet]
		},
		child: {
			value: Row,
			enumerable: true
		},
		descendants: {
			value: [Row, Cell]
		},
		parent: {
			value: Table
		},

		getAll: {
			value: CafesheetBase.staticMethods.getAll(all)
		},
		new: {
			value: CafesheetBase.staticMethods.newWithId(all)
		}
	}
})())
Object.defineProperties(Section.prototype, {
	createChild: {
		value: CafesheetBase.prototypeMethods.createChild
	},
	getAncestors: {
		value: CafesheetBase.prototypeMethods.getAncestors,
	},
	getDescendants: {
		value: CafesheetBase.prototypeMethods.getDescendants
	},
	getIndex: {
		value: CafesheetBase.prototypeMethods.getIndex
	},
	getLength: {
		value: CafesheetBase.prototypeMethods.getLength
	},
	getNext: {
		value: CafesheetBase.prototypeMethods.getNext
	},
	getParent: {
		value: CafesheetBase.prototypeMethods.getParent
	},
	getPrevious: {
		value: CafesheetBase.prototypeMethods.getPrevious
	}
})
