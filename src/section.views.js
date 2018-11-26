Section.component = {
	view: function(vnode){
		const section = vnode.attrs.section
		return m('tbody', section.rows.map(row => {
			return m(Row.component, {row})
		}))
	}
}
