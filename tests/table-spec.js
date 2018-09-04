const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Table', ()=>{
	let coffeesheet,
		table
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
	})
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
	o('#createSection increases the table\'s sections by 1', ()=>{
		let numberOfSections = table.sections.length
		table.createSection()
		o(table.sections.length).equals(numberOfSections + 1)
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
	o.spec('.sections, each', ()=>{
		o('it is a Section', ()=>{
			table.sections.forEach((section)=>{
				o(section.constructor).equals(Section)
			})
		})
		o('it has at least one row', ()=>{
			table.sections.forEach((section)=>{
				o(section.rows.length >= 1).equals(true)
			})
		})
		o('it has a reference to the ancestor Table', ()=>{
			table.sections.forEach((section)=>{
				o(section.table).equals(table)
			})
		})
		// o('it has a reference to the ancestor Coffeesheet', ()=>{
		// 	table.sections.forEach((section)=>{
		// 		o(section.coffeesheet).equals(coffeesheet)
		// 	})
		// })
	})
})
