const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Section', ()=>{
	let coffeesheet,
		table,
		section
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
		section = table.sections[0]
	})
	o('#constructor creates at least one row', ()=>{
		o(section.rows.length >= 1).equals(true)
	})
	o.spec('#createRow', ()=>{
		o('increases the section\'s rows by 1', ()=>{
			let numberOfRows = section.rows.length
			section.createRow()
			o(section.rows.length).equals(numberOfRows + 1)
		})
		o('(afterIndex) inserts row after specified index', ()=>{
			let targetIndex = 1,
				rowBefore = section.rows[targetIndex - 1],
				rowAfter = section.rows[targetIndex],
				newRow = section.createRow(targetIndex),
				actualIndex = section.rows.indexOf(newRow)
			o(actualIndex).equals(targetIndex)
			o(section.rows[targetIndex - 1]).equals(rowBefore)
			o(section.rows[targetIndex + 1]).equals(rowAfter)
		})
	})
	o.spec('.rows, each', ()=>{
		o('it is a Row', ()=>{
			section.rows.forEach((row)=>{
				o(row.constructor).equals(Row)
			})
		})
		o('it has at least one cell', ()=>{
			section.rows.forEach((row)=>{
				o(row.cells.length >= 1).equals(true)
			})
		})
		o('it has a reference to the ancestor Section', ()=>{
			section.rows.forEach((row)=>{
				o(row.section).equals(section)
			})
		})
		o('it has a reference to the ancestor Table', ()=>{
			section.rows.forEach((row)=>{
				o(row.table).equals(table)
			})
		})
		o('it has a reference to the ancestor Coffeesheet', ()=>{
			section.rows.forEach((row)=>{
				o(row.coffeesheet).equals(coffeesheet)
			})
		})
	})
})
