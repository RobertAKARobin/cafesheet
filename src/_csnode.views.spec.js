o.spec('Cafesheet in browser', ()=>{
	let DOM = {},
		Data = {},
		mapping = [
			['tables', 'table'],
			['sections', 'tbody'],
			['rows', 'tr'],
			['cells', 'td'],
			['data', 'td textarea']
		]

	o.beforeEach(()=>{
		Data.tables = CSData.tables
		Data.sections = Data.tables.reduce((aggregate, table)=>{
			aggregate = aggregate.concat(table.sections)
			return aggregate
		}, [])
		Data.rows = Data.sections.reduce((aggregate, section)=>{
			aggregate = aggregate.concat(section.rows)
			return aggregate
		}, [])
		Data.cells = Data.rows.reduce((aggregate, row)=>{
			aggregate = aggregate.concat(row.cells)
			return aggregate
		}, [])

		DOM.sheet = new Sheet(CSData)
		DOM.output = document.getElementById('app-output')
		m.mount(DOM.output, DOM.sheet)

		mapping.forEach((map)=>{
			let keyName = map[0],
				elementName = map[1]
			DOM[keyName] = document.querySelectorAll(elementName)
		})
	})
	o.spec('on load', ()=>{
		o('tables', ()=>{
			o(DOM.output.children[0].tagName.toLowerCase()).equals('table')
			o(DOM.tables.length).equals(Data.tables.length)
		})
		o('sections', ()=>{
			o(DOM.sections.length).equals(Data.sections.length)
		})
		o('rows', ()=>{
			o(DOM.rows.length).equals(Data.rows.length)
		})
		o('cells', ()=>{
			o(DOM.cells.length).equals(Data.cells.length)
		})
		o('celldata', ()=>{
			o(DOM.data.length).equals(Data.cells.length)
		})
	})
})
