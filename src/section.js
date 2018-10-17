function Section(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign(
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Section, Object.assign(
	CafesheetBase.static.generateFamilyTree(Section),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Section.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties	
))
