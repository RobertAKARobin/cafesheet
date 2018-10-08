Sheet.prototype.view = function(){
	const sheet = this
	return sheet.getTables().map((table)=>{
		return table.view()
	})
}
