o('Cell', ()=>{
	o(Cell.descendants).deepEquals(undefined)
	o(Cell.child).equals(undefined)
	o(Cell.ancestors).deepEquals([Row, Section, Table, Base])
	o(Cell.parent).equals(Row)
})
