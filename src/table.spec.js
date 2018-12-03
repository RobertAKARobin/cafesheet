o.spec('Table', ()=>{
	o('family', ()=>{
		o(Table.descendants).deepEquals([Section, Row, Cell])
		o(Table.child).equals(Section)
		o(Table.ancestors).deepEquals([Base])
		o(Table.parent).equals(Base)
	})

	o('.create()', ()=>{
		const instance = Table.create()
		o(instance.getChildren().length).equals(Table.defaultNumberOfChildren)
		o(instance.getParent()).equals(undefined)
	})
	o('.new()', ()=>{
		const instance = Table.new()
		o(instance.getChildren().length).equals(0)
		o(instance.getParent()).equals(undefined)
	})
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
		.scan()

	o('.getColumns()', ()=>{
		o(Table.create().getColumns().length).equals(Row.defaultNumberOfChildren)
	})
	o('.getWidth()', ()=>{
		o(Table.new().getWidth()).equals(0)

		const instance = Table.create()
		const initialWidth = Row.defaultNumberOfChildren
		o(instance.getWidth()).equals(initialWidth)

		const sectionA = instance.createChild()
		const sectionB = instance.createChild()
		const rowA = sectionA.createChild()
		const rowB = sectionB.createChild()
		rowA.createChild()
		o(instance.getWidth()).equals(initialWidth + 1)

		rowB.createChild()
		rowB.createChild()
		o(instance.getWidth()).equals(initialWidth + 2)
	})
	o('.scanFor($Class)', ()=>{
		const base = Base.create()
		const instance = base.tables[0]
		const sections = instance.sections
		const rows = sections.map(s=>s.rows).flat()
		const cells = rows.map(r=>r.cells).flat()

		o(instance.scanFor(Base)).equals(base)
		o(instance.scanFor(Table)).deepEquals(instance)
		o(instance.scanFor(Section)).deepEquals(sections)
		o(instance.scanFor(Row)).deepEquals(rows)
		o(instance.scanFor(Cell)).deepEquals(cells)

		o(instance.scanFor(Base)).equals(instance.getParent())
		o(instance.scanFor(Section)).deepEquals(instance.getChildren())
	})
})
