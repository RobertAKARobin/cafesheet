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
	o('Base', ()=>{
		o(Base.descendants).deepEquals([Table, Section, Row, Cell])
		o(Base.child).equals(Table)
		o(Base.ancestors).equals(undefined)
		o(Base.parent).equals(undefined)
	})
	o('Table', ()=>{
		o(Table.descendants).deepEquals([Section, Row, Cell])
		o(Table.child).equals(Section)
		o(Table.ancestors).deepEquals([Base])
		o(Table.parent).equals(Base)
	})
	o('Section', ()=>{
		o(Section.descendants).deepEquals([Row, Cell])
		o(Section.child).equals(Row)
		o(Section.ancestors).deepEquals([Table, Base])
		o(Section.parent).equals(Table)
	})
	o('Row', ()=>{
		o(Row.descendants).deepEquals([Cell])
		o(Row.child).equals(Cell)
		o(Row.ancestors).deepEquals([Section, Table, Base])
		o(Row.parent).equals(Section)
	})
	o('Cell', ()=>{
		o(Cell.descendants).deepEquals(undefined)
		o(Cell.child).equals(undefined)
		o(Cell.ancestors).deepEquals([Row, Section, Table, Base])
		o(Cell.parent).equals(Row)
	})
})

o.spec('@base', ()=>{
	const _ = {}
	o.beforeEach(()=>{
		_.base = new Base()
	})
	o('.create()', ()=>{
		o(_.base.tables).deepEquals([])

		const table = _.base.create()
		o(table.constructor).equals(Table)
		o(_.base.tables).deepEquals([table])
		o(table.base).equals(_.base)
	})
	o('.add(@table)', ()=>{
		o(thrownBy(n=>_.base.add('table'))).equals(Error)

		o(_.base.tables.length).equals(0)
		o(_.base.tables).deepEquals([])

		const table = new Table()
		o(_.base.add(table).constructor).equals(Table)
		o(_.base.tables).deepEquals([table])
		o(table.base).equals(_.base)
	})
	o('.remove(@table)', ()=>{
		o(thrownBy(n=>_.base.remove('table'))).equals(Error)
		
		const tableA = _.base.create()
		const tableB = _.base.create()
		o(_.base.tables).deepEquals([tableA, tableB])
		_.base.remove(tableA)
		o(_.base.tables).deepEquals([tableB])
		_.base.remove(tableB)
		o(_.base.tables).deepEquals([])

		const otherBase = new Base()
		otherBase.add(tableA)
		o(_.base.tables).deepEquals([])
		o(otherBase.tables).deepEquals([tableA])
	})
	o('@otherbase.add(@table)', ()=>{
		const otherBase = new Base()
		const table = new Table()

		_.base.add(table)
		o(table.base).equals(_.base)
		otherBase.add(table)
		o(table.base).equals(otherBase)
		o(_.base.tables).deepEquals([])
		o(otherBase.tables).deepEquals([table])
	})
	o('JSON.stringify(@base)', ()=>{
		_.base.create()
		_.base.create()

		const json = JSON.parse(JSON.stringify(_.base))
		o(Object.keys(json)).deepEquals(['tables'])
		o(json.tables.length).equals(2)
	})
})
