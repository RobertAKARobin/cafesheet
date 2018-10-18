function Section(){
	Object.defineProperties(this, CafesheetBase.instance.generateChildProperties())
}
Object.defineProperties(Section, CafesheetBase.static.generateFamilyTree(Section))
Object.defineProperties(Section.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties
))
