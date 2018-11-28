o('Row', ()=>{
	o(Row.descendants).deepEquals([Cell])
	o(Row.child).equals(Cell)
	o(Row.ancestors).deepEquals([Section, Table, Base])
	o(Row.parent).equals(Section)
})
