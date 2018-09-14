o.spec('Table', ()=>{
	'use strict'

	let cafesheet,
		table

	o.beforeEach(()=>{
		cafesheet = new Cafesheet()
		table = cafesheet.tables[0]
	})
	o('inheritance is correct', ()=>{
		o(table.class).equals(Table)
		o(Table.parentClass).equals(Cafesheet)
		o(table.parentClass).equals(Cafesheet)
		o(Table.childClass).equals(Section)
		o(table.childClass).equals(Section)
		o(table.parent).equals(cafesheet)
		o(table.cafesheet).equals(cafesheet)
	})
	o('#constructor creates at least one section', ()=>{
		o(table.sections.length >= 1).equals(true)
	})
	o.spec('#createSection', ()=>{
		let originalNumberOfSections,
			section
		
		o.beforeEach(()=>{
			originalNumberOfSections = table.sections.length
			section = table.createSection()
		})
		o('increases the table\'s sections by 1', ()=>{
			o(table.sections.length).equals(originalNumberOfSections + 1)
		})
		o('returns a Section', ()=>{
			o(section.class).equals(Section)
		})
	})
	o.spec('.sections, each', ()=>{
		o('it is a Section', ()=>{
			table.sections.forEach(section => o(section.constructor).equals(Section))
		})
		o('it has a reference to the parent Table', ()=>{
			table.sections.forEach(section => o(section.table).equals(table))
		})
	})
})
