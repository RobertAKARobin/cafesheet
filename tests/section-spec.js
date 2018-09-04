const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/coffeesheet')

o.spec('Section', ()=>{
	let coffeesheet,
		table,
		section
	
	o.before(()=>{
		coffeesheet = new Coffeesheet()
		table = coffeesheet.tables[0]
		section = table.sections[0]
	})
	o('inheritance is correct', ()=>{
		o(section.class).equals(Section)
		o(Section.parentType).equals(Table)
		o(section.parentType).equals(Table)
		o(Section.childType).equals(Row)
		o(section.childType).equals(Row)
	})
	o('#constructor creates at least one row', ()=>{
		o(section.rows.length >= 1).equals(true)
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
	o.spec('.rows', ()=>{
		o.spec('.add', ()=>{
			o('increases the section\'s rows by 1', ()=>{
				let numberOfRows = section.rows.length
				section.rows.add()
				o(section.rows.length).equals(numberOfRows + 1)
			})
		})
		o.spec('each', ()=>{
			o('it is a Row', ()=>{
				section.rows.forEach((row)=>{
					o(row.constructor).equals(Row)
				})
			})
			o('it has at least one cell', ()=>{
				section.rows.forEach((row)=>{
					o(row.cells.length >= 1).equals(true)
				})
			})
			o('it has a reference to the ancestor Section', ()=>{
				section.rows.forEach((row)=>{
					o(row.section).equals(section)
				})
			})
			o('.index returns the row\'s place in its section', ()=>{
				section.rows.forEach((row)=>{
					o(row.index).equals(section.rows.indexOf(row))
				})
			})
			o.spec('.next', ()=>{
				o('returns the next row in the section', ()=>{
					section.rows.forEach((row)=>{
						o(row.next).equals(section.rows[row.index + 1])
					})
				})
				o('returns undefined if the last row in the section', ()=>{
					let lastRow = section.rows[section.rows.length - 1]
					section.rows.forEach((row)=>{
						o(lastRow.next).equals(undefined)
					})
				})
			})
			o.spec('.previous', ()=>{
				o('returns the previous row in the section', ()=>{
					section.rows.forEach((row)=>{
						o(row.previous).equals(section.rows[row.index - 1])
					})
				})
				o('returns undefined if the first row in the section', ()=>{
					section.rows.forEach((row)=>{
						o(section.rows[0].previous).equals(undefined)
					})
				})
			})
			// o('it has a reference to the ancestor Table', ()=>{
			// 	section.rows.forEach((row)=>{
			// 		o(row.table).equals(table)
			// 	})
			// })
			// o('it has a reference to the ancestor Coffeesheet', ()=>{
			// 	section.rows.forEach((row)=>{
			// 		o(row.coffeesheet).equals(coffeesheet)
			// 	})
			// })
		})
	})
})
