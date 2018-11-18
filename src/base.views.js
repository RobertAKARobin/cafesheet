Base.prototype.view = function(){
	const base = this
	return base.tables.map(table => m(table))
}
