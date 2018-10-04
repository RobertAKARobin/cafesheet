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

const $Classes = [Sheet, Table, Section, Row, Cell]
$Classes.forEach(($Class) => {
	'use strict'
	
	const $parentClass = $Classes[$Classes.indexOf($Class) - 1],
		$childClass = $Classes[$Classes.indexOf($Class) + 1],
		$ancestorClasses = $Classes.slice(0, $Classes.indexOf($Class)).reverse(),
		$descendantClasses = $Classes.slice($Classes.indexOf($Class) + 1)

	o.spec(`${$Class.name}`, ()=>{
		let _ = {}

		o.spec(`class`, ()=>{
			o(`.parentClass`, ()=>{
				o($Class.parentClass).equals($parentClass)
			})
			o(`.childClass`, ()=>{
				o($Class.childClass).equals($childClass)
			})
			o(`.ancestorClasses`, ()=>{
				o($Class.ancestorClasses).deepEquals($ancestorClasses)
			})
			o(`.descendantClasses`, ()=>{
				o($Class.descendantClasses).deepEquals($descendantClasses)
			})
		})

		o.spec(`instance`, ()=>{
			let instance

			o.beforeEach(()=>{
				_ = {}
				_.sheet = new Sheet(CSData)
				_.table = _.sheet.getTables()[0]
				_.section = _.table.getSections()[0]
				_.row = _.section.getRows()[0]
				_.cell = _.row.getCells()[0]
				instance = _[$Class.name.toLowerCase()]
			})

			o(`.getAncestors()`, ()=>{
				$ancestorClasses.forEach(($ancestorClass)=>{
					let ancestorName = $ancestorClass.name.toLowerCase()
					o(instance.getAncestors()[ancestorName]).equals(_[ancestorName])
				})
			})
			o(`.ancestorClasses`, ()=>{
				o(instance.ancestorClasses).deepEquals($ancestorClasses)
			})
			o(`.childClass`, ()=>{
				o(instance.childClass).equals($childClass)
			})
			o(`.class`, ()=>{
				o(instance.class).equals($Class)
			})
			o(`.getDescendants()`, ()=>{
				$descendantClasses.forEach(($descendantClass)=>{
					let $descendants = $descendantClass.getAll().filter(($descendant)=>{
						return ($descendant[`get${$Class.name}`]() == instance)
					})
					o(instance.getDescendants()[$descendantClass.name.toLowerCase().toPlural()]).deepEquals($descendants)
				})
			})
			o(`.descendantClasses`, ()=>{
				o(instance.descendantClasses).deepEquals($descendantClasses)
			})
			o(`.getIndex()`, ()=>{
				o(instance.getIndex()).equals(0)
			})
			o(`.getLength()`, ()=>{
				const originalLength = instance.getLength()
				if($childClass){
					instance.createChild()
					o(instance.getLength()).equals(originalLength + 1)
					o(instance.getLength()).equals($childClass.getAll().filter(i=>(i.getParent() == instance)).length)
				}else{
					o(instance.getLength()).equals(undefined)
				}
			})
			o(`.getNext()`, ()=>{
				if($parentClass && instance.getSiblings().length > 1){
					o(instance.getNext()).equals(_[$parentClass.name.toLowerCase()].getChildren()[1])
				}else{
					o(instance.getNext()).equals(undefined)
				}
			})
			o(`.parentClass`, ()=>{
				o(instance.parentClass).equals($parentClass)
			})
			o(`.getParent()`, ()=>{
				o(instance.getParent()).equals($parentClass ? _[$parentClass.name.toLowerCase()] : undefined)
			})
			o(`.getPrevious()`, ()=>{
				if($parentClass && instance.getSiblings().length > 1){
					o(_[$parentClass.name.toLowerCase()].getChildren()[1].getPrevious()).equals(instance)
				}else{
					o(instance.getPrevious()).equals(undefined)
				}
			})
			o(`.getSiblings()`, ()=>{
				const $siblings = $Class.getAll().filter(($item)=>{
					return ($item.getParent() == instance.getParent())
				})
				o(instance.getSiblings()).deepEquals($siblings)
			})

			$ancestorClasses.forEach(($ancestorClass)=>{
				o(`${$Class.name}.get${$ancestorClass.name}()`, ()=>{
					o(instance[`get${$ancestorClass.name}`]()).equals(_[$ancestorClass.name.toLowerCase()])
				})
			})
			$descendantClasses.forEach(($descendantClass)=>{
				o(`${$Class.name}.get${$descendantClass.name.toPlural()}()`, ()=>{
					let $descendants = $descendantClass.getAll().filter(($descendant)=>{
						return($descendant[`get${$Class.name}`]() == instance)
					})
					o(instance[`get${$descendantClass.name.toPlural()}`]()).deepEquals($descendants)
				})
			})

			o(`#createChild`, ()=>{
				if($Class.childClass){
					const originalChildren = instance.getChildren()
					const child = instance.createChild()
					o(instance.getChildren().length).equals(originalChildren.length + 1)
					o(child.getParent()).equals(instance)
				}else{
					let error
					try{
						instance.createChild()
					}catch(e){
						error = e
					}finally{
						o(!!error).equals(true)
					}
				}
			})
			if($childClass){
				o(`#create${$childClass.name}`, ()=>{
					const originalChildren = instance.getChildren()
					const child = instance[`create${$childClass.name}`]()
					o(instance.getChildren().length).equals(originalChildren.length + 1)
					o(child.getParent()).equals(instance)
				})
			}
			o(`#createSibling`, ()=>{
				const originalAllOfClass = $Class.getAll()
				const originalSiblings = instance.getSiblings()
				const newSibling = instance.createSibling()
				o($Class.getAll().sortOn(i=>i.id)).deepEquals(originalAllOfClass.concat([newSibling]).sortOn(i=>i.id))
				o(instance.getSiblings().sortOn(i=>i.id)).deepEquals(originalSiblings.concat([newSibling]).sortOn(i=>i.id))
			})
			o(`#place`, ()=>{

			})
			o(`#remove`, ()=>{

			})
		})
	})

})
