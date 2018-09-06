const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Row', ()=>{
	let coffeesheet = new Coffeesheet(),
		table = coffeesheet.tables[0],
		section = table.sections[0],
		row = section.rows[0]
	
	o('inheritance is correct', ()=>{
		o(row.class).equals(Row)
		o(Row.parentClass).equals(Section)
		o(row.parentClass).equals(Section)
		o(Row.childClass).equals(Cell)
		o(row.childClass).equals(Cell)
		o(row.parent).equals(section)
		o(row.section).equals(section)
		o(row.table).equals(table)
		o(row.coffeesheet).equals(coffeesheet)
	})
	o('#constructor creates at least one cell', ()=>{
		o(row.cells.length >= 1).equals(true)
	})
	o.spec('#createCell', ()=>{
		o('increases the row\'s cells by 1', ()=>{
			let numberOfCells = row.cells.length
			row.createCell()
			o(row.cells.length).equals(numberOfCells + 1)
		})
		o('returns a Cell', ()=>{
			o(row.createCell().class).equals(Cell)
		})
	})
	o.spec('.cells, each', ()=>{
		row.cells.forEach((cell)=>{
			o('it is a Cell', ()=>{
				o(cell.constructor).equals(Cell)
			})
			o('it has a reference to the parent Row', ()=>{
				o(cell.row).equals(row)
			})
		})
	})
})
