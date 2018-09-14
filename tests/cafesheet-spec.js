o.spec('Cafesheet', ()=>{
	'use strict'
	
	let cafesheet

	o.beforeEach(()=>{
		cafesheet = new Cafesheet()
	})
	o('inheritance is correct', ()=>{
		o(cafesheet.class).equals(Cafesheet)
		o(Cafesheet.parentClass).equals(undefined)
		o(cafesheet.parentClass).equals(undefined)
		o(Cafesheet.childClass).equals(Table)
		o(cafesheet.childClass).equals(Table)
	})
	o('#constructor creates at least one table', ()=>{
		o(cafesheet.tables.length >= 1).equals(true)
	})
	o.spec('#createTable', ()=>{
		let originalNumberOfTables,
			table

		o.beforeEach(()=>{
			originalNumberOfTables = cafesheet.tables.length
			table = cafesheet.createTable()
		})
		o('increases the cafesheet\'s tables by 1', ()=>{
			o(cafesheet.tables.length).equals(originalNumberOfTables + 1)
		})
		o('returns a Table', ()=>{
			o(table.class).equals(Table)
		})
	})
	o.spec('.tables, each', ()=>{
		o('it is a Table', ()=>{
			cafesheet.tables.forEach(table => o(table.constructor).equals(Table))
		})
		o('it has a reference to the parent Cafesheet', ()=>{
			cafesheet.tables.forEach(table => o(table.cafesheet).equals(cafesheet))
		})
	})
})
