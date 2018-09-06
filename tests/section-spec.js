const o = require('mithril/ospec/ospec')
const {Coffeesheet, Table, Section, Row, Cell} = require('../src/js/coffeesheet')

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
		o(Section.parentClass).equals(Table)
		o(section.parentClass).equals(Table)
		o(Section.childClass).equals(Row)
		o(section.childClass).equals(Row)
		o(section.parent).equals(table)
		o(section.table).equals(table)
		o(section.coffeesheet).equals(coffeesheet)
	})
	o('.cells contains all cells of sub-rows', ()=>{
		let cells = []
		section.rows[0].createCell()
		section.rows[0].createCell()
		section.rows.forEach((row)=>{
			cells = cells.concat(row.cells)
		})
		o(section.cells.length).equals(cells.length)
		section.cells.forEach((cell, index)=>{
			o(cell).equals(cells[index])
		})
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
	o.spec('#place', ()=>{
		let coffeesheet,
			table,
			destinationIndex = 5,
			originIndex = (destinationIndex * 2),
			numSectionsToCreate = (destinationIndex * 4),
			section,
			sectionAtDestination
		o.before(()=>{
			coffeesheet = new Coffeesheet()
			table = coffeesheet.tables[0]
			for(let i = 0; i < numSectionsToCreate; i++){
				table.createSection()
			}
			section = table.sections[originIndex]
			sectionAtDestination = table.sections[destinationIndex]
			section.place(destinationIndex)
		})
		o('inserts section at specified index', ()=>{
			o(section.index).equals(destinationIndex)
			o(table.sections.indexOf(section)).equals(destinationIndex)
		})
		o('increases index of section at destination by 1', ()=>{
			o(sectionAtDestination.index).equals(section.index + 1)
		})
	})
	o.spec('.rows, each', ()=>{
		o('it is a Row', ()=>{
			section.rows.forEach((row)=>{
				o(row.class).equals(Row)
			})
		})
		o('it has at least one cell', ()=>{
			section.rows.forEach((row)=>{
				o(row.cells.length >= 1).equals(true)
			})
		})
		o('it has a reference to the parent Section', ()=>{
			section.rows.forEach((row)=>{
				o(row.section).equals(section)
			})
		})
	})
	o.spec('.next', ()=>{
		o('.next returns the next section in the table', ()=>{
			o(section.next).equals(table.sections[section.index + 1])
		})
		o('returns undefined if the last section in the table', ()=>{
			let lastSection = table.sections[table.sections.length - 1]
			o(lastSection.next).equals(undefined)
		})
	})
	o.spec('.pevious', ()=>{
		o('returns the previous section in the table', ()=>{
			o(section.previous).equals(table.sections[section.index - 1])
		})
		o('returns undefined if the first section in the table', ()=>{
			o(table.sections[0].previous).equals(undefined)
		})
	})
	o('.index returns the section\'s place in its table', ()=>{
		o(section.index).equals(table.sections.indexOf(section))
	})
})
