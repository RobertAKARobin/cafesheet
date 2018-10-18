function Table(){
	Object.defineProperties(this, CafesheetBase.instance.generateChildProperties())
}
Object.defineProperties(Table, Object.assign(
	CafesheetBase.static.generateFamilyTree(Table),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Table.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties	
))
