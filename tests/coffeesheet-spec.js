const o = require("mithril/ospec/ospec")
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Coffeesheet', ()=>{
	let coffeesheet
	o.spec('#constructor', ()=>{
		coffeesheet = new Coffeesheet()
		o('creates one table', (done)=>{
			o(coffeesheet.tables.length).equals(1)
			done()
		})
	})
	o.spec('#createTable', ()=>{
		o('increases the instance\'s tables by 1', (done)=>{
			let numTables = coffeesheet.tables.length
			coffeesheet.createTable()
			o(coffeesheet.tables.length).equals(2)
			done()
		})
	})
	o.spec('.tables, each', ()=>{
		o('is a Table', (done)=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.constructor).equals(Table)
			})
			done()
		})
		o('has at least one section', (done)=>{
			coffeesheet.tables.forEach((table)=>{
				o(table.sections.length >= 1).equals(true)
			})
			done()
		})
	})
})
