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
		let base = undefined
		let table = undefined
		o.beforeEach(()=>{
			base = Base.create()
			table = base.tables[0]
		})
		o('.scan(Base)', ()=>{
			const result = table.scan(Base)
			o(result).equals(table.getParent())
			o(result).equals(base)
		})
		o('.scan(Table)', ()=>{
			o(thrownBy(n=>table.scan(Table))).equals(Error)
		})
		o('.scan()', ()=>{
			o(thrownBy(n=>table.scan())).equals(Error)
		})
		o('.scan(ExternalClass)', ()=>{
			o(thrownBy(n=>table.scan(Element))).equals(Error)
		})
	})
})
