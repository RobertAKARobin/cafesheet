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

	o('.scan($Class)', ()=>{
		const base = Base.create()
		const table = base.tables[0]
		const instance = table.sections[0]
		const rows = instance.rows
		const cells = rows.map(r=>r.cells).flat()

		o(instance.scan(Base)).equals(base)
		o(instance.scan(Table)).deepEquals(table)
		o(instance.scan(Section)).deepEquals(instance)
		o(instance.scan(Row)).deepEquals(rows)
		o(instance.scan(Cell)).deepEquals(cells)

		o(instance.scan(Table)).equals(instance.getParent())
		o(instance.scan(Row)).deepEquals(instance.getChildren())
	})
})
