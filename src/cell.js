function Cell(){}
Object.defineProperties(Cell, CafesheetBase.static.generateFamilyTree(Cell))
Object.defineProperties(Cell.prototype, Object.assign({}, 
	CafesheetBase.prototype.descendantProperties
))
