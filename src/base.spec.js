o('Base', ()=>{
	o(Base.descendants).deepEquals([Table, Section, Row, Cell])
	o(Base.child).equals(Table)
	o(Base.ancestors).equals(undefined)
	o(Base.parent).equals(undefined)
})
o.spec('@base', ()=>{
	Cafesheet.Spec(Base)
		.createChild()
		.getChildren()
		.empty()
		.placeChild()
		.removeChild()
		.scan()
	
	o('.scanFor($Class)', ()=>{
		const instance = Base.create()
		const tables = instance.tables
		const sections = tables.map(t=>t.sections).flat()
		const rows = sections.map(s=>s.rows).flat()
		const cells = rows.map(r=>r.cells).flat()

		o(instance.scanFor(Base)).equals(instance)
		o(instance.scanFor(Table)).deepEquals(tables)
		o(instance.scanFor(Section)).deepEquals(sections)
		o(instance.scanFor(Row)).deepEquals(rows)
		o(instance.scanFor(Cell)).deepEquals(cells)

		o(instance.scanFor(Table)).deepEquals(instance.getChildren())
	})
})
