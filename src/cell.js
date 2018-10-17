function Cell(id){
	Object.defineProperties(this, CafesheetBase.instance.generateIdProperties(id))
}
Object.defineProperties(Cell, Object.assign(
	CafesheetBase.static.generateFamilyTree(Cell),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Cell.prototype, Object.assign({}, 
	CafesheetBase.prototype.descendantProperties
))
