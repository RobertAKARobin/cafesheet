function Section(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign({},
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Section, (function(){
	return Object.assign(
		{
			ancestors: {
				value: [Table, Sheet]
			},
			child: {
				value: Row,
				enumerable: true
			},
			descendants: {
				value: [Row, Cell]
			},
			parent: {
				value: Table
			}
		},
		CafesheetBase.static.generateIdProperties()
	)
})())
Object.defineProperties(Section.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties	
))
