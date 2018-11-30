o('Cell', ()=>{
	o(Cell.descendants).deepEquals(undefined)
	o(Cell.child).equals(undefined)
	o(Cell.ancestors).deepEquals([Row, Section, Table, Base])
	o(Cell.parent).equals(Row)
})
o.spec('@cell', ()=>{
	Cafesheet.Spec(Cell)
		.addToParent()
		.getParent()
		.getPlace()
		.getSiblings()
		.placeAt()
		.removeFromParent()
		.scan()
	
	o('.empty()', ()=>{
		const cell = Cell.create({datum: 'banana'})
		o(cell.datum).equals('banana')
		o(cell.empty().datum).equals('')
	})
	// TODO JSON
	// TODO create
})
