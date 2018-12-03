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
		.scan()

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
