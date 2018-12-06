o.spec('TableColumn', ()=>{
	o.spec('.get', ()=>{
		o('.get()', ()=>{
			const column = TableColumn.get()
			o(column.cells).deepEquals([])
			column.cells.push('foo')
			o(column.cells).deepEquals([])
			o(column.getParent()).equals(undefined)
			o(column.place).equals(-1)
		})
		o('.get({parent: $parent}', ()=>{
			const table = Table.create()
			const column = TableColumn.get({parent: table})
			o(column.cells).deepEquals([])
			o(column.getParent()).equals(table)
			o(column.place).equals(-1)
		})
		o('.get({parent: $wrongparent}', ()=>{
			o(thrownBy(n=>TableColumn.get({parent: Cell.new()}))).equals(Error)
		})
		o('.get({place: $NaN}', ()=>{
			o(thrownBy(n=>TableColumn.get({place: 'banana'}))).equals(Error)
		})
		o('.get({place: $number}', ()=>{
			const column = TableColumn.get({place: 1})
			o(column.place).equals(1)
			o(column.getParent()).equals(undefined)
			o(column.cells).deepEquals([])
		})
		o('.get({parent: $parent, place: $number}', ()=>{
			const table = Table.create()
			const place = 1
			const column = TableColumn.get({parent: table, place: place})
			o(column.place).equals(place)
			o(column.cells).deepEquals(table.scanFor(Cell).filter(cell=>cell.place == column.place))
			o(column.getParent()).equals(table)
		})
	})
	o('.new()', ()=>{
		const column = TableColumn.new()
		o(column.cells).deepEquals([])
		column.cells.push('foo')
		o(column.cells).deepEquals([])
		o(column.getParent()).equals(undefined)
		o(column.place).equals(-1)
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
