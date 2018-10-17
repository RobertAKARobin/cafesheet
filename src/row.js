function Row(id){
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
Object.defineProperties(Row, (function(){
	const all = CafesheetBase.allObj()
	return {
		ancestors: {
			value: [Section, Table, Sheet]
		},
		child: {
			value: Cell,
			enumerable: true
		},
		descendants: {
			value: [Cell]
		},
		parent: {
			value: Section
		},

		getAll: {
			value: CafesheetBase.staticMethods.getAll(all)
		},
		new: {
			value: CafesheetBase.staticMethods.newWithId(all)
		}
	}
})())
Object.defineProperties(Row.prototype, {
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
