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
			o(instance.getData()).equals(undefined)
		})
		o('.from($value)', ()=>{
			const value = 'banana'
			const instance = Cell.from({data: value})
			o(instance.getData()).equals(value)
		})
	})
})
o.spec('@cell', ()=>{
	o('is frozen', ()=>{
		const cell = Cell.from()
		cell.foo = 'foo'
		o(cell.foo).equals(undefined)
	})
	o('.empty()', ()=>{
		const cell = Cell.from({data: 'banana'})
		o(cell.getData()).equals('banana')
		o(cell.empty().getData()).equals('')
	})
	o('.toJSON()', ()=>{
		o(Cell.from({data: 'banana'}).toJSON()).equals(JSON.stringify({data: 'banana'}))
		o(Cell.from().toJSON()).equals(JSON.stringify({}))
	})
})
