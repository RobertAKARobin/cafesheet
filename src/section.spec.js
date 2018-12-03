o('Section', ()=>{
	o(Section.descendants).deepEquals([Row, Cell])
	o(Section.child).equals(Row)
	o(Section.ancestors).deepEquals([Table, Base])
	o(Section.parent).equals(Table)
})
o.spec('@section', ()=>{
	Cafesheet.Spec(Section)
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

	o('.scanFor($Class)', ()=>{
		const base = Base.create()
		const table = base.tables[0]
		const instance = table.sections[0]
		const rows = instance.rows
		const cells = rows.map(r=>r.cells).flat()

		o(instance.scanFor(Base)).equals(base)
		o(instance.scanFor(Table)).deepEquals(table)
		o(instance.scanFor(Section)).deepEquals(instance)
		o(instance.scanFor(Row)).deepEquals(rows)
		o(instance.scanFor(Cell)).deepEquals(cells)

		o(instance.scanFor(Table)).equals(instance.getParent())
		o(instance.scanFor(Row)).deepEquals(instance.getChildren())
	})
})
