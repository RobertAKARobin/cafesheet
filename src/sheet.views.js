Sheet.prototype.view = function(){
	const sheet = this
	return sheet.tables.map((table)=>{
		return table.view()
	})
}
