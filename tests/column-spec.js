o.spec('Column', ()=>{
	'use strict'
	
	let cafesheet,
		table,
		section,
		column

	o.beforeEach(()=>{
		cafesheet = new Cafesheet()
		table = cafesheet.tables[0]
		section = table.sections[0]
		column = section.columns[0]
	})
	o.spec('#place', ()=>{
		let originalIndex

		o.beforeEach(()=>{
			originalIndex = column.cells[0].index
			column.place(column.index + 1)
		})
		o('updates the indexes of all cells in the column', ()=>{
			column.cells.forEach(cell => o(cell.index).equals(originalIndex + 1))
		})
	})
})
