Cafesheet.prototype.view = function(){
	return this.tables.map((table)=>{
		return table.view()
	})
}

Table.prototype.view = function(){
	return m('table', this.sections.map((section)=>{
		return section.view()
	}))
}

Section.prototype.view = function(){
	const section = this
	return m('tbody', [
		m('tr', [
			m('th', [
				m('button', {
					onclick: ()=>{
						section.createColumn().place(0)
					}
				}, '+'),
				m('button',{
					onclick: ()=>{
						section.createRow().place(0)
					}
				}, '+')
			]),
			section.columns.map((column)=>{
				return m('th', [
					m('button', column.index),
					m('button', {
						onclick: ()=>{
							column.createColumn()
						}
					}, '+')
				])
			})
		]),
		section.rows.map((row)=>{
			return row.view()
		})
	])
}

Row.prototype.view = function(){
	const row = this
	return m('tr', [
		m('th', [
			m('button', {
				onclick: ()=>{
					row.remove()
				}
			}, row.index),
			m('button', {
				onclick: ()=>{
					row.createRow()
				}
			}, '+')
		]),
		row.cells.map((cell)=>{
			return cell.view()
		})
	])
}

Cell.prototype.view = function(){
	let cell = this
	return m('td', [
		m('textarea', {
			value: cell.datum,
			oninput: (event)=>{
				event.redraw = false
				cell.datum = event.target.value
			}
		})
	])
}
