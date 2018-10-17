function Cell(id){
	const instance = this
	Object.defineProperties(instance, Object.assign({},
		CafesheetBase.instance.generateIdProperties(id)
	))
}
Object.defineProperties(Cell, (function(){
	const all = CafesheetBase.allObj()
	return Object.assign(
		{
			ancestors: {
				value: [Row, Section, Table, Sheet]
			},
			parent: {
				value: Row
			}
		},
		CafesheetBase.static.generateIdProperties(all)
	)
})())
Object.defineProperties(Cell.prototype, Object.assign({}, 
	CafesheetBase.prototype.descendantProperties
))
