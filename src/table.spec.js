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
		.empty()
		.getChildren()
		.getParent()
		.getPlace()
		.getSiblings()
		.placeAt()
		.placeChild()
		.removeFromParent()
		.removeChild()
	
	o.spec('.scan', ()=>{
		o('.scan(Base)', ()=>{
			const instance = new Table()
			const result = instance.scan(Base)
			o(result).equals(instance.getParent())
		})
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
