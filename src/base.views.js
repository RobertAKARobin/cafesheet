Base.prototype.view = function(){
	const base = this
	return base.tables.map(table=>{
		return table.view()
	})
}
