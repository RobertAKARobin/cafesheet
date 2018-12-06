o.spec('TableColumn', ()=>{
	o.spec('.new', ()=>{
		o('.new()', ()=>{
			const column = TableColumn.new()
			o(column.cells).deepEquals([])
			column.cells.push('foo')
			o(column.cells).deepEquals([])
			o(column.getParent()).equals(undefined)
		})
		o('.new({parent: $parent}', ()=>{
			const table = Table.create()
			const column = TableColumn.new({parent: table})
			o(column.cells).deepEquals([])
			o(column.getParent()).equals(table)
		})
		o('.new({parent: $wrongparent}', ()=>{
			o(thrownBy(n=>TableColumn.new({parent: Cell.new()}))).equals(Error)
		})
		o('.new({parent: $parent, place: $place}', ()=>{
			const table = Table.create()
			const column = TableColumn.new({parent: table, place: 1})
			o(column.cells).deepEquals(table.scanFor(Cell).filter(cell=>cell.place == column.place))
			o(column.getParent()).equals(table)
		})
	})
})
o.spec('@tableColumn', ()=>{
	o('.getCells()', ()=>{
		const table = Table.create()
		const place = 1
		const column = table.getColumnAt(place)
		const tableCells = table.scanFor(Cell).filter(cell=>cell.place == place)
		o(column.cells).deepEquals(tableCells)
	})
	o('.getPlace()', ()=>{
		const table = Table.create()
		const place = 1
		const column = table.getColumnAt(place)
		o(column.place).equals(1)
	})
})
