const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Coffeesheet', ()=>{
	let coffeesheet

	o.before(()=>{
		coffeesheet = new Coffeesheet()
	})
	o('#constructor creates at least one table', ()=>{
		o(coffeesheet.tables.length >= 1).equals(true)
	})
	o('#createTable increases the coffeesheet\'s tables by 1', ()=>{
		let numberOfTables = coffeesheet.tables.length
		coffeesheet.createTable()
		o(coffeesheet.tables.length).equals(numberOfTables + 1)
	})
	// o('.sections contains all sections of sub-tables', ()=>{
	// 	let sections = []
	// 	coffeesheet.tables.forEach((table)=>{
	// 		sections = sections.concat(table.sections)
	// 	})
	// 	o(coffeesheet.sections.length).equals(sections.length)
	// 	coffeesheet.sections.forEach((section, index)=>{
	// 		o(section).equals(sections[index])
	// 	})
	// })
	o.spec('.tables, each', ()=>{
		o('it is a Table', ()=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.constructor).equals(Table)
			})
		})
		o('it has at least one section', ()=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.sections.length >= 1).equals(true)
			})
		})
		o('it has a reference to the ancestor Coffeesheet', ()=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.coffeesheet).equals(coffeesheet)
			})
		})
	})
})
