o.spec('Row', ()=>{
	'use strict'
	
	let sheet,
		table,
		section,
		row

	o.beforeEach(()=>{
		sheet = new Sheet()
		table = sheet.tables[0]
		section = table.sections[0]
		row = section.rows[0]
	})
	o('inheritance is correct', ()=>{
		o(row.class).equals(Row)
		o(Row.parentClass).equals(Section)
		o(row.parentClass).equals(Section)
		o(Row.childClass).equals(Cell)
		o(row.childClass).equals(Cell)
		o(row.parent).equals(section)
		o(row.section).equals(section)
		o(row.table).equals(table)
		o(row.sheet).equals(sheet)
	})
	o('#constructor creates at least one cell', ()=>{
		o(row.cells.length >= 1).equals(true)
	})
	o.spec('#createCell', ()=>{
		let originalNumberOfCells,
			cell

		o.beforeEach(()=>{
			originalNumberOfCells = row.cells.length
			cell = row.createCell()
		})
		o('increases the row\'s cells by 1', ()=>{
			o(row.cells.length).equals(originalNumberOfCells + 1)
		})
		o('returns a Cell', ()=>{
			o(cell.class).equals(Cell)
		})
	})
	o.spec('.cells, each', ()=>{
		o('it is a Cell', ()=>{
			row.cells.forEach(cell => o(cell.constructor).equals(Cell))
		})
		o('it has a reference to the parent Row', ()=>{
			row.cells.forEach(cell => o(cell.row).equals(row))
		})
	})
	o('.width returns the number of cells', ()=>{
		o(row.width).equals(row.cells.length)
	})
})
