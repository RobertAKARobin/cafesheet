Table.prototype.view = function(){
	const table = this
	return m('table', table.sections.map(section=>{
		return section.view()
	}))
}
