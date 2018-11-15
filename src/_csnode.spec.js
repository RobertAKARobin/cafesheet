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
	o.spec('.children', ()=>{
		o.beforeEach(()=>{
			_.instance = _.base
			_.class = _.instance.constructor
			_.childClass = _.class.child
		})
		o('.add(@child)', ()=>{
			o(thrownBy(n=>_.instance.children.add('wrong class'))).equals(Error)

			o(_.instance.children.get().length).equals(0)
			o(_.instance.children.get()).deepEquals([])

			const child = new _.childClass()
			o(_.instance.children.add(child).constructor).equals(_.childClass)
			o(_.instance.children.get()).deepEquals([child])
			o(child.parent).equals(_.instance)

			const otherInstance = new _.class()
			otherInstance.children.add(child)
			o(_.instance.children.get()).deepEquals([])
			o(otherInstance.children.get()).deepEquals([child])
			o(child.parent).equals(otherInstance)
		})
		o('@child.addTo(@parent)', ()=>{
			const child = new _.childClass()
			const otherInstance = new _.class()

			child.addTo(_.instance)
			child.addTo(otherInstance)
			o(_.instance.children.get()).deepEquals([])
			o(otherInstance.children.get()).deepEquals([child])
			o(child.parent).equals(otherInstance)
		})
		o('.get()', ()=>{
			o(_.instance.children.get()).deepEquals([])
	
			const child = _.instance.children.create()
			o(child.constructor).equals(_.childClass)
			o(_.instance.children.get()).deepEquals([child])
			o(child.parent).equals(_.instance)
		})
		o('.remove(@child)', ()=>{
			const childA = _.instance.children.create()
			const childB = _.instance.children.create()
			o(childA.parent).equals(_.instance)
			o(childB.parent).equals(_.instance)
			o(_.instance.children.get()).deepEquals([childA, childB])

			_.base.children.remove(childA)
			o(childA.parent).equals(undefined)
			o(_.instance.children.get()).deepEquals([childB])

			_.base.children.remove(childB)
			o(childB.parent).equals(undefined)
			o(_.instance.children.get()).deepEquals([])

			o(_.instance.children.remove(childB)).equals(false)
		})
		o('@child.removeFromParent()', ()=>{
			const childA = _.instance.children.create()
			const childB = _.instance.children.create()

			childA.removeFromParent()
			o(childA.parent).equals(undefined)
			o(_.instance.children.get()).deepEquals([childB])

			childB.removeFromParent()
			o(childB.parent).equals(undefined)
			o(_.instance.children.get()).deepEquals([])

			o(childA.removeFromParent()).equals(false)
		})
	})
	o('.addTable(@table)', ()=>{
		o(thrownBy(n=>_.base.addTable('not a table'))).equals(Error)

		o(_.base.tables.length).equals(0)
		o(_.base.tables).deepEquals([])

		const table = new Table()
		o(_.base.addTable(table).constructor).equals(Table)
		o(_.base.tables).deepEquals([table])
		o(table.base).equals(_.base)
	})
	o('.createTable()', ()=>{
		o(_.base.tables).deepEquals([])

		const table = _.base.createTable()
		o(table.constructor).equals(Table)
		o(_.base.tables).deepEquals([table])
		o(table.base).equals(_.base)
	})
	o('.removeTable(@table)', ()=>{
		const tableA = _.base.createTable()
		const tableB = _.base.createTable()
		o(_.base.tables).deepEquals([tableA, tableB])
		_.base.removeTable(tableA)
		o(_.base.tables).deepEquals([tableB])
		_.base.removeTable(tableB)
		o(_.base.tables).deepEquals([])

		o(_.base.removeTable(tableB)).equals(false)
	})
	// o('@otherbase.addTable(@table)', ()=>{
	// 	const otherBase = new Base()
	// 	const table = new Table()

	// 	_.base.addTable(table)
	// 	o(table.base).equals(_.base)
	// 	otherBase.addTable(table)
	// 	o(table.base).equals(otherBase)
	// 	o(_.base.tables).deepEquals([])
	// 	o(otherBase.tables).deepEquals([table])
	// })
	o('JSON.stringify(@base)', ()=>{
		_.base.createTable()
		_.base.createTable()

		const json = JSON.parse(JSON.stringify(_.base))
		o(Object.keys(json)).deepEquals(['tables'])
		o(json.tables.length).equals(2)
	})
})
