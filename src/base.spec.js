o.spec('Base', ()=>{
	o('family', ()=>{
		o(Base.descendants).deepEquals([Table, Section, Row])
		o(Base.child).equals(Table)
		o(Base.ancestors).equals(undefined)
		o(Base.parent).equals(undefined)
	})

	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const instance = Base.create()
			o(instance.getChildren().length).equals(Base.defaultNumberOfChildren)
		})
		o('.create({tables: $children})', ()=>{
			const children = [Table.create(), Table.create(), Table.create()]
			const instance = Base.create({tables: children})
			o(instance.getChildren()).notEquals(children)
			o(instance.getChildren()).deepEquals(children)
		})
	})
})
// o.spec('@base', ()=>{
// 	Cafesheet.Spec(Base)
// 		.createChild()
// 		.getChildren()
// 		.empty()
// 		.placeChild()
// 		.removeChild()
// 		.scan()
	
// 	o('.scanFor($Class)', ()=>{
// 		const instance = Base.create()
// 		const tables = instance.tables
// 		const sections = tables.map(t=>t.sections).flat()
// 		const rows = sections.map(s=>s.rows).flat()
// 		const cells = rows.map(r=>r.cells).flat()

// 		o(instance.scanFor(Base)).equals(instance)
// 		o(instance.scanFor(Table)).deepEquals(tables)
// 		o(instance.scanFor(Section)).deepEquals(sections)
// 		o(instance.scanFor(Row)).deepEquals(rows)
// 		o(instance.scanFor(Cell)).deepEquals(cells)

// 		o(instance.scanFor(Table)).deepEquals(instance.getChildren())
// 	})
// })
