o.spec('Cell', ()=>{
	o('family', ()=>{
		o(Cell.descendants).deepEquals(undefined)
		o(Cell.child).equals(undefined)
		o(Cell.ancestors).deepEquals([Row, Section, Table, Base])
		o(Cell.parent).equals(Row)
	})

	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const instance = Cell.create()
			o(instance.getParent()).equals(undefined)
			o(instance.datum).equals(undefined)
		})
		o('.create($value)', ()=>{
			const value = 'banana'
			const instance = Cell.create({datum: value})
			o(instance.datum).equals(value)
		})
	})
	o('.new()', ()=>{
		const instance = Cell.new()
		o(instance.getParent()).equals(undefined)
		o(instance.datum).equals(undefined)
	})
})
o.spec('@cell', ()=>{
	Cafesheet.Spec(Cell)
		.addTo()
		.getParent()
		.getPlace()
		.getSiblings()
		.placeAt()
		.removeFromParent()
		.scan()
	
	o('.empty()', ()=>{
		const cell = Cell.create({datum: 'banana'})
		o(cell.datum).equals('banana')
		o(cell.empty().datum).equals('')
	})
	o('.scanFor($Class)', ()=>{
		const base = Base.create()
		const table = base.tables[0]
		const section = table.sections[0]
		const row = section.rows[0]
		const instance = row.cells[0]

		o(instance.scanFor(Base)).equals(base)
		o(instance.scanFor(Table)).deepEquals(table)
		o(instance.scanFor(Section)).deepEquals(section)
		o(instance.scanFor(Row)).deepEquals(row)
		o(instance.scanFor(Cell)).deepEquals(instance)
		
		o(instance.scanFor(Row)).equals(instance.getParent())
	})
	// TODO JSON
	// TODO create
})
