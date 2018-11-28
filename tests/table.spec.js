o('Table', ()=>{
	o(Table.descendants).deepEquals([Section, Row, Cell])
	o(Table.child).equals(Section)
	o(Table.ancestors).deepEquals([Base])
	o(Table.parent).equals(Base)
})
o.spec('@table', ()=>{
	Cafesheet.Spec(Table)
		.addChild()
		.addToParent()
		.createChild()
		.getChildren()
		.getParent()
		.removeFromParent()
		.removeChild()
	// TODO JSON
})
