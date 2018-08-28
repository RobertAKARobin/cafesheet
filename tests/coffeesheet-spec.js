const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Coffeesheet', ()=>{
	let coffeesheet

	o.before(()=>{
		coffeesheet = new Coffeesheet()
	})
	o.spec('#constructor', ()=>{
		o('creates at least one table', ()=>{
			o(coffeesheet.tables.length >= 1).equals(true)
		})
	})
	o.spec('#createTable', ()=>{
		o('increases the coffeesheet\'s tables by 1', ()=>{
			let numberOfTables = coffeesheet.tables.length
			coffeesheet.createTable()
			o(coffeesheet.tables.length).equals(numberOfTables + 1)
		})
	})
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
