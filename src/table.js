function Table(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign(
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Table, (function(){
	return Object.assign(
		{
			ancestors: {
				value: [Sheet]
			},
			child: {
				value: Section,
				enumerable: true
			},
			descendants: {
				value: [Section, Row, Cell]
			},
			parent: {
				value: Sheet
			}
		},
		CafesheetBase.static.generateIdProperties()
	)
})())
Object.defineProperties(Table.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties	
))
