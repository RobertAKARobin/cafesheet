// o.spec('TableColumn', ()=>{
// 	o.spec('.get', ()=>{
// 		o('.get()', ()=>{
// 			const column = TableColumn.get()
// 			o(column.getCells()).deepEquals([])
// 			column.getCells().push('foo')
// 			o(column.getCells()).deepEquals([])
// 			o(column.getParent()).equals(undefined)
// 			o(column.place).equals(-1)
// 		})
// 		o('.get({parent: $parent}', ()=>{
// 			const table = Table.create()
// 			const column = TableColumn.get({parent: table})
// 			o(column.getCells()).deepEquals([])
// 			o(column.getParent()).equals(table)
// 			o(column.place).equals(-1)
// 		})
// 		o('.get({parent: $wrongparent}', ()=>{
// 			o(n=>TableColumn.get({parent: Cell.new()})).throws(Error)
// 		})
// 		o('.get({place: $NaN}', ()=>{
// 			o(n=>TableColumn.get({place: 'banana'})).throws(Error)
// 		})
// 		o('.get({place: $number}', ()=>{
// 			const column = TableColumn.get({place: 1})
// 			o(column.place).equals(1)
// 			o(column.getParent()).equals(undefined)
// 			o(column.getCells()).deepEquals([])
// 		})
// 		o('.get({parent: $parent, place: $number}', ()=>{
// 			const table = Table.create()
// 			const place = 1
// 			const column = TableColumn.get({parent: table, place: place})
// 			o(column.place).equals(place)
// 			o(column.getCells()).deepEquals(table.scanFor(Cell).filter(cell=>cell.place == column.place))
// 			o(column.getParent()).equals(table)
// 		})
// 	})
// 	o('.new()', ()=>{
// 		const column = TableColumn.new()
// 		o(column.getCells()).deepEquals([])
// 		column.getCells().push('foo')
// 		o(column.getCells()).deepEquals([])
// 		o(column.getParent()).equals(undefined)
// 		o(column.place).equals(-1)
// 	})
// })
// o.spec('@tableColumn', ()=>{
// 	o('.getCells()', ()=>{
// 		const table = Table.create()
// 		const place = 1
// 		const column = table.getColumnAt(place)
// 		const tableCells = table.scanFor(Cell).filter(cell=>cell.place == place)
// 		o(column.getCells()).deepEquals(tableCells)
// 	})
// 	o('.getPlace()', ()=>{
// 		const table = Table.create()
// 		const place = 1
// 		const column = table.getColumnAt(place)
// 		o(column.place).equals(1)
// 	})
// 	o('.removeFromParent()', ()=>{
// 		const table = Table.create()
// 		const place = 1
// 		const columnA = table.getColumnAt(place)
// 		const columnLength = columnA.getCells().length
// 		const columnB = table.getColumnAt(place + 1)
// 		const columnACells = columnA.getCells()
// 		const columnBCells = columnB.getCells()
		
// 		o(columnA.removeFromParent()).equals(columnA)
// 		o(columnACells.map(c=>c.place)).deepEquals(columnLength.map(n=>-1))
// 		o(columnACells.map(c=>c.getParent())).deepEquals(columnLength.map(n=>undefined))
// 		o(table.scanFor(Row).map(r=>r.getWidth())).deepEquals(columnLength.map(n=>Row.defaultNumberOfChildren - 1))
// 		o(table.getWidth()).equals(Row.defaultNumberOfChildren - 1)
// 		o(columnA.getCells()).deepEquals(columnBCells)

// 		o(columnB.removeFromParent()).equals(columnB)
// 		o(table.scanFor(Row).map(r=>r.getWidth())).deepEquals(columnLength.map(n=>Row.defaultNumberOfChildren - 2))
// 		o(table.getWidth()).equals(Row.defaultNumberOfChildren - 2)
// 	})
// })
