const o = require('mithril/ospec/ospec')
const {Cafesheet, Table, Section, Column, Row, Cell} = require('../src/js/cafesheet')

o.spec('Section', ()=>{
	let cafesheet,
		table,
		section

	o.before(()=>{
		cafesheet = new Cafesheet()
		table = cafesheet.tables[0]
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
		o(section.cafesheet).equals(cafesheet)
	})
	o('.cells contains all cells of sub-rows', ()=>{
		let cells = [],
			firstRow = section.rows[0],
			secondRow = section.createRow()
		firstRow.createCell()
		secondRow.createCell()
		section.rows.forEach((row)=>{
			cells = cells.concat(row.cells)
		})
		o(section.cells.length).equals(cells.length)
		section.cells.forEach((cell, index)=>{
			o(cell).equals(cells[index])
		})
	})
	o.spec('.columns', ()=>{
		o('.length is equal to the max row length of the section\'s rows', ()=>{
			let maxRowLength = section.rows.reduce((maxRowLength, row)=>{
				return (maxRowLength = Math.max(maxRowLength, row.size))
			}, 0)
			o(section.columns.length).equals(maxRowLength)
		})
		o.spec('.each', ()=>{
			o('is a Column', ()=>{
				section.columns.forEach(column => o(column.class).equals(Column))
			})
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
	o.spec('#createSection', ()=>{
		o('inserts section after current one', ()=>{
			o(section.createSection().index).equals(section.index + 1)
		})
	})
	o.spec('#remove', ()=>{
		let removedSection,
			removedSectionIndex = 0
		o.before(()=>{
			removedSection = table.createSection()
			originalRemovedSectionParent = removedSection.parent
			removedSection.place(removedSectionIndex).remove()
		})
		o('does not change the section\'s parent', ()=>{
			o(removedSection.parent).equals(originalRemovedSectionParent)
		})
		o('removes the section from its siblings', ()=>{
			o(removedSection.siblings.indexOf(removedSection)).equals(-1)
		})
		o('makes the section no longer a child of its parent', ()=>{
			o(removedSection.parent.children.indexOf(removedSection)).equals(-1)
		})
		o('makes the section no longer a descendant of its ancestor Cafesheet', ()=>{
			o(cafesheet.sections.indexOf(removedSection)).equals(-1)
		})
	})
	o.spec('#place', ()=>{
		let cafesheet,
			table,
			destinationIndex = 5,
			originIndex = (destinationIndex * 2),
			numSectionsToCreate = (destinationIndex * 4),
			section,
			sectionAtDestination
		o.before(()=>{
			cafesheet = new Cafesheet()
			table = cafesheet.tables[0]
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
			section.rows.forEach(row => o(row.class).equals(Row))
		})
		o('it has at least one cell', ()=>{
			section.rows.forEach(row => o(row.cells.length >= 1).equals(true))
		})
		o('it has a reference to the parent Section', ()=>{
			section.rows.forEach(row => o(row.section).equals(section))
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
	o('.size returns the number of rows', ()=>{
		o(section.size).equals(section.rows.length)
	})
})
