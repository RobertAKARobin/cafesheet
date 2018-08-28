const o = require("mithril/ospec/ospec")
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Coffeesheet', ()=>{
	let coffeesheet

	o.before(()=>{
		coffeesheet = new Coffeesheet()
	})
	o.spec('#constructor', ()=>{
		o('creates one table', ()=>{
			o(coffeesheet.tables.length).equals(1)
		})
	})
	o.spec('#createTable', ()=>{
		o('increases the instance\'s tables by 1', ()=>{
			coffeesheet.createTable()
			o(coffeesheet.tables.length).equals(2)
		})
	})
})

o.spec('Coffeesheet.tables, each', ()=>{
	let coffeesheet

	o.before(()=>{
		coffeesheet = new Coffeesheet()
		coffeesheet.createTable()
		coffeesheet.createTable()
	})
	o('it is a Table', ()=>{
		coffeesheet.tables.forEach((table)=>{
			o(table.constructor).equals(Table)
		})
	})
	o('has at least one section', ()=>{
		coffeesheet.tables.forEach((table)=>{
			o(table.sections.length >= 1).equals(true)
		})
	})
})
