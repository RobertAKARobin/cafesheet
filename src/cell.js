function Cell(id){
	const instance = this
	Object.defineProperties(instance, CafesheetBase.instance.generateIdProperties(id))
}
Object.defineProperties(Cell, (function(){
	return Object.assign(
		{
			ancestors: {
				value: [Row, Section, Table, Sheet]
			},
			parent: {
				value: Row
			}
		},
		CafesheetBase.static.generateIdProperties()
	)
})())
Object.defineProperties(Cell.prototype, Object.assign({}, 
	CafesheetBase.prototype.descendantProperties
))
