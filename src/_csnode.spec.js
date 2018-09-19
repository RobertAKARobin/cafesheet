const Classes = [Sheet, Table, Section, Row, Cell]

Classes.forEach((Class) => {
	const parentClass = Classes[Classes.indexOf(Class) - 1],
		parentClassName = (parentClass || {}).name,
		childClass = Classes[Classes.indexOf(Class) + 1],
		childClassName = (childClass || {}).name

	o.spec(`${Class.name}`, ()=>{
		let $

		o.beforeEach(()=>{
			$ = {}
			// $.instance = new Class()
		})

		o.spec(`class`, ()=>{
			o(`.parentClass is ${parentClassName}`, ()=>{
				o(Class.parentClass).equals(parentClass)
			})
			o(`.childClass is ${childClassName}`, ()=>{
				o(Class.childClass).equals(childClass)
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
