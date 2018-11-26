function frame(){
	return new Promise (requestAnimationFrame)
}

o.spec('Cafesheet in browser', ()=>{
	const DOM = {},
		Data = {}

	o.before(()=>{
		const componentToElementMapping = [
			['bases', 'div.base'],
			['tables', 'table'],
			['sections', 'tbody'],
			['rows', 'tr'],
			['cells', 'td'],
			['celldata', 'td textarea']
		]
		componentToElementMapping.forEach(map=>{
			DOM[map[0]] = function(){
				return Array.from(document.querySelectorAll(map[1]))
			}
		})
	})
	o.beforeEach(()=>{
		Data.tables = Array.from(CSData.tables)
		Data.sections = Data.tables.map(t=>t.sections).flat()
		Data.rows = Data.sections.map(s=>s.rows).flat()
		Data.cells = Data.rows.map(r=>r.cells).flat()

		Cafesheet.state.base = new Base(CSData)
		m.mount(document.getElementById('app-output'), Base.component)
	})
	o.spec('on load', ()=>{
		o('tables', ()=>{
			o(DOM.bases()[0].children[0].tagName.toLowerCase()).equals('table')
			o(DOM.tables().length).equals(Data.tables.length)
		})
		o('sections', ()=>{
			o(DOM.sections().length).equals(Data.sections.length)
		})
		o('rows', ()=>{
			o(DOM.rows().length).equals(Data.rows.length)

			const dataRowIndexes = Data.rows.map(r=>Data.rows.indexOf(r))
			const domRowIndexes = DOM.rows().map(r=>parseInt(r.querySelector('.rowIndex').textContent))
			o(domRowIndexes).deepEquals(dataRowIndexes)
		})
		o('cells', ()=>{
			o(DOM.cells().length).equals(Data.cells.length)
		})
		o('celldata', ()=>{
			o(DOM.celldata().length).equals(Data.cells.length)
			o(DOM.celldata().map(d=>d.value)).deepEquals(Data.cells.map(c=>c.datum))
		})
	})
	o.spec('@row', ()=>{
		o('click create button', async ()=>{
			o(DOM.rows().length).equals(Data.rows.length)
			DOM.rows()[0].querySelector('button[action=create]').click()
			await frame()
			o(DOM.rows().length).equals(Data.rows.length + 1)
		})
		o('click remove button', async ()=>{
			const firstRow = DOM.rows()[0]
			firstRow.querySelector('button[action=remove]').click()
			o(Array.from(firstRow.querySelectorAll('textarea')).map(t=>t.value)).deepEquals(Data.rows[0].cells.map(c=>c.datum))
			await frame()
			o(DOM.rows().length).equals(Data.rows.length - 1)
			o(Array.from(firstRow.querySelectorAll('textarea')).map(t=>t.value)).deepEquals(Data.rows[1].cells.map(c=>c.datum))
		})
	})
})
