function Table(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign(
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Table, Object.assign(
	CafesheetBase.static.generateFamilyTree(Table),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Table.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties	
))
