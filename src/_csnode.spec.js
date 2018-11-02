o.spec('Array', ()=>{
	'use strict'

	o(`#sortOn`, ()=>{
		const a = [{v: 'f'}, {v: 'c'}, {v: 'a'}, {v: '3'}, {v: 2}]
		o(a.sortOn(i=>i.v).map(i=>i.v)).deepEquals([2,'3','a','c','f'])
	})
	o('#without', ()=>{
		const a = [1, 2, 'a', 'b', 5]
		o(a.without(2)).deepEquals([1, 'a', 'b', 5])
	})
	o('#remove', ()=>{
		const target = {v: 'a'}
		const a = ['a', 'b', target, 'd']
		o(a.remove(target)).equals(target)
		o(a).deepEquals(['a', 'b', 'd'])
	})
})

function thrownBy(callback){
	try{
		callback()
	}catch(e){
		return e.constructor
	}
}

o.spec('Family trees', ()=>{
	o('Sheet', ()=>{
		o(Sheet.descendants).deepEquals([Table, Section, Row, Cell])
		o(Sheet.child).equals(Table)
		o(Sheet.ancestors).equals(undefined)
		o(Sheet.parent).equals(undefined)
	})
	o('Table', ()=>{
		o(Table.descendants).deepEquals([Section, Row, Cell])
		o(Table.child).equals(Section)
		o(Table.ancestors).deepEquals([Sheet])
		o(Table.parent).equals(Sheet)
	})
	o('Section', ()=>{
		o(Section.descendants).deepEquals([Row, Cell])
		o(Section.child).equals(Row)
		o(Section.ancestors).deepEquals([Table, Sheet])
		o(Section.parent).equals(Table)
	})
	o('Row', ()=>{
		o(Row.descendants).deepEquals([Cell])
		o(Row.child).equals(Cell)
		o(Row.ancestors).deepEquals([Section, Table, Sheet])
		o(Row.parent).equals(Section)
	})
	o('Cell', ()=>{
		o(Cell.descendants).deepEquals(undefined)
		o(Cell.child).equals(undefined)
		o(Cell.ancestors).deepEquals([Row, Section, Table, Sheet])
		o(Cell.parent).equals(Row)
	})
})

o.spec('@sheet', ()=>{
	const _ = {}
	o.beforeEach(()=>{
		_.sheet = new Sheet()
	})
	o('.createTable()', ()=>{
		o(_.sheet.tables).deepEquals([])

		const table = _.sheet.createTable()
		o(table.constructor).equals(Table)
		o(_.sheet.tables).deepEquals([table])
		o(table.sheet).equals(_.sheet)
	})
	o('.addTable(@table)', ()=>{
		o(thrownBy(n=>_.sheet.addTable('table'))).equals(Error)

		o(_.sheet.tables.length).equals(0)
		o(_.sheet.tables).deepEquals([])

		const table = new Table()
		o(_.sheet.addTable(table).constructor).equals(Table)
		o(_.sheet.tables).deepEquals([table])
		o(table.sheet).equals(_.sheet)
	})
	o('.removeTable(@table)', ()=>{
		const tableA = _.sheet.createTable()
		const tableB = _.sheet.createTable()
		o(_.sheet.tables).deepEquals([tableA, tableB])
		_.sheet.removeTable(tableA)
		o(_.sheet.tables).deepEquals([tableB])
		_.sheet.removeTable(tableB)
		o(_.sheet.tables).deepEquals([])

		const otherSheet = new Sheet()
		otherSheet.addTable(tableA)
		o(_.sheet.tables).deepEquals([])
		o(otherSheet.tables).deepEquals([tableA])
	})
	o('@othersheet.addTable(@table)', ()=>{
		const otherSheet = new Sheet()
		const table = new Table()

		_.sheet.addTable(table)
		o(table.sheet).equals(_.sheet)
		otherSheet.addTable(table)
		o(table.sheet).equals(otherSheet)
		o(_.sheet.tables).deepEquals([])
		o(otherSheet.tables).deepEquals([table])
	})
	o('JSON.stringify(@sheet)', ()=>{
		_.sheet.createTable()
		_.sheet.createTable()

		const json = JSON.parse(JSON.stringify(_.sheet))
		o(Object.keys(json)).deepEquals(['tables'])
		o(json.tables.length).equals(2)
	})
})
