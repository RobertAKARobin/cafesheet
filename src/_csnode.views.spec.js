o.spec('Cafesheet in browser', ()=>{
	const DOM = {},
		Data = {}

	o.beforeEach(()=>{
		Data.tables = CSData.tables
		Data.sections = Data.tables.map(t=>t.sections).flat()
		Data.rows = Data.sections.map(s=>s.rows).flat()
		Data.cells = Data.rows.map(r=>r.cells).flat()

		DOM.base = new Base(CSData)
		DOM.output = document.getElementById('app-output')
		m.mount(DOM.output, DOM.base)

		;[
			['tables', 'table'],
			['sections', 'tbody'],
			['rows', 'tr'],
			['cells', 'td'],
			['data', 'td textarea']
		].forEach(map=>{
			DOM[map[0]] = Array.from(document.querySelectorAll(map[1]))
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
			o(DOM.data.map(d=>d.value)).deepEquals(Data.cells.map(c=>c.datum))
		})
	})
})
