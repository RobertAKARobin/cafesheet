function Row(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign(
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Row, Object.assign(
	CafesheetBase.static.generateFamilyTree(Row),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Row.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties
))
