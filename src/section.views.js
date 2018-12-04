Section.component = {
	view: function(vnode){
		const section = vnode.attrs.section
		return [
			m('tbody.sectionHeader', [
				m('tr', [
					m('th'),
					section.getColumns().map((column, index) => {
						return m('th', index)
					})
				])
			]),
			m('tbody.sectionBody', section.rows.map(row => {
				return m(Row.component, {row})
			}))
		]
	}
}
