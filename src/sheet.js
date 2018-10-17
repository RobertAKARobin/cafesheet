function Sheet(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign( 
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Sheet, Object.assign(
	CafesheetBase.static.generateFamilyTree(Sheet),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Section.prototype, Object.assign({},
	CafesheetBase.prototype.descendantProperties	
))
