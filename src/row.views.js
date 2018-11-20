Row.prototype.view = function(){
	const row = this
	return m('tr', [
		m('th', [
			m('button[action=remove]', {
				onclick: ()=>{
					row.remove()
				}
			}),
			m('button[action=create]', {
				onclick: ()=>{
					row.siblings.create()
				}
			}, '+')
		]),
		row.cells.map(cell => m(cell))
	])
}
