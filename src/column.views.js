Column.prototype.view = function(){
	const column = this
	return m('th', [
		m('button', {
			onclick: ()=>{
				column.remove()
			},
		}, column.index),
		m('button', {
			onclick: ()=>{
				column.createColumn()
			}
		}, '+')
	])
}
