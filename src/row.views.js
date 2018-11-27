Row.component = {
	view: function(vnode){
		const row = vnode.attrs.row
		return m('tr', [
			m('th', [
				m('button[action=remove]', {
					onclick: ()=>{
						row.remove()
					}
				}, [
					m('span.rowIndex', row.index)
				]),
				m('button[action=create]', {
					onclick: ()=>{
						row.siblings.create().placeAt(row.index + 1)
					}
				}, '+')
			]),
			row.cells.map(cell => {
				return m(Cell.component, {cell})
			})
		])
	}
}
