Row.prototype.view = function(){
	const row = this
	return m('tr', [
		m('th', [
			m('button', {
				onclick: ()=>{
					row.remove()
				}
			}),
			m('button', {
				onclick: ()=>{
					row.parent.children.create()
				}
			}, '+')
		]),
		row.cells.map(cell=>{
			return cell.view()
		})
	])
}
