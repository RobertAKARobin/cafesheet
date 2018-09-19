o.spec('Sheet', ()=>{
	'use strict'
	
	let sheet

	o.beforeEach(()=>{
		sheet = new Sheet()
	})
	o('inheritance is correct', ()=>{
		o(sheet.class).equals(Sheet)
		o(Sheet.parentClass).equals(undefined)
		o(sheet.parentClass).equals(undefined)
		o(Sheet.childClass).equals(Table)
		o(sheet.childClass).equals(Table)
	})
	o('#constructor creates at least one table', ()=>{
		o(sheet.tables.length >= 1).equals(true)
	})
	o.spec('#createTable', ()=>{
		let originalNumberOfTables,
			table

		o.beforeEach(()=>{
			originalNumberOfTables = sheet.tables.length
			table = sheet.createTable()
		})
		o('increases the sheet\'s tables by 1', ()=>{
			o(sheet.tables.length).equals(originalNumberOfTables + 1)
		})
		o('returns a Table', ()=>{
			o(table.class).equals(Table)
		})
	})
	o.spec('.tables, each', ()=>{
		o('it is a Table', ()=>{
			sheet.tables.forEach(table => o(table.constructor).equals(Table))
		})
		o('it has a reference to the parent Sheet', ()=>{
			sheet.tables.forEach(table => o(table.sheet).equals(sheet))
		})
	})
})
