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
	o('#createRow increases the section\'s rows by 1', ()=>{
		let numberOfRows = section.rows.length
		section.createRow()
		o(section.rows.length).equals(numberOfRows + 1)
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
