o.spec('Cell', ()=>{
	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const instance = Cell.create()
			o(instance.datum).equals(undefined)
		})
		o('.create($value)', ()=>{
			const value = 'banana'
			const instance = Cell.create({datum: value})
			o(instance.datum).equals(value)
		})
	})
})
o.spec('@cell', ()=>{	
	o('.empty()', ()=>{
		const cell = Cell.create({datum: 'banana'})
		o(cell.datum).equals('banana')
		o(cell.empty().datum).equals('')
	})
	// TODO JSON
	// TODO create
})
