Table.component = {
	view: function(vnode){
		const table = vnode.attrs.table
		return m('table', table.sections.map(section => {
			return m(Section.component, {section})
		}))
	}
}
