const o = require('mithril/ospec/ospec')
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
	})
})

o.spec('Table', ()=>{
	let coffeesheet,
		table
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.createTable()
	})
	o.spec('#constructor', ()=>{
		o('creates one section', ()=>{
			o(table.sections.length).equals(1)
		})
	})
})
