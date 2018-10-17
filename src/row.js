function Row(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign({},
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Row, (function(){
	const all = CafesheetBase.allObj()
	return Object.assign(
		{
			ancestors: {
				value: [Section, Table, Sheet]
			},
			child: {
				value: Cell,
				enumerable: true
			},
			descendants: {
				value: [Cell]
			},
			parent: {
				value: Section
			}
		},
		CafesheetBase.static.generateIdProperties(all)
	)
})())
Object.defineProperties(Row.prototype, Object.assign({},
	CafesheetBase.prototype.ancestorPropetries,
	CafesheetBase.prototype.descendantProperties
))
