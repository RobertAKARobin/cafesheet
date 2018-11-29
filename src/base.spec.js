o('Base', ()=>{
	o(Base.descendants).deepEquals([Table, Section, Row, Cell])
	o(Base.child).equals(Table)
	o(Base.ancestors).equals(undefined)
	o(Base.parent).equals(undefined)
})
o.spec('@base', ()=>{
	Cafesheet.Spec(Base)
		.addChild()
		.createChild()
		.getChildren()
		.removeChild()
		.toJSON()
})
