Base.prototype.view = function(){
	const base = this
	return m('div.base', base.tables.map(table => m(table)))
}
