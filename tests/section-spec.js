const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Section', ()=>{
	let coffeesheet = new Coffeesheet(),
		table = coffeesheet.tables[0],
		section = table.sections[0]
	
	o('inheritance is correct', ()=>{
		o(section.class).equals(Section)
		o(Section.parentClass).equals(Table)
		o(section.parentClass).equals(Table)
		o(Section.childClass).equals(Row)
		o(section.childClass).equals(Row)
		o(section.parent).equals(table)
		o(section.table).equals(table)
		o(section.coffeesheet).equals(coffeesheet)
	})
	o('#constructor creates at least one row', ()=>{
		o(section.rows.length >= 1).equals(true)
	})
	o.spec('#createRow', ()=>{
		o('increases the section\'s rows by 1', ()=>{
			let numberOfRows = section.rows.length
			section.createRow()
			o(section.rows.length).equals(numberOfRows + 1)
		})
		o('returns a Row', ()=>{
			o(section.createRow().class).equals(Row)
		})
	})
	o.spec('.rows, each', ()=>{
		section.rows.forEach((row)=>{
			o('it is a Row', ()=>{
				o(row.class).equals(Row)
			})
			o('it has at least one cell', ()=>{
				o(row.cells.length >= 1).equals(true)
			})
			o('it has a reference to the parent Section', ()=>{
				o(row.section).equals(section)
			})
			// o('.index returns the row\'s place in its section', ()=>{
			// 	o(row.index).equals(section.rows.indexOf(row))
			// })
			// o('.next returns the next row in the section', ()=>{
			// 	o(row.next).equals(section.rows[row.index + 1])
			// })
			// o('.previous returns the previous row in the section', ()=>{
			// 	o(row.previous).equals(section.rows[row.index - 1])
			// })
		})
	})
	// o('(afterIndex) inserts row after specified index', ()=>{
	// 	let targetIndex = 1,
	// 		rowBefore = section.rows[targetIndex - 1],
	// 		rowAfter = section.rows[targetIndex],
	// 		newRow = section.add(targetIndex),
	// 		actualIndex = section.rows.indexOf(newRow)
	// 	o(actualIndex).equals(targetIndex)
	// 	o(section.rows[targetIndex - 1]).equals(rowBefore)
	// 	o(section.rows[targetIndex + 1]).equals(rowAfter)
	// })
	// o('.next returns undefined if the last row in the section', ()=>{
	// 	let lastRow = section.rows[section.rows.length - 1]
	// 	o(lastRow.next).equals(undefined)
	// })
	// o('.previous returns undefined if the first row in the section', ()=>{
	// 	o(section.rows[0].previous).equals(undefined)
	// })
})
