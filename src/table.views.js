Table.component = {
	view: function(vnode){
		const table = vnode.attrs.table
		return m('table', [
			m('tbody', [
				m('tr', [
					m('th'),
					table.getColumns().map((column, index) => {
						return m('th', index)
					})
				])
			]),
			table.sections.map(section => {
				return m(Section.component, {section})
			})
		])
	}
}
