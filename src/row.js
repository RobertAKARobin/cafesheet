function Row(){
	Object.defineProperties(this, CafesheetBase.instance.generateChildProperties())
}
Object.defineProperties(Row, Object.assign(
	CafesheetBase.static.generateFamilyTree(Row),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Row.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties
))
