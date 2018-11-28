// o.spec('Array', ()=>{
// 	'use strict'

// 	o('#flat', ()=>{
// 		const a = [['a', 'b'], 'c', ['d', 'e'], 'f']
// 		o(a.flat()).deepEquals(['a', 'b', 'c', 'd', 'e', 'f'])
// 	})
// 	o('#insert', ()=>{
// 		o(['a', 'b', 'c', 'd'].insert('x')).deepEquals(['a', 'b', 'c', 'd', 'x'])
// 		o(['a', 'b', 'c', 'd'].insert('x', 0)).deepEquals(['x', 'a', 'b', 'c', 'd'])
// 		o(['a', 'b', 'c', 'd'].insert('x', 2)).deepEquals(['a', 'b', 'x', 'c', 'd'])
// 		o(['a', 'b', 'c', 'd'].insert('x', 200)).deepEquals(['a', 'b', 'c', 'd', 'x'])
// 		o(['a', 'b', 'c', 'd'].insert('x', Infinity)).deepEquals(['a', 'b', 'c', 'd', 'x'])
// 		o(['a', 'b', 'c', 'd'].insert('x', 'ayy lmao')).deepEquals(['a', 'b', 'c', 'd', 'x'])
// 	})
// 	o('#remove', ()=>{
// 		const target = {v: 'a'}
// 		const a = ['a', 'b', target, 'd']
// 		o(a.remove(target)).equals(target)
// 		o(a).deepEquals(['a', 'b', 'd'])
// 	})
// 	o(`#sortOn`, ()=>{
// 		const a = [{v: 'f'}, {v: 'c'}, {v: 'a'}, {v: '3'}, {v: 2}]
// 		o(a.sortOn(i=>i.v).map(i=>i.v)).deepEquals([2,'3','a','c','f'])
// 	})
// 	o('#without', ()=>{
// 		const a = [1, 2, 'a', 'b', 5]
// 		o(a.without(2)).deepEquals([1, 'a', 'b', 5])
// 	})
// })

function thrownBy(callback){
	try{
		callback()
	}catch(e){
		return e.constructor
	}
}

// o.spec('Family trees', ()=>{
// 	o('Base', ()=>{
// 		o(Base.descendants).deepEquals([Table, Section, Row, Cell])
// 		o(Base.child).equals(Table)
// 		o(Base.ancestors).equals(undefined)
// 		o(Base.parent).equals(undefined)
// 	})
// 	o('Table', ()=>{
// 		o(Table.descendants).deepEquals([Section, Row, Cell])
// 		o(Table.child).equals(Section)
// 		o(Table.ancestors).deepEquals([Base])
// 		o(Table.parent).equals(Base)
// 	})
// 	o('Section', ()=>{
// 		o(Section.descendants).deepEquals([Row, Cell])
// 		o(Section.child).equals(Row)
// 		o(Section.ancestors).deepEquals([Table, Base])
// 		o(Section.parent).equals(Table)
// 	})
// 	o('Row', ()=>{
// 		o(Row.descendants).deepEquals([Cell])
// 		o(Row.child).equals(Cell)
// 		o(Row.ancestors).deepEquals([Section, Table, Base])
// 		o(Row.parent).equals(Section)
// 	})
// 	o('Cell', ()=>{
// 		o(Cell.descendants).deepEquals(undefined)
// 		o(Cell.child).equals(undefined)
// 		o(Cell.ancestors).deepEquals([Row, Section, Table, Base])
// 		o(Cell.parent).equals(Row)
// 	})
// })


