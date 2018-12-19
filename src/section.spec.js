o.spec('Section', ()=>{
	o('family', ()=>{
		o(Section.descendants).deepEquals([Row])
		o(Section.child).equals(Row)
		o(Section.ancestors).deepEquals([Table, Base])
		o(Section.parent).equals(Table)
	})

	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const instance = Section.create()
			o(instance.getChildren().length).equals(Section.defaultNumberOfChildren)
			o(instance.getParent()).equals(undefined)
		})
		o('.create({parent: $parent})', ()=>{
			const parent = Table.new()
			const instance = Section.create({parent: parent})
			o(instance.getParent()).equals(parent)

			// TODO: Test for when wrong kind of parent
		})
		o('.create({rows: $children})', ()=>{
			const children = [Row.create(), Row.create(), Row.create()]
			const instance = Section.create({rows: children})
			o(instance.getChildren()).notEquals(children)
			o(instance.getChildren()).deepEquals(children)

			// TODO: Test for when wrong kind of child
		})
	})
})
// o.spec('@section', ()=>{
// 	Cafesheet.Spec(Section)
// 		.addTo()
// 		.createChild()
// 		.empty()
// 		.getChildren()
// 		.getParent()
// 		.getPlace()
// 		.getSiblings()
// 		.placeAt()
// 		.placeChild()
// 		.removeFromParent()
// 		.removeChild()
// 		.scan()

// 	// o('.getColumns()', ()=>{
// 	// 	o(Section.create().getColumns().length).equals(Row.defaultNumberOfChildren)
// 	// })
// 	o('.getWidth()', ()=>{
// 		o(Section.new().getWidth()).equals(0)

// 		const instance = Section.create()
// 		const initialWidth = Row.defaultNumberOfChildren
// 		o(instance.getWidth()).equals(initialWidth)

// 		const rowA = instance.createChild()
// 		const rowB = instance.createChild()
// 		rowA.createChild()
// 		o(instance.getWidth()).equals(initialWidth + 1)

// 		rowB.createChild()
// 		rowB.createChild()
// 		o(instance.getWidth()).equals(initialWidth + 2)
// 	})
// 	o('.scanFor($Class)', ()=>{
// 		const base = Base.create()
// 		const table = base.tables[0]
// 		const instance = table.sections[0]
// 		const rows = instance.rows
// 		const cells = rows.map(r=>r.cells).flat()

// 		o(instance.scanFor(Base)).equals(base)
// 		o(instance.scanFor(Table)).deepEquals(table)
// 		o(instance.scanFor(Section)).deepEquals(instance)
// 		o(instance.scanFor(Row)).deepEquals(rows)
// 		o(instance.scanFor(Cell)).deepEquals(cells)

// 		o(instance.scanFor(Table)).equals(instance.getParent())
// 		o(instance.scanFor(Row)).deepEquals(instance.getChildren())
// 	})
// })
