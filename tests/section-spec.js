o.spec('Section', ()=>{
	'use strict'
	
	let cafesheet,
		table,
		section

	o.beforeEach(()=>{
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
			o(section.columns.length).equals(section.width)
		})
		o.spec('.each', ()=>{
			o('is a Column', ()=>{
				section.columns.forEach(column => o(column.class).equals(Column))
			})
			o('contains each row\'s cells at the column\'s index', ()=>{
				section.columns.forEach((column)=>{
					column.cells.forEach((cell)=>{
						o(cell).equals(section.rows[cell.row.index].cells[column.index])
					})
				})
			})
		})
	})
	o('.width returns the max length of the section\'s rows', ()=>{
		let maxRowLength = section.rows.reduce((maxRowLength, row)=>{
			return (maxRowLength = Math.max(maxRowLength, row.length))
		}, 0)
		o(section.width).equals(maxRowLength)
	})
	o('#constructor creates at least one row', ()=>{
		o(section.rows.length >= 1).equals(true)
	})
	o.spec('#createColumn', ()=>{
		let originalSectionWidth,
			originalNumColumns,
			column

		o.beforeEach(()=>{
			originalSectionWidth = section.width
			originalNumColumns = section.columns.length
			column = section.createColumn()
		})
		o('increases the section\'s width by 1', ()=>{
			o(section.width).equals(originalSectionWidth + 1)
		})
		o('increases the section\'s number of columns by 1', ()=>{
			o(section.columns.length).equals(originalNumColumns + 1)
		})
		o('returns a Column', ()=>{
			o(column.class).equals(Column)
		})
	})
	o.spec('#createRow', ()=>{
		let originalNumberOfRows,
			row
		
		o.beforeEach(()=>{
			originalNumberOfRows = section.rows.length
			row = section.createRow()
		})
		o('increases the section\'s rows by 1', ()=>{
			o(section.rows.length).equals(originalNumberOfRows + 1)
		})
		o('returns a Row', ()=>{
			o(row.class).equals(Row)
		})
	})
	o.spec('#createSection', ()=>{
		let newSection

		o.beforeEach(()=>{
			newSection = section.createSection()
		})
		o('inserts section after current one', ()=>{
			o(newSection.index).equals(section.index + 1)
		})
	})
	o.spec('#remove', ()=>{
		let sectionParent

		o.beforeEach(()=>{
			sectionParent = section.parent
			section.remove()
		})
		o('does not change the section\'s parent', ()=>{
			o(section.parent).equals(sectionParent)
		})
		o('removes the section from its siblings', ()=>{
			o(section.siblings.indexOf(section)).equals(-1)
		})
		o('makes the section no longer a child of its parent', ()=>{
			o(section.parent.children.indexOf(section)).equals(-1)
		})
		o('makes the section no longer a descendant of its ancestor Cafesheet', ()=>{
			o(cafesheet.sections.indexOf(section)).equals(-1)
		})
	})
	o.spec('#place', ()=>{
		let destinationIndex = 5,
			originIndex = (destinationIndex * 2),
			numSectionsToCreate = (destinationIndex * 4),
			sectionAtDestination

		o.beforeEach(()=>{
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
	o('.length returns the number of rows', ()=>{
		o(section.length).equals(section.rows.length)
	})
})
