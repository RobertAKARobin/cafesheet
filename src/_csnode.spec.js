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
	o('.create(Table)', ()=>{
		o(thrownBy(n=>_.sheet.create('new Table()'))).equals(Error)

		o(_.sheet.getAll(Table)).deepEquals([])
		o(_.sheet.tables).deepEquals([])

		const table = _.sheet.create(Table)
		o(table.constructor).equals(Table)
		o(_.sheet.getAll(Table)).deepEquals([table])
		o(_.sheet.tables).deepEquals([table])
		o(table.sheet).equals(_.sheet)
	})
	o('.add(@table)', ()=>{
		o(thrownBy(n=>_.sheet.add('new Table()'))).equals(Error)

		o(_.sheet.getAll(Table).length).equals(0)
		o(_.sheet.tables).deepEquals([])

		const table = new Table()
		o(_.sheet.add(table).constructor).equals(Table)
		o(_.sheet.getAll(Table)).deepEquals([table])
		o(_.sheet.tables).deepEquals([table])
		o(table.sheet).equals(_.sheet)
	})
	o('@othersheet.add(@table)', ()=>{
		const otherSheet = new Sheet()
		const table = new Table()

		_.sheet.add(table)
		o(table.sheet).equals(_.sheet)
		otherSheet.add(table)
		o(table.sheet).equals(otherSheet)
		o(_.sheet.tables).deepEquals([])
		o(otherSheet.tables).deepEquals([table])
	})
	o('.remove(@table)', ()=>{
		const tableA = _.sheet.create(Table)
		const tableB = _.sheet.create(Table)
		o(_.sheet.tables).deepEquals([tableA, tableB])
		_.sheet.remove(tableA)
		o(_.sheet.tables).deepEquals([tableB])
		_.sheet.remove(tableB)
		o(_.sheet.tables).deepEquals([])

		const otherSheet = new Sheet()
		otherSheet.add(tableA)
		o(_.sheet.tables).deepEquals([])
		o(otherSheet.tables).deepEquals([tableA])
	})
	o('JSON.stringify(@sheet)', ()=>{
		_.sheet.create(Table)
		_.sheet.create(Table)

		const json = JSON.parse(JSON.stringify(_.sheet))
		o(Object.keys(json)).deepEquals(['tables'])
		o(json.tables.length).equals(2)
	})
	o.spec('.tables', ()=>{
		o('.create()', ()=>{
			const table = _.sheet.tables.create()

			o(table.constructor).equals(Table)
			o(_.sheet.getAll(Table)).deepEquals([table])
			o(_.sheet.tables).deepEquals([table])
			o(table.sheet).equals(_.sheet)
		})
		o('.add(@table)', ()=>{

		})
		o('@othersheet.tables.add(@table)', ()=>{

		})
		o('@othersheet.tables.remove(@table)', ()=>{

		})
	})
})


// $Classes.forEach(($Class) => {
// 	'use strict'
	
// 	const $parentClass = $Classes[$Classes.indexOf($Class) - 1],
// 		$childClass = $Classes[$Classes.indexOf($Class) + 1],
// 		$ancestorClasses = $Classes.slice(0, $Classes.indexOf($Class)).reverse(),
// 		$descendantClasses = $Classes.slice($Classes.indexOf($Class) + 1)

// 	o.spec(`${$Class.name}`, ()=>{
// 		let _ = {}

// 		o.spec(`class`, ()=>{
// 			o(`.ancestorClasses`, ()=>{
// 				o($Class.ancestorClasses).deepEquals($ancestorClasses)
// 			})
// 			o(`.childClass`, ()=>{
// 				o($Class.childClass).equals($childClass)
// 			})
// 			o(`.descendantClasses`, ()=>{
// 				o($Class.descendantClasses).deepEquals($descendantClasses)
// 			})
// 			o(`.parentClass`, ()=>{
// 				o($Class.parentClass).equals($parentClass)
// 			})
// 		})

// 		o.spec(`instance`, ()=>{
// 			let instance

// 			o.beforeEach(()=>{
// 				_ = {}
// 				_.sheet = new Sheet(CSData)
// 				_.table = _.sheet.getTables()[0]
// 				_.section = _.table.getSections()[0]
// 				_.row = _.section.getRows()[0]
// 				_.cell = _.row.getCells()[0]
// 				instance = _[$Class.name.toLowerCase()]
// 			})

// 			// Getters
// 			o(`.ancestorClasses`, ()=>{
// 				o(instance.ancestorClasses).deepEquals($ancestorClasses)
// 			})
// 			o(`.childClass`, ()=>{
// 				o(instance.childClass).equals($childClass)
// 			})
// 			o(`.class`, ()=>{
// 				o(instance.class).equals($Class)
// 			})
// 			o(`.descendantClasses`, ()=>{
// 				o(instance.descendantClasses).deepEquals($descendantClasses)
// 			})
// 			o(`.parentClass`, ()=>{
// 				o(instance.parentClass).equals($parentClass)
// 			})

