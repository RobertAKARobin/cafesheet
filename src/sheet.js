function Sheet(id){
	Object.defineProperties(this, Object.assign( 
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties()
	))
}
Object.defineProperties(Sheet, Object.assign(
	CafesheetBase.static.generateFamilyTree(Sheet),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Section.prototype, Object.assign({},
	CafesheetBase.prototype.descendantProperties	
))
