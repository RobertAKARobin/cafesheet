Table.prototype.view = function(){
	const table = this
	return m('table', table.getSections().map((section)=>{
		return section.view()
	}))
}
