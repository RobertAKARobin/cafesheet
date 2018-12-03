o('Cell', ()=>{
	o(Cell.descendants).deepEquals(undefined)
	o(Cell.child).equals(undefined)
	o(Cell.ancestors).deepEquals([Row, Section, Table, Base])
	o(Cell.parent).equals(Row)
})
o.spec('@cell', ()=>{
	Cafesheet.Spec(Cell)
		.addToParent()
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