// 			// Methods
// 			o(`.createChild()`, ()=>{
// 				if($Class.childClass){
// 					const originalChildren = instance.getChildren()
// 					const child = instance.createChild()
// 					o(instance.getChildren().length).equals(originalChildren.length + 1)
// 					o(child.getParent()).equals(instance)
// 				}else{
// 					let error
// 					try{
// 						instance.createChild()
// 					}catch(e){
// 						error = e
// 					}finally{
// 						o(!!error).equals(true)
// 					}
// 				}
// 			})
// 			o(`.createSibling()`, ()=>{
// 				const originalAllOfClass = $Class.getAll()
// 				const originalSiblings = instance.getSiblings()
// 				const newSibling = instance.createSibling()
// 				o($Class.getAll().sortOn(i=>i.id)).deepEquals(originalAllOfClass.concat([newSibling]).sortOn(i=>i.id))
// 				o(instance.getSiblings().sortOn(i=>i.id)).deepEquals(originalSiblings.concat([newSibling]).sortOn(i=>i.id))
// 			})
// 			if($childClass){
// 				o(`.create${$childClass.name}`, ()=>{
// 					const originalChildren = instance.getChildren()
// 					const child = instance[`create${$childClass.name}`]()
// 					o(instance.getChildren().length).equals(originalChildren.length + 1)
// 					o(child.getParent()).equals(instance)
// 				})
// 			}
// 			o(`.getAncestors()`, ()=>{
// 				$ancestorClasses.forEach(($ancestorClass)=>{
// 					let ancestorName = $ancestorClass.name.toLowerCase()
// 					o(instance.getAncestors()[ancestorName]).equals(_[ancestorName])
// 				})
// 			})
// 			o(`.getDescendants()`, ()=>{
// 				$descendantClasses.forEach(($descendantClass)=>{
// 					let $descendants = $descendantClass.getAll().filter(($descendant)=>{
// 						return ($descendant[`get${$Class.name}`]() == instance)
// 					})
// 					o(instance.getDescendants()[$descendantClass.name.toLowerCase().toPlural()]).deepEquals($descendants)
// 				})
// 			})
// 			o(`.getIndex()`, ()=>{
// 				o(instance.getIndex()).equals(0)
// 			})
// 			o(`.getLength()`, ()=>{
// 				const originalLength = instance.getLength()
// 				if($childClass){
// 					instance.createChild()
// 					o(instance.getLength()).equals(originalLength + 1)
// 					o(instance.getLength()).equals($childClass.getAll().filter(i=>(i.getParent() == instance)).length)
// 				}else{
// 					o(instance.getLength()).equals(undefined)
// 				}
// 			})
// 			o(`.getNext()`, ()=>{
// 				const $allOfClass = $Class.getAll()
// 				if($parentClass){
// 					o(instance.getNext()).equals(_[$parentClass.name.toLowerCase()].getChildren()[1])
// 				}else{
// 					o(instance.getNext()).equals($allOfClass[$allOfClass.indexOf(instance) + 1])
// 				}
// 			})
// 			o(`.getParent()`, ()=>{
// 				if($parentClass){
// 					o(instance.getParent()).equals($parentClass ? _[$parentClass.name.toLowerCase()] : undefined)
// 				}else{
// 					o(instance.getParent).equals(undefined)
// 				}
// 			})
// 			o(`.getPrevious()`, ()=>{
// 				if($parentClass && instance.getSiblings().length > 1){
// 					o(_[$parentClass.name.toLowerCase()].getChildren()[1].getPrevious()).equals(instance)
// 				}else{
// 					o(instance.getPrevious()).equals(undefined)
// 				}
// 			})
// 			o(`.getSiblings()`, ()=>{
// 				let $siblings = $Class.getAll()
// 				if($parentClass){
// 					$siblings = $siblings.filter(($item)=>{
// 						return ($item.getParent() == instance.getParent())
// 					})
// 				}
// 				o(instance.getSiblings()).deepEquals($siblings)
// 			})
// 			$ancestorClasses.forEach(($ancestorClass)=>{
// 				o(`${$Class.name}.get${$ancestorClass.name}()`, ()=>{
// 					o(instance[`get${$ancestorClass.name}`]()).equals(_[$ancestorClass.name.toLowerCase()])
// 				})
// 			})
// 			$descendantClasses.forEach(($descendantClass)=>{
// 				o(`${$Class.name}.get${$descendantClass.name.toPlural()}()`, ()=>{
// 					let $descendants = $descendantClass.getAll().filter(($descendant)=>{
// 						return($descendant[`get${$Class.name}`]() == instance)
// 					})
// 					o(instance[`get${$descendantClass.name.toPlural()}`]()).deepEquals($descendants)
// 				})
// 			})
// 		})
// 	})

// })
