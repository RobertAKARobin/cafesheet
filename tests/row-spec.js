const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Row', ()=>{
	let coffeesheet = new Coffeesheet(),
		table = coffeesheet.tables[0],
		section = table.sections[0],
		row = section.rows[0]
	
	o('inheritance is correct', ()=>{
		o(row.class).equals(Row)
		o(Row.parentType).equals(Section)
		o(row.parentType).equals(Section)
		o(Row.childType).equals(Cell)
		o(row.childType).equals(Cell)
	})
	o('#constructor creates at least one cell', ()=>{
		o(row.cells.length >= 1).equals(true)
	})
	o.spec('.cells', ()=>{
		o('.add increases the row\'s cells by 1', ()=>{
			let numberOfCells = row.cells.length
			row.cells.add()
			o(row.cells.length).equals(numberOfCells + 1)
		})
		o.spec('each', ()=>{
			row.cells.forEach((cell)=>{
				o('it is a Cell', ()=>{
					o(cell.constructor).equals(Cell)
				})
				o('it has a reference to the parent Row', ()=>{
					o(cell.row).equals(row)
				})
			})
		})
		// o('it has a reference to the ancestor Section', ()=>{
		// 	row.cells.forEach((cell)=>{
		// 		o(cell.section).equals(section)
		// 	})
		// })
		// o('it has a reference to the ancestor Table', ()=>{
		// 	row.cells.forEach((cell)=>{
		// 		o(cell.table).equals(table)
		// 	})
		// })
		// o('it has a reference to the ancestor Coffeesheet', ()=>{
		// 	row.cells.forEach((cell)=>{
		// 		o(cell.coffeesheet).equals(coffeesheet)
		// 	})
		// })
	})
})
