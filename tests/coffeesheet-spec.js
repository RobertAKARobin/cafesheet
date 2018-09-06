const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Coffeesheet', ()=>{
	let coffeesheet = new Coffeesheet()

	o('inheritance is correct', ()=>{
		o(coffeesheet.class).equals(Coffeesheet)
		o(Coffeesheet.parentClass).equals(undefined)
		o(coffeesheet.parentClass).equals(undefined)
		o(Coffeesheet.childClass).equals(Table)
		o(coffeesheet.childClass).equals(Table)
	})
	o('#constructor creates at least one table', ()=>{
		o(coffeesheet.tables.length >= 1).equals(true)
	})
	o.spec('#createTable', ()=>{
		o('increases the coffeesheet\'s tables by 1', ()=>{
			let numberOfTables = coffeesheet.tables.length
			coffeesheet.createTable()
			o(coffeesheet.tables.length).equals(numberOfTables + 1)
		})
		o('returns a Table', ()=>{
			o(coffeesheet.createTable().class).equals(Table)
		})
	})
	o.spec('.tables, each', ()=>{
		coffeesheet.tables.forEach((table)=>{
			o('it is a Table', ()=>{
				o(table.constructor).equals(Table)
			})
			o('it has at least one section', ()=>{
				o(table.sections.length >= 1).equals(true)
			})
			o('it has a reference to the parent Coffeesheet', ()=>{
				o(table.coffeesheet).equals(coffeesheet)
			})
		})
	})
	o('.sections contains all sections of sub-tables', ()=>{
		let sections = []
		coffeesheet.tables[0].createSection()
		coffeesheet.tables[0].createSection()
		coffeesheet.tables.forEach((table)=>{
			sections = sections.concat(table.sections)
		})
		o(coffeesheet.sections.length).equals(sections.length)
		coffeesheet.sections.forEach((section, index)=>{
			o(section).equals(sections[index])
		})
	})
})
