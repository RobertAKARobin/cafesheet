o('Table', ()=>{
	o(Table.descendants).deepEquals([Section, Row, Cell])
	o(Table.child).equals(Section)
	o(Table.ancestors).deepEquals([Base])
	o(Table.parent).equals(Base)
})
o.spec('@table', ()=>{
	Cafesheet.Spec(Table)
		.addToParent()
		.createChild()
		.getChildren()
		.getParent()
		.getPlace()
		.getSiblings()
		.placeAt()
		.placeChild()
		.removeFromParent()
		.removeChild()
	
	o.spec('.scan', ()=>{
		o('.scan(Table)', ()=>{
			const instance = new Table()
			o(thrownBy(n=>instance.scan(Table))).equals(Error)
		})
		o('.scan()', ()=>{
			const instance = new Table()
			o(thrownBy(n=>instance.scan())).equals(Error)
		})
		o('.scan(ExternalClass)', ()=>{
			const instance = new Table()
			o(thrownBy(n=>instance.scan(Element))).equals(Error)
		})
	})
})
