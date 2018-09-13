o.spec('Column', ()=>{
	let cafesheet,
		table,
		section,
		column
	o.before(()=>{
		cafesheet = new Cafesheet()
		table = cafesheet.tables[0]
		section = table.sections[0]
		column = section.columns[0]
	})
	o.spec('#place', ()=>{
		o('updates the indexes of all cells in the column', ()=>{
			let originalIndex = column.cells[0].index
			column.place(column.index + 1)
			column.cells.forEach(cell => o(cell.index).equals(originalIndex + 1))
		})
	})
})
