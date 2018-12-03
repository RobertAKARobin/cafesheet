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
	
	o('.scan($Class)', ()=>{
		const instance = Base.create()
		const tables = instance.tables
		const sections = tables.map(t=>t.sections).flat()
		const rows = sections.map(s=>s.rows).flat()
		const cells = rows.map(r=>r.cells).flat()

		o(instance.scan(Base)).equals(instance)
		o(instance.scan(Table)).deepEquals(tables)
		o(instance.scan(Section)).deepEquals(sections)
		o(instance.scan(Row)).deepEquals(rows)
		o(instance.scan(Cell)).deepEquals(cells)
	})
})
