o('Row', ()=>{
	o(Row.descendants).deepEquals([Cell])
	o(Row.child).equals(Cell)
	o(Row.ancestors).deepEquals([Section, Table, Base])
	o(Row.parent).equals(Section)
})
o.spec('@row', ()=>{
	Cafesheet.Spec(Row)
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
		.scan()

	o('.scan($Class)', ()=>{
		const base = Base.create()
		const table = base.tables[0]
		const section = table.sections[0]
		const instance = section.rows[0]
		const cells = instance.cells

		o(instance.scan(Base)).equals(base)
		o(instance.scan(Table)).deepEquals(table)
		o(instance.scan(Section)).deepEquals(section)
		o(instance.scan(Row)).deepEquals(instance)
		o(instance.scan(Cell)).deepEquals(cells)
		
		o(instance.scan(Section)).equals(instance.getParent())
		o(instance.scan(Cell)).deepEquals(instance.getChildren())
	})
})
