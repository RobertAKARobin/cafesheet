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

	o('.getWidth()', ()=>{
		o(Row.new().getWidth()).equals(0)

		const instance = Row.create()
		const initialWidth = Row.defaultNumberOfChildren
		o(instance.getWidth()).equals(initialWidth)
		
		const child = instance.createChild()
		o(instance.getWidth()).equals(initialWidth + 1)
		
		instance.createChild()
		o(instance.getWidth()).equals(initialWidth + 2)
		
		instance.removeChild(child)
		o(instance.getWidth()).equals(initialWidth + 1)
	})
	o('.scanFor($Class)', ()=>{
		const base = Base.create()
		const table = base.tables[0]
		const section = table.sections[0]
		const instance = section.rows[0]
		const cells = instance.cells

		o(instance.scanFor(Base)).equals(base)
		o(instance.scanFor(Table)).deepEquals(table)
		o(instance.scanFor(Section)).deepEquals(section)
		o(instance.scanFor(Row)).deepEquals(instance)
		o(instance.scanFor(Cell)).deepEquals(cells)
		
		o(instance.scanFor(Section)).equals(instance.getParent())
		o(instance.scanFor(Cell)).deepEquals(instance.getChildren())
	})
})
