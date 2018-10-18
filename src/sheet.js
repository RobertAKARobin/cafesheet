function Sheet(){}
Object.defineProperties(Sheet, Object.assign(
	CafesheetBase.static.generateFamilyTree(Sheet),
	CafesheetBase.instance.generateChildProperties(),
	CafesheetBase.prototype.descendantProperties
))
