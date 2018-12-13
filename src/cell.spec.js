o.spec('Cell', ()=>{
	o('is frozen', ()=>{
		Cell.foo = 'foo'
		Cell.proto.foo = 'foo'
		o(Cell.foo).equals(undefined)
		o(Cell.proto.foo).equals(undefined)
	})
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
	o('.toJSON()', ()=>{
		o(Cell.create({datum: 'banana'}).toJSON()).equals(JSON.stringify({datum: 'banana'}))
		o(Cell.create().toJSON()).equals(JSON.stringify({}))
	})
})
