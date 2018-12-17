o.spec('Row', ()=>{
	o('family', ()=>{
		o(Row.ancestors).deepEquals([Section, Table, Base])
		o(Row.parent).equals(Section)
	})

	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const instance = Row.create()
			o(instance.getChildren().length).equals(0)
			o(instance.getParent()).equals(undefined)
		})
		o('.create({parent: $parent})', ()=>{
			const parent = Section.new()
			const instance = Row.create({parent: parent})
			o(instance.getParent()).equals(parent)
		})
		o('.create({cells: $children})', ()=>{
			const cells = ['a', 'b', 'c']
			const instance = Row.create({cells: cells})
			o(instance.getChildren()).notEquals(cells)
			o(instance.getChildren()).deepEquals(cells)
		})
	})
		// 	const base = Base.create()
		// 	const table = base.scanFor(Table)[0]
		// 	const section = table.getChildren()[0]
		// 	const rowA = section.getChildren()[0]
		// 	o(table.getWidth()).equals(Row.defaultNumberOfChildren)
		// 	o(rowA.getWidth()).equals(table.getWidth())

		// 	const initialWidth = Row.defaultNumberOfChildren
		// 	table.getColumnAt(0).removeFromParent()
		// 	o(table.getWidth()).equals(initialWidth - 1)
		// 	o(rowA.getWidth()).equals(table.getWidth())

		// 	const rowB = section.createChild()
		// 	o(table.getWidth()).equals(initialWidth - 1)
		// 	o(rowA.getWidth()).equals(table.getWidth())
		// 	o(rowB.getWidth()).equals(table.getWidth())
})
o.spec('@row', ()=>{
	// Cafesheet.Spec(Row)
	// 	.addTo()
	//	.getParent()
	// 	.getPlace()
	// 	.getSiblings()
	// 	.placeAt()
	// 	.removeFromParent()
	// 	.scan()

	// o('.empty()', ()=>{
	// 	const cells = ['a', 'b', 'c']
	// 	const instance = Row.create({cells: cells})
	// 	o(instance.empty()).equals(instance)
	// 	o(instance.getChildren()).deepEquals(['', '', ''])
	// })
	o('.getChildren()', ()=>{
		const cells = ['a', 'b', 'c']
		const instance = Row.create({cells: cells})
		o(instance.getChildren()).notEquals(cells)
		o(instance.getChildren()).deepEquals(cells)
	})
	o('.getWidth()', ()=>{
		o(Row.create().getWidth()).equals(0)

		const cells = ['a', 'b', 'c']
		const instance = Row.create({cells: cells})
		o(instance.getWidth()).equals(cells.length)
	})
	o('.toJSON()', ()=>{
		o(JSON.stringify(Row.create())).equals(JSON.stringify({cells: []}))

		const cells = ['a', 'b', 'c']
		o(JSON.stringify(Row.create({cells: cells}))).equals(JSON.stringify({cells: cells}))
	})
	// o('.scanFor($Class)', ()=>{
	// 	const base = Base.create()
	// 	const table = base.tables[0]
	// 	const section = table.sections[0]
	// 	const instance = section.rows[0]
	// 	const cells = instance.cells

	// 	o(instance.scanFor(Base)).equals(base)
	// 	o(instance.scanFor(Table)).deepEquals(table)
	// 	o(instance.scanFor(Section)).deepEquals(section)
	// 	o(instance.scanFor(Row)).deepEquals(instance)
	// 	o(instance.scanFor(Cell)).deepEquals(cells)
		
	// 	o(instance.scanFor(Section)).equals(instance.getParent())
	// 	o(instance.scanFor(Cell)).deepEquals(instance.getChildren())
	// })
})
