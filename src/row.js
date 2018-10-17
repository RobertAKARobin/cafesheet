function Row(id){
	Object.defineProperties(this, Object.assign(
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties()
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
