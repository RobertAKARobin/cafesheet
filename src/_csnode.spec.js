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

			})
			o(`.descendantClasses`, ()=>{
				o(instance.descendantClasses).deepEquals($descendantClasses)
			})
			o(`.index`, ()=>{
				o(instance.index).equals($parentClass ? 0 : -1)
			})
			o(`.length`, ()=>{

			})
			o(`.next`, ()=>{
				if($parentClass && instance.parent.children.length > 1){
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
				if($parentClass && instance.parent.children.length > 1){
					o(_[$parentClass.singularName].children[1].previous).equals(instance)
				}else{
					o(instance.previous).equals(undefined)
				}
			})
			o(`.siblings`, ()=>{
				const $siblings = Object.values($Class.allById).filter(($item)=>{
					return ($item != instance && $item.parent == instance.parent)
				})
				o(instance.siblings).deepEquals($siblings)
			})
			o(`.width`, ()=>{

			})

			if($parentClass){
				o(`.${$parentClass.singularName}`, ()=>{
					o(instance.parent).equals(_[$parentClass.singularName])
				})
			}
			$ancestorClasses.forEach(($ancestorClass)=>{
				let ancestorName = $ancestorClass.singularName
				o(`${$Class.singularName}.${ancestorName}`, ()=>{
					o(instance[ancestorName]).equals(_[ancestorName])
				})
			})
			if($childClass){
				o(`.${$childClass.singularName}`, ()=>{

				})
			}
			$descendantClasses.forEach((descendantClass)=>{
				o(`.${descendantClass}`, ()=>{

				})
			})

			o(`#createChild`, ()=>{

			})
			o(`#createSiblings`, ()=>{

			})
			o(`#place`, ()=>{

			})
			o(`#remove`, ()=>{

			})
		})
	})

})
