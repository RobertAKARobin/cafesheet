Section.prototype.view = function(){
	const section = this
	return m('tbody', section.rows.map(row => m(row)))
}
