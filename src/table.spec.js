o.spec('Table', ()=>{
	o('family', ()=>{
		o(Table.descendants).deepEquals([Section, Row])
		o(Table.child).equals(Section)
		o(Table.ancestors).deepEquals([Base])
		o(Table.parent).equals(Base)
	})

	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const instance = Table.create()
			o(instance.getChildren().length).equals(Table.defaultNumberOfChildren)
			o(instance.getParent()).equals(undefined)
		})
		o('.create({parent: $parent})', ()=>{
			const parent = Base.new()
			const instance = Table.create({parent: parent})
			o(instance.getParent()).equals(parent)
		})
		o('.create({rows: $children})', ()=>{
			const children = [Section.create(), Section.create(), Section.create()]
			const instance = Table.create({sections: children})
			o(instance.getChildren()).notEquals(children)
			o(instance.getChildren()).deepEquals(children)
		})
	})
})
// o.spec('@table', ()=>{
// 	Cafesheet.Spec(Table)
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

// 	o.spec('.getColumnAt', ()=>{
// 		o('.getColumnAt()', ()=>{
// 			const table = Table.create()
// 			const column = table.getColumnAt()
// 			o(column.getParent()).equals(table)
// 			o(column.place).equals(-1)
// 		})
// 		o('.getColumnAt($number)', ()=>{
// 			const table = Table.new()
// 			const column = table.getColumnAt(1)
// 			o(column.cells).deepEquals([])

// 			const section = Section.new().addTo(table)
// 			const rowA = Row.new().addTo(section)
// 			const rowAcellA = rowA.createCell()
// 			const rowAcellB = rowA.createCell()
// 			o(column.cells).deepEquals([rowAcellB])

// 			const rowB = Row.new().addTo(section)
// 			const rowBcellA = rowB.createCell()
// 			const rowBcellB = rowB.createCell()
// 			o(column.cells).deepEquals([rowAcellB, rowBcellB])
// 		})
// 	})
// 	o('.getColumns()', ()=>{
// 		o(Table.create().getColumns().length).equals(Row.defaultNumberOfChildren)
// 	})
// 	o('.getWidth()', ()=>{
// 		o(Table.new().getWidth()).equals(0)

// 		const instance = Table.create()
// 		const initialWidth = Row.defaultNumberOfChildren
// 		o(instance.getWidth()).equals(initialWidth)

// 		const sectionA = instance.createChild()
// 		const sectionB = instance.createChild()
// 		const rowA = sectionA.createChild()
// 		const rowB = sectionB.createChild()
// 		rowA.createChild()
// 		o(instance.getWidth()).equals(initialWidth + 1)

// 		rowB.createChild()
// 		rowB.createChild()
// 		o(instance.getWidth()).equals(initialWidth + 2)

// 		rowB.removeFromParent()
// 		o(instance.getWidth()).equals(initialWidth + 1)

// 		rowA.removeFromParent()
// 		o(instance.getWidth()).equals(initialWidth)
// 	})
// 	o('.scanFor($Class)', ()=>{
// 		const base = Base.create()
// 		const instance = base.tables[0]
// 		const sections = instance.sections
// 		const rows = sections.map(s=>s.rows).flat()
// 		const cells = rows.map(r=>r.cells).flat()

// 		o(instance.scanFor(Base)).equals(base)
// 		o(instance.scanFor(Table)).deepEquals(instance)
// 		o(instance.scanFor(Section)).deepEquals(sections)
// 		o(instance.scanFor(Row)).deepEquals(rows)
// 		o(instance.scanFor(Cell)).deepEquals(cells)

// 		o(instance.scanFor(Base)).equals(instance.getParent())
// 		o(instance.scanFor(Section)).deepEquals(instance.getChildren())
// 	})
// })
