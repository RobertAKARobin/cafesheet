function Table(){
	Object.defineProperties(this, CafesheetBase.instance.generateChildProperties())
}
Object.defineProperties(Table, CafesheetBase.static.generateFamilyTree(Table))
Object.defineProperties(Table.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties	
))
