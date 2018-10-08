o.spec('Cafesheet in browser', ()=>{
	let DOM = {},
		Data = {}

	o.beforeEach(()=>{
		DOM.sheet = new Sheet(CSData)
		DOM.output = document.getElementById('app-output')
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
		m.mount(DOM.output, DOM.sheet)
	})
	o.spec('on load', ()=>{
		o('tables', ()=>{
			o(DOM.output.children[0].tagName.toLowerCase()).equals('table')
			o(document.querySelectorAll('table').length).equals(Data.tables.length)
		})
		o('sections', ()=>{
			o(document.querySelectorAll('tbody').length).equals(Data.sections.length)
		})
		o('rows', ()=>{
			o(document.querySelectorAll('tr').length).equals(Data.rows.length)
		})
		o('cells', ()=>{
			o(document.querySelectorAll('td').length).equals(Data.cells.length)
		})
	})
})
