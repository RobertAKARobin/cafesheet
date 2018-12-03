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

	o('.scan($Class)', ()=>{
		const base = Base.create()
		const instance = base.tables[0]
		const sections = instance.sections
		const rows = sections.map(s=>s.rows).flat()
		const cells = rows.map(r=>r.cells).flat()

		o(instance.scan(Base)).equals(base)
		o(instance.scan(Table)).deepEquals(instance)
		o(instance.scan(Section)).deepEquals(sections)
		o(instance.scan(Row)).deepEquals(rows)
		o(instance.scan(Cell)).deepEquals(cells)

		o(instance.scan(Base)).equals(instance.getParent())
		o(instance.scan(Section)).deepEquals(instance.getChildren())
	})
})
