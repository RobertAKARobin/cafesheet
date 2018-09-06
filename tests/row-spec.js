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
	o.spec('.next', ()=>{
		o('.next returns the next row in the section', ()=>{
			o(row.next).equals(section.rows[row.index + 1])
		})
		o('returns undefined if the last row in the section', ()=>{
			let lastRow = section.rows[section.rows.length - 1]
			o(lastRow.next).equals(undefined)
		})
	})
	o.spec('.pevious', ()=>{
		o('returns the previous row in the section', ()=>{
			o(row.previous).equals(section.rows[row.index - 1])
		})
		o('returns undefined if the first row in the section', ()=>{
			o(section.rows[0].previous).equals(undefined)
		})
	})
	o('.index returns the row\'s place in its section', ()=>{
		o(row.index).equals(section.rows.indexOf(row))
	})
})
