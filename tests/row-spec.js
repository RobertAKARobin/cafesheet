const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Row', ()=>{
	let coffeesheet,
		table,
		section,
		row
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
		section = table.sections[0]
		row = section.rows[0]
	})
	o('#constructor creates at least one cell', ()=>{
		o(row.cells.length >= 1).equals(true)
	})
	o('#createCell increases the row\'s cells by 1', ()=>{
		let numberOfCells = row.cells.length
		row.createCell()
		o(row.cells.length).equals(numberOfCells + 1)
	})
	o('.index returns the row\'s place in its section', ()=>{
		o(row.index).equals(row.section.rows.indexOf(row))
	})
	o.spec('.cells, each', ()=>{
		o('it is a Cell', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.constructor).equals(Cell)
			})
		})
		o('it has a reference to the ancestor Row', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.row).equals(row)
			})
		})
		o('it has a reference to the ancestor Section', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.section).equals(section)
			})
		})
		o('it has a reference to the ancestor Table', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.table).equals(table)
			})
		})
		o('it has a reference to the ancestor Coffeesheet', ()=>{
			row.cells.forEach((cell)=>{
				o(cell.coffeesheet).equals(coffeesheet)
			})
		})
	})
})
