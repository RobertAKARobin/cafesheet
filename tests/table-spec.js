const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Table', ()=>{
	let coffeesheet = new Coffeesheet(),
		table = coffeesheet.tables[0]

	o('inheritance is correct', ()=>{
		o(table.class).equals(Table)
		o(Table.parentType).equals(Coffeesheet)
		o(table.parentType).equals(Coffeesheet)
		o(Table.childType).equals(Section)
		o(table.childType).equals(Section)
	})
	o('#constructor creates at least one section', ()=>{
		o(table.sections.length >= 1).equals(true)
	})
	// o('.rows contains all rows of sub-sections', ()=>{
	// 	let rows = []
	// 	table.sections.forEach((section)=>{
	// 		rows = rows.concat(section.rows)
	// 	})
	// 	o(table.rows.length).equals(rows.length)
	// 	table.rows.forEach((row, index)=>{
	// 		o(row).equals(rows[index])
	// 	})
	// })
	o.spec('.sections', ()=>{
		o('.add increases the number of sections by 1', ()=>{
			let numberOfSections = table.sections.length
			table.sections.add()
			o(table.sections.length).equals(numberOfSections + 1)
		})
		o.spec('each', ()=>{
			table.sections.forEach((section)=>{
				o('it is a Section', ()=>{
					o(section.constructor).equals(Section)
				})
				o('it has at least one row', ()=>{
					o(section.rows.length >= 1).equals(true)
				})
				o('it has a reference to the parent Table', ()=>{
					o(section.table).equals(table)
				})
				o('it has a reference to the ancestor Coffeesheet', ()=>{
					o(section.coffeesheet).equals(coffeesheet)
				})
			})
		})
	})
})
