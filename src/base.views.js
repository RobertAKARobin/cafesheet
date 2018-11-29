Base.component = {
	view: function(){
		const base = Cafesheet.state.base
		return m('div.base', base.tables.map(table => {
			return m(Table.component, {table})
		}))
	}
}
