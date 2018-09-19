const Classes = [Sheet, Table, Section, Row, Cell]

Classes.forEach((Class) => {
	const parentClass = Classes[Classes.indexOf(Class) - 1],
		childClass = Classes[Classes.indexOf(Class) + 1],
		ancestorClasses = Classes.slice(0, Classes.indexOf(Class)).reverse(),
		descendantClasses = Classes.slice(Classes.indexOf(Class) + 1)

	o.spec(`${Class.name}`, ()=>{
		let $

		o.beforeEach(()=>{
			$ = {}
			// $.instance = new Class()
		})

		o.spec(`class`, ()=>{
			o(`.parentClass`, ()=>{
				o(Class.parentClass).equals(parentClass)
			})
			o(`.childClass`, ()=>{
				o(Class.childClass).equals(childClass)
			})
			o(`.ancestorClasses`, ()=>{
				let expected = ancestorClasses.map(C=>C.name).join(','),
					actual = Class.ancestorClasses.map(C=>C.name).join(',')
				o(actual).equals(expected)
			})
			o(`.descendantClasses`, ()=>{
				let expected = descendantClasses.map(C=>C.name).join(','),
					actual = Class.descendantClasses.map(C=>C.name).join(',')
				o(actual).equals(expected)
			})
		})

		o.spec(`instance`, ()=>{
			// o(`.class is ${Class.name}`, ()=>{
			// 	o($.instance.class).equals(Class)
			// })
			// o(`.parentClass is ${parentClassName}`, ()=>{
			// 	o($.instance.parentClass).equals(parentClass)
			// })
			// o(`.childClass is ${childClassName}`, ()=>{
			// 	o($.instance.childClass).equals(childClass)
			// })
		})
	})

})
