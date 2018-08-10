global.window = require("mithril/test-utils/browserMock.js")()
global.document = window.document

const o = require("mithril/ospec/ospec")
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')


o.spec('Coffeesheet', ()=>{
	let coffeesheet =  new Coffeesheet()
	o.spec('#createTable', ()=>{
		o('increases the instance\'s tables by 1', ()=>{
			let numTables = coffeesheet.tables.length
			coffeesheet.createTable()
			o(coffeesheet.tables.length).equals(numTables + 1)
		})
	})
})
