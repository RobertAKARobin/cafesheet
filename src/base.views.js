Base.component = {
	view: function(){
		return m('div.base', Cafesheet.state.base.tables.map(table => {
			return m(Table.component, {table})
		}))
	}
}
