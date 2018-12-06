function frame(){
	return new Promise (requestAnimationFrame)
}

o.spec('Cafesheet in browser', ()=>{
	const componentToDOMMapping = {
		'bases': 'div.base',
		'tables': 'table',
		'sectionBodies': 'tbody.sectionBody',
		'rows': 'tr.dataRow',
		'cells': 'td',
		'celldata': 'td textarea',
		'createButton': 'button[action=create]',
		'removeButton': 'button[action=remove]',
		'rowPlace': '.rowPlace'
	}
	function DOM(){
		let root, selector
		if(arguments.length > 1){
			[root, selector] = arguments
		}else{
			[selector] = arguments
		}
		return Array.from((root || document).querySelectorAll(componentToDOMMapping[selector]))
	}

	o.spec('without seed data', ()=>{
		o.beforeEach(()=>{
			Cafesheet.state.base = Base.create()
			m.mount(document.getElementById('app-output'), Base.component)
		})
		o.spec('on load', ()=>{
			o('tables', ()=>{
				o(DOM('tables').length).equals(Base.defaultNumberOfChildren)
			})
			o('sections', ()=>{
				o(DOM('sectionBodies').length).equals(Base.defaultNumberOfChildren * Table.defaultNumberOfChildren)
			})
			o('rows', ()=>{
				o(DOM('rows').length).equals(Base.defaultNumberOfChildren * Table.defaultNumberOfChildren * Section.defaultNumberOfChildren)
			})
			o('cells', ()=>{
				o(DOM('cells').length).equals(Base.defaultNumberOfChildren * Table.defaultNumberOfChildren * Section.defaultNumberOfChildren * Row.defaultNumberOfChildren)
			})
		})
	})
	o.spec('with seed data', ()=>{
		const Data = {}
		o.beforeEach(()=>{
			Data.tables = Array.from(CSData.tables)
			Data.sections = Data.tables.map(t=>t.sections).flat()
			Data.rows = Data.sections.map(s=>s.rows).flat()
			Data.cells = Data.rows.map(r=>r.cells).flat()

			Cafesheet.state.base = Base.create(CSData)
			m.mount(document.getElementById('app-output'), Base.component)
		})
		o.spec('on load', ()=>{
			o('tables', ()=>{
				o(DOM('tables').length).equals(Data.tables.length)
			})
			o('sections', ()=>{
				o(DOM('sectionBodies').length).equals(Data.sections.length)
			})
			o('rows', ()=>{
				o(DOM('rows').length).equals(Data.rows.length)

				const dataRowIndexes = Data.rows.map(r=>Data.rows.indexOf(r))
				const domRowPlaces = DOM('rows').map(r=>parseInt(DOM(r, 'rowPlace')[0].textContent))
				o(domRowPlaces).deepEquals(dataRowIndexes)
			})
			o('cells', ()=>{
				o(DOM('cells').length).equals(Data.cells.length)
			})
			o('celldata', ()=>{
				o(DOM('celldata').length).equals(Data.cells.length)
				o(DOM('celldata').map(d=>d.value)).deepEquals(Data.cells.map(c=>c.datum))
			})
		})
		o.spec('@row', ()=>{
			o.spec('click create button', ()=>{
				o('increases row length', async ()=>{
					const firstRow = DOM('rows')[0]
					const initialNumberOfRows = DOM('rows').length
					DOM(firstRow, 'createButton')[0].click()
					await frame()
					o(DOM('rows').length).equals(initialNumberOfRows + 1)
				})
				o('third row now has data of former second row', async ()=>{
					const firstRow = DOM('rows')[0]
					const firstRowContent = DOM(firstRow, 'celldata').map(t=>t.value)
					const secondRow = DOM('rows')[1]
					const secondRowContent = DOM(secondRow, 'celldata').map(t=>t.value)
					DOM(firstRow, 'createButton')[0].click()
					await frame()

					const thirdRow = DOM('rows')[2]
					o(DOM(firstRow, 'celldata').map(t=>t.value)).deepEquals(firstRowContent)
					o(DOM(thirdRow, 'celldata').map(t=>t.value)).deepEquals(secondRowContent)
				})
			})
			o.spec('click remove button', ()=>{
				o('decreases row length', async ()=>{
					const firstRow = DOM('rows')[0]
					DOM(firstRow, 'removeButton')[0].click()
					await frame()
					o(DOM('rows').length).equals(Data.rows.length - 1)
				})
				o('first row now has data of former second row', async ()=>{
					const firstRow = DOM('rows')[0]
					const secondRow = DOM('rows')[1]
					const secondRowContent = DOM(secondRow, 'celldata').map(t=>t.value)
					DOM(firstRow, 'removeButton')[0].click()
					await frame()
					o(DOM(firstRow, 'celldata').map(t=>t.value)).deepEquals(secondRowContent)
				})
			})
		})
	})
})
