o.spec('Column', ()=>{
	'use strict'
	
	let sheet,
		table,
		section,
		column

	o.beforeEach(()=>{
		sheet = new Sheet()
		table = sheet.tables[0]
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
	o.spec('#remove', ()=>{
		let originalSectionWidth

		o.beforeEach(()=>{
			originalSectionWidth = section.width
			column.remove()
		})
		o('decreases section width by 1', ()=>{
			o(section.width).equals(originalSectionWidth - 1)
		})
		o('causes cells to not be indexed in parent rows', ()=>{
			column.cells.forEach(cell => o(cell.index).equals(-1))
		})
	})
})
