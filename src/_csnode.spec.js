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

function specChildren(Class){
	o.spec('.children', ()=>{
		const _ = {}
		_.class = Class
		o.beforeEach(()=>{
			_.instance = new _.class()
			_.childClass = _.class.child
		})
		o('new', ()=>{
			o(_.instance.children.get().length).equals(0)
			o(_.instance.children.get()).deepEquals([])
		})
		o('.add(@child)', ()=>{
			o(thrownBy(n=>_.instance.children.add('wrong class'))).equals(Error)
	
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
	
			_.instance.children.remove(childA)
			o(childA.parent).equals(undefined)
			o(_.instance.children.get()).deepEquals([childB])
	
			_.instance.children.remove(childB)
			o(childB.parent).equals(undefined)
			o(_.instance.children.get()).deepEquals([])
	
			o(_.instance.children.remove(childB)).equals(false)
		})
	})
	o.spec('instance', ()=>{
		const _ = {}
		o.beforeEach(()=>{
			_.instance = new Class()
		})
		o(`.add${Class.child.name}(@${Class.child.name.toLowerCase()})`, ()=>{
			o(thrownBy(n=>_.instance[`add${Class.child.name}`](`not a ${Class.child.name}`))).equals(Error)

			o(_.instance[Class.child.name.toLowerCase().toPlural()].length).equals(0)
			o(_.instance[Class.child.name.toLowerCase().toPlural()]).deepEquals([])

			const child = new Class.child()
			o(_.instance[`add${Class.child.name}`](child).constructor).equals(Class.child)
			o(_.instance[Class.child.name.toLowerCase().toPlural()]).deepEquals([child])
			o(child[Class.name.toLowerCase()]).equals(_.instance)
		})
		o(`@other.add${Class.child.name}(@${Class.child.name.toLowerCase()})`, ()=>{
			const otherInstance = new Class()
			const child = new Class.child()

			_.instance[`add${Class.child.name}`](child)
			o(child[Class.name.toLowerCase()]).equals(_.instance)
			otherInstance[`add${Class.child.name}`](child)
			o(child[Class.name.toLowerCase()]).equals(otherInstance)
			o(_.instance[Class.child.name.toLowerCase().toPlural()]).deepEquals([])
			o(otherInstance[Class.child.name.toLowerCase().toPlural()]).deepEquals([child])
		})
		o(`.create${Class.child.name}()`, ()=>{
			o(_.instance[Class.child.name.toLowerCase().toPlural()]).deepEquals([])

			const child = _.instance[`create${Class.child.name}`]()
			o(child.constructor).equals(Class.child)
			o(_.instance[Class.child.name.toLowerCase().toPlural()]).deepEquals([child])
			o(child[Class.name.toLowerCase()]).equals(_.instance)
		})
		// o('.removeTable(@table)', ()=>{
		// 	const tableA = _.base.createTable()
		// 	const tableB = _.base.createTable()
		// 	o(_.base.tables).deepEquals([tableA, tableB])
		// 	_.base.removeTable(tableA)
		// 	o(_.base.tables).deepEquals([tableB])
		// 	_.base.removeTable(tableB)
		// 	o(_.base.tables).deepEquals([])

		// 	o(_.base.removeTable(tableB)).equals(false)
		// })
		// o('JSON.stringify(@base)', ()=>{
		// 	_.base.createTable()
		// 	_.base.createTable()

		// 	const json = JSON.parse(JSON.stringify(_.base))
		// 	o(Object.keys(json)).deepEquals(['tables'])
		// 	o(json.tables.length).equals(2)
		// })
	})
}

function specParent(Class){
	o.spec('.parent', ()=>{
		const _ = {}
		_.class = Class
		o.beforeEach(()=>{
			_.instance = new _.class()
			_.parentClass = _.class.parent
		})
		o('new', ()=>{
			const parent = new _.parentClass()
			o(parent.children.get()).deepEquals([])
			o(_.instance.parent).equals(undefined)
		})
		o('.addTo(@parent)', ()=>{
			o(thrownBy(n=>_.instance.addTo('wrong class'))).equals(Error)

			const parent = new _.parentClass()
			
			_.instance.addTo(parent)
			o(parent.children.get()).deepEquals([_.instance])
			o(_.instance.parent).equals(parent)

			const otherParent = new _.parentClass()
			_.instance.addTo(otherParent)
			o(parent.children.get()).deepEquals([])
			o(otherParent.children.get()).deepEquals([_.instance])
			o(_.instance.parent).equals(otherParent)
		})
		o('.removeFromParent()', ()=>{
			const parent = new _.parentClass()

			_.instance.addTo(parent)
			const otherInstance = parent.children.create()
			o(parent.children.get()).deepEquals([_.instance, otherInstance])
			o(_.instance.parent).equals(parent)
			o(otherInstance.parent).equals(parent)

			_.instance.removeFromParent()
			o(parent.children.get()).deepEquals([otherInstance])
			o(_.instance.parent).equals(undefined)
			o(otherInstance.parent).equals(parent)

			otherInstance.removeFromParent()
			o(parent.children.get()).deepEquals([])
			o(_.instance.parent).equals(undefined)
			o(otherInstance.parent).equals(undefined)

			o(_.instance.removeFromParent()).equals(false)
		})
	})
}

o.spec('@base', ()=>{
	specChildren(Base)
})

o.spec('@table', ()=>{
	specChildren(Table)
	specParent(Table)
})

o.spec('@section', ()=>{
	specChildren(Section)
	specParent(Section)
})

o.spec('@row', ()=>{
	specChildren(Row)
	specParent(Row)
})

o.spec('@cell', ()=>{
	specParent(Cell)
})
