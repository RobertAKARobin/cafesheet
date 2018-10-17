function Sheet(id){
	const instance = this
	const children = []
	Object.defineProperties(instance, Object.assign({},
		CafesheetBase.instance.generateIdProperties(id),
		CafesheetBase.instance.generateChildProperties(children)
	))
}
Object.defineProperties(Sheet, (function(){
	const all = CafesheetBase.allObj()
	return Object.assign(
		{
			child: {
				value: Table,
				enumerable: true
			},
			descendants: {
				value: [Table, Section, Row, Cell]
			}
		},
		CafesheetBase.static.generateIdProperties(all)
	)
})())
Object.defineProperties(Section.prototype, Object.assign({},
	CafesheetBase.prototype.descendantProperties	
))
