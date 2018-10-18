function Section(){
	Object.defineProperties(this, CafesheetBase.instance.generateChildProperties())
}
Object.defineProperties(Section, Object.assign(
	CafesheetBase.static.generateFamilyTree(Section),
	CafesheetBase.static.generateIdProperties()
))
Object.defineProperties(Section.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties
))
