o.spec('Cell', ()=>{
	o('is frozen', ()=>{
		Cell.foo = 'foo'
		Cell.proto.foo = 'foo'
		o(Cell.foo).equals(undefined)
		o(Cell.proto.foo).equals(undefined)
	})
	o.spec('.from', ()=>{
		o('.from()', ()=>{
			const instance = Cell.from()
			o(instance.datum).equals(undefined)
		})
		o('.from($value)', ()=>{
			const value = 'banana'
			const instance = Cell.from({datum: value})
			o(instance.datum).equals(value)
		})
	})
})
o.spec('@cell', ()=>{	
	o('.empty()', ()=>{
		const cell = Cell.from({datum: 'banana'})
		o(cell.datum).equals('banana')
		o(cell.empty().datum).equals('')
	})
	o('.toJSON()', ()=>{
		o(Cell.from({datum: 'banana'}).toJSON()).equals(JSON.stringify({datum: 'banana'}))
		o(Cell.from().toJSON()).equals(JSON.stringify({}))
	})
})
