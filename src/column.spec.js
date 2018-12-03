o.spec('Column', ()=>{
	o.spec('.new', ()=>{
		o('.new()', ()=>{
			const instance = Column.new()
			o(instance.cells).deepEquals([])
			instance.cells.push('foo')
			o(instance.cells).deepEquals([])
			o(instance.parent).equals(undefined)
			o(instance.place).equals(-1)
		})

	})
})
o.spec('@column', ()=>{
	o('.getPlace()', ()=>{

	})
})
