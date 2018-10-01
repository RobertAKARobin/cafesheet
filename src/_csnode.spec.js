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
			o(`.singularName`, ()=>{
				o($Class.singularName).equals(`${$Class.name.toLowerCase()}`)
			})
			o(`.pluralName`, ()=>{
				o($Class.pluralName).equals(`${$Class.name.toLowerCase()}s`)
			})
		})

		o.spec(`instance`, ()=>{
			let instance

			o.beforeEach(()=>{
				_ = {}
				_.sheet = new Sheet(CSData)
				_.table = _.sheet.tables[0]
				_.section = _.table.sections[0]
				_.row = _.section.rows[0]
				_.cell = _.row.cells[0]
				instance = _[$Class.singularName]
			})

			o(`.ancestors`, ()=>{
				$ancestorClasses.forEach(($ancestorClass)=>{
					let ancestorName = $ancestorClass.singularName
					o(instance.ancestors[ancestorName]).equals(_[ancestorName])
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
			o(`.descendants`, ()=>{
				$descendantClasses.forEach(($descendantClass)=>{
					let $descendants = $descendantClass.all.filter(($descendant)=>{
						return($descendant[$Class.singularName] == instance)
					})
					o(instance.descendants[$descendantClass.pluralName]).deepEquals($descendants)
				})
			})
			o(`.descendantClasses`, ()=>{
				o(instance.descendantClasses).deepEquals($descendantClasses)
			})
			o(`.index`, ()=>{
				o(instance.index).equals(0)
			})
			o(`.length`, ()=>{

			})
			o(`.next`, ()=>{
				if($parentClass && instance.siblings.length > 1){
					o(instance.next).equals(_[$parentClass.singularName].children[1])
				}else{
					o(instance.next).equals(undefined)
				}
			})
			o(`.parentClass`, ()=>{
				o(instance.parentClass).equals($parentClass)
			})
			o(`.parent`, ()=>{
				o(instance.parent).equals($parentClass ? _[$parentClass.singularName] : undefined)
			})
			o(`.previous`, ()=>{
				if($parentClass && instance.siblings.length > 1){
					o(_[$parentClass.singularName].children[1].previous).equals(instance)
				}else{
					o(instance.previous).equals(undefined)
				}
			})
			o(`.siblings`, ()=>{
				const $siblings = $Class.all.filter(($item)=>{
					return ($item.parent == instance.parent)
				})
				o(instance.siblings).deepEquals($siblings)
			})
			o(`.width`, ()=>{

			})

			$ancestorClasses.forEach(($ancestorClass)=>{
				let ancestorName = $ancestorClass.singularName
				o(`${$Class.singularName}.${ancestorName}`, ()=>{
					o(instance[ancestorName]).equals(_[ancestorName])
				})
			})
			$descendantClasses.forEach(($descendantClass)=>{
				o(`${$Class.singularName}.${$descendantClass.pluralName}`, ()=>{
					let $descendants = $descendantClass.all.filter(($descendant)=>{
						return($descendant[$Class.singularName] == instance)
					})
					o(instance[$descendantClass.pluralName]).deepEquals($descendants)
				})
			})

			o(`#createChild`, ()=>{
				if($Class.childClass){
					const originalNumberOfChildren = instance.children.length
					const child = instance.createChild()
					o(instance.children.length).equals(originalNumberOfChildren + 1)
					o(child.parent).equals(instance)
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
					const originalNumberOfChildren = instance.children.length
					const child = instance[`create${$childClass.name}`]()
					o(instance.children.length).equals(originalNumberOfChildren + 1)
					o(child.parent).equals(instance)
				})
			}
			o(`#createSiblings`, ()=>{
				const originalAllOfClass = $Class.all
				const originalSiblings = instance.siblings
				const newSibling = instance.createSibling()
				o($Class.all.sortOn(i=>i.id)).deepEquals(originalAllOfClass.concat([newSibling]).sortOn(i=>i.id))
				o(instance.siblings.sortOn(i=>i.id)).deepEquals(originalSiblings.concat([newSibling]).sortOn(i=>i.id))
			})
			o(`#place`, ()=>{

			})
			o(`#remove`, ()=>{

			})
		})
	})

})