Cafesheet.Spec = function(Class){
	const specs = {
		addChild: ()=>o.spec('.addChild', ()=>{
			o('.addChild(@childClass)', ()=>{
				const instance = new Class()
				const childA = new Class.child()
				const childB = new Class.child()

				instance.addChild(childA)
				o(childA.getParent()).equals(instance)
				o(instance.getChildren()).deepEquals([childA])
				instance.addChild(childB)
				o(instance.getChildren()).deepEquals([childA, childB])
			})
			o('.addChild(@childClass, index)', ()=>{
				const instance = new Class()
				const childA = new Class.child()
				const childB = new Class.child()
				const childC = new Class.child()

				instance.addChild(childA, 1)
				o(instance.getChildren()).deepEquals([childA])
				instance.addChild(childB, 1)
				o(instance.getChildren()).deepEquals([childA, childB])
				instance.addChild(childC, 1)
				o(instance.getChildren()).deepEquals([childA, childC, childB])
			})
			o('.addChild()', ()=>{
				const instance = new Class()
				
				o(thrownBy(n=>instance.addChild())).equals(Error)
			})
			o('.addChild(@wrongClass)', ()=>{
				const instance = new Class()
				
				o(thrownBy(n=>instance.addChild({}))).equals(Error)
			})
		}),
		addToParent: ()=>{},
		createChild: ()=>o('.createChild()', ()=>{
			const instance = new Class()
			const childA = instance.createChild()
			const childB = instance.createChild()
			const childC = instance.createChild()

			o(childA.getParent()).equals(instance)
			o(childA.constructor).equals(instance.constructor.child)
			o(instance.getChildren()).deepEquals([childA, childB, childC])
		}),
		getChildren: ()=>o('.getChildren()', ()=>{
			const instance = new Class()

			o(instance.getChildren()).deepEquals([])

			const childA = instance.createChild()
			const childB = instance.createChild()
			const childC = instance.createChild()
			o(instance.getChildren()).deepEquals([childA, childB, childC])
		}),
		getParent: ()=>o('.getParent()', ()=>{
			const parent = new Class.parent()
			const orphan = new Class()
			const child = parent.createChild()

			o(orphan.getParent()).equals(undefined)
			o(child.getParent()).equals(parent)

			parent.addChild(orphan)
			o(orphan.getParent()).equals(parent)
		}),
		removeChild: ()=>o.spec('.removeChild', ()=>{
			o('.removeChild(@child)', ()=>{
				const instance = new Class()
				const childA = instance.createChild()
				const childB = instance.createChild()
	
				instance.removeChild(childA)
				o(instance.getChildren()).deepEquals([childB])
				o(childA.getParent()).equals(undefined)
	
				instance.removeChild(childB)
				o(instance.getChildren()).deepEquals([])
			})
			o('.removeChild(@notChild)', ()=>{
				const instance = new Class()

				o(instance.removeChild({})).equals(false)
			})
			o('.removeChild()', ()=>{
				const instance = new Class()

				o(instance.removeChild()).equals(false)
			})
		}),
		removeFromParent: ()=>o('.removeFromParent()', ()=>{
			const parent = new Class.parent()
			const child = new Class()

			o(child.getParent()).equals(undefined)
			o(child.removeFromParent()).equals(child)

			parent.addChild(child)
			o(parent.getChildren()).deepEquals([child])
			o(child.getParent()).equals(parent)

			o(child.removeFromParent()).equals(child)
			o(parent.getChildren()).deepEquals([])
			o(child.getParent()).equals(undefined)
		})
	}

	const output = {}
	for(let key in specs){
		output[key] = ()=>{
			specs[key]()
			return output
		}
	}
	return output
}

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
		o('.add(@child, index)', ()=>{
			const childA = new _.childClass()
			const childB = new _.childClass()
			const childC = new _.childClass()

			_.instance.children.add(childA, 1)
			o(_.instance.children.get()).deepEquals([childA])
			_.instance.children.add(childB, 1)
			o(_.instance.children.get()).deepEquals([childA, childB])
			_.instance.children.add(childC, 1)
			o(_.instance.children.get()).deepEquals([childA, childC, childB])
		})
		o('.create(), .get()', ()=>{
			const child = _.instance.children.create()

			o(child.constructor).equals(_.childClass)
			o(_.instance.children.get().length).equals(1)
			o(_.instance.children.get()).deepEquals([child])
			o(child.parent).equals(_.instance)
		})
		o('.place(@child, index)', ()=>{
			const childA = _.instance.children.create()
			const childB = _.instance.children.create()
			const childC = _.instance.children.create()
			o(_.instance.children.get()).deepEquals([childA, childB, childC])
			_.instance.children.place(childB)
			o(_.instance.children.get()).deepEquals([childA, childC, childB])
			_.instance.children.place(childB, 0)
			o(_.instance.children.get()).deepEquals([childB, childA, childC])
			_.instance.children.place(childB, 200)
			o(_.instance.children.get()).deepEquals([childA, childC, childB])

			const childD = new _.childClass()
			_.instance.children.place(childD, 1)
			o(_.instance.children.get()).deepEquals([childA, childD, childC, childB])
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
		o(`JSON.stringify(@${Class.name.toLowerCase()})`, ()=>{
			_.instance.children.create()
			_.instance.children.create()

			const json = JSON.parse(JSON.stringify(_.instance))
			o(Object.keys(json)).deepEquals([Class.child.name.toLowerCase().toPlural()])
			o(json[Class.child.name.toLowerCase().toPlural()].length).equals(2)
		})
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
		o('.addTo(@parent, index)', ()=>{
			const parent = new _.parentClass()
			const childA = new _.class()
			const childB = new _.class()
			const childC = new _.class()

			childA.addTo(parent, 1)
			o(childA.siblings.get()).deepEquals([childA])
			childB.addTo(parent, 1)
			o(childB.siblings.get()).deepEquals([childA, childB])
			childC.addTo(parent, 1)
			o(childC.siblings.get()).deepEquals([childA, childC, childB])
		})
		o('.index', ()=>{
			const childA = _.instance
			o(childA.index).equals(-1)

			const parent = new _.parentClass()
			const childB = parent.children.create()
			o(childA.index).equals(-1)
			o(childB.index).equals(0)
			const childC = parent.children.create()
			o(childC.index).equals(1)
			parent.children.add(childA)
			o(childA.index).equals(2)
			o(parent.children.get().map(c => c.index)).deepEquals([0, 1, 2])
		})
		o('.placeAt(index)', ()=>{
			const parent = new _.parentClass()
			const childA = parent.children.create()
			const childB = parent.children.create()
			const childC = parent.children.create()

			childA.placeAt(1)
			o(parent.children.get()).deepEquals([childB, childA, childC])
			childA.placeAt(0)
			o(parent.children.get()).deepEquals([childA, childB, childC])
			childA.placeAt()
			o(parent.children.get()).deepEquals([childB, childC, childA])
		})
		o('.remove()', ()=>{
			const parent = new _.parentClass()

			_.instance.addTo(parent)
			const otherInstance = parent.children.create()
			o(parent.children.get()).deepEquals([_.instance, otherInstance])
			o(_.instance.parent).equals(parent)
			o(otherInstance.parent).equals(parent)

			_.instance.remove()
			o(parent.children.get()).deepEquals([otherInstance])
			o(_.instance.parent).equals(undefined)
			o(otherInstance.parent).equals(parent)

			otherInstance.remove()
			o(parent.children.get()).deepEquals([])
			o(_.instance.parent).equals(undefined)
			o(otherInstance.parent).equals(undefined)

			o(_.instance.remove()).equals(false)
		})
		o('.siblings', ()=>{
			o(_.instance.siblings).equals(false)
			
			const parent = new _.parentClass()
			_.instance.addTo(parent)
			o(_.instance.siblings.get()).deepEquals([_.instance])
			
			const sibling = _.instance.parent.children.create()
			o(_.instance.siblings.get()).deepEquals([_.instance, sibling])
		})
	})
}
