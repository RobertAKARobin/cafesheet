function Cell(id){
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
Object.defineProperties(Cell, (function(){
	const all = CafesheetBase.allObj()
	return {
		ancestors: {
			value: [Row, Section, Table, Sheet]
		},
		parent: {
			value: Row
		},

		getAll: {
			value: CafesheetBase.staticMethods.getAll(all)
		},
		new: {
			value: CafesheetBase.staticMethods.newWithId(all)
		}
	}
})())
Object.defineProperties(Cell.prototype, {
	getAncestors: {
		value: CafesheetBase.prototypeMethods.getAncestors,
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
