Row.prototype.view = function(){
	const row = this
	return m('tr', [
		// m('th', [
		// 	m('button', {
		// 		onclick: ()=>{
		// 			row.remove()
		// 		}
		// 	}, row.getIndex()),
		// 	m('button', {
		// 		onclick: ()=>{
		// 			row.createRow()
		// 		}
		// 	}, '+')
		// ]),
		row.cells.map(cell=>{
			return cell.view()
		})
	])
}
