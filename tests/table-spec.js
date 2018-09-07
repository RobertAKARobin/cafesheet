const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/js/coffeesheet')

o.spec('Table', ()=>{
	let coffeesheet,
		table

	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
	})
	o('inheritance is correct', ()=>{
		o(table.class).equals(Table)
		o(Table.parentClass).equals(Coffeesheet)
		o(table.parentClass).equals(Coffeesheet)
		o(Table.childClass).equals(Section)
		o(table.childClass).equals(Section)
		o(table.parent).equals(coffeesheet)
		o(table.coffeesheet).equals(coffeesheet)
	})
	o('#constructor creates at least one section', ()=>{
		o(table.sections.length >= 1).equals(true)
	})
	o.spec('#createSection', ()=>{
		o('increases the table\'s sections by 1', ()=>{
			let numberOfSections = table.sections.length
			table.createSection()
			o(table.sections.length).equals(numberOfSections + 1)
		})
		o('returns a Section', ()=>{
			o(table.createSection().class).equals(Section)
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
