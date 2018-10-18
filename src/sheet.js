function Sheet(){
	Object.defineProperties(this, CafesheetBase.instance.generateChildProperties())
}
Object.defineProperties(Sheet, CafesheetBase.static.generateFamilyTree(Sheet))
Object.defineProperties(Sheet.prototype, Object.assign({},
	CafesheetBase.prototype.descendantProperties
))
