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
				let expected = $ancestorClasses.map(C=>C.name).join(','),
					actual = $Class.ancestorClasses.map(C=>C.name).join(',')
				o(actual).equals(expected)
			})
			o(`.descendantClasses`, ()=>{
				let expected = $descendantClasses.map(C=>C.name).join(','),
					actual = $Class.descendantClasses.map(C=>C.name).join(',')
				o(actual).equals(expected)
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
				_.sheet = new Sheet()
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
				$ancestorClasses.forEach(($ancestorClass, index)=>{
					o(instance.ancestorClasses[index]).equals($ancestorClass)
				})
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
				$descendantClasses.forEach(($descendantClass, index)=>{
					o(instance.descendantClasses[index]).equals($descendantClass)
				})
			})
			o(`.index`, ()=>{

			})
			o(`.length`, ()=>{

			})
			o(`.next`, ()=>{

			})
			o(`.parentClass`, ()=>{
				o(instance.parentClass).equals($parentClass)
			})
			o(`.parent`, ()=>{
				o(instance.parent).equals($parentClass ? _[$parentClass.singularName] : undefined)
			})
			o(`.previous`, ()=>{

			})
			if($parentClass){
				o(`.siblings`, ()=>{
					instance.parent.children.forEach((child)=>{
						o(instance.siblings.includes(child)).equals(true)
					})
				})
			}
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
