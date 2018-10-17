function Sheet(id){
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
Object.defineProperties(Sheet, (function(){
	const all = CafesheetBase.allObj()
	return {
		child: {
			value: Table,
			enumerable: true
		},
		descendants: {
			value: [Table, Section, Row, Cell]
		},

		getAll: {
			value: CafesheetBase.staticMethods.getAll(all)
		},
		new: {
			value: CafesheetBase.staticMethods.newWithId(all)
		}
	}
})())
Object.defineProperties(Sheet.prototype, {
		createChild: {
			value: CafesheetBase.prototypeMethods.createChild
		},
		getDescendants: {
			value: CafesheetBase.prototypeMethods.getDescendants
		}
})
