o.spec('Cafesheet', ()=>{
	let cafesheet

	o.before(()=>{
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
		o('increases the cafesheet\'s tables by 1', ()=>{
			let numberOfTables = cafesheet.tables.length
			cafesheet.createTable()
			o(cafesheet.tables.length).equals(numberOfTables + 1)
		})
		o('returns a Table', ()=>{
			o(cafesheet.createTable().class).equals(Table)
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
