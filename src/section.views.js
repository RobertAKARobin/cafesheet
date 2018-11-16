Section.prototype.view = function(){
	const section = this
	return m('tbody', [
		// m('tr', [
		// 	m('th', [
		// 		m('button', {
		// 			onclick: ()=>{
		// 				section.createColumn().place(0)
		// 			}
		// 		}, '+'),
		// 		m('button',{
		// 			onclick: ()=>{
		// 				section.createRow().place(0)
		// 			}
		// 		}, '+')
		// 	]),
		// 	section.columns.map((column)=>{
		// 		return column.view()
		// 	})
		// ]),
		section.rows.map(row=>{
			return row.view()
		})
	])
}
