o.spec('TableColumn', ()=>{
	o.spec('.new', ()=>{
		o('.new()', ()=>{
			const instance = TableColumn.new()
			o(instance.cells).deepEquals([])
			instance.cells.push('foo')
			o(instance.cells).deepEquals([])
			o(instance.parent).equals(undefined)
		})

	})
})
o.spec('@tableColumn', ()=>{
	o('.getPlace()', ()=>{

	})
})
