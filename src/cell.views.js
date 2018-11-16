Cell.prototype.view = function(){
	let cell = this
	return m('td', [
		m('textarea', {
			// value: (cell.datum === undefined ? '' : cell.datum),
			// oninput: (event)=>{
			// 	event.redraw = false
			// 	cell.datum = event.target.value
			// }
		})
	])
}
