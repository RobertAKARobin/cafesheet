function Cell(){}
Object.defineProperties(Cell, Object.assign(
	CafesheetBase.static.generateFamilyTree(Cell),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Cell.prototype, Object.assign({}, 
	CafesheetBase.prototype.descendantProperties
))
