Cell.component = {
	view: function(vnode){
		let cell = vnode.attrs.cell
		return m('td', [
			m('textarea', {
				value: (cell.datum === undefined ? '' : cell.datum),
				oninput: (event)=>{
					event.redraw = false
					cell.datum = event.target.value
				}
			})
		])
	}
}
