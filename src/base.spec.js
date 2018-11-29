o('Base', ()=>{
	o(Base.descendants).deepEquals([Table, Section, Row, Cell])
	o(Base.child).equals(Table)
	o(Base.ancestors).equals(undefined)
	o(Base.parent).equals(undefined)
})
o.spec('@base', ()=>{
	Cafesheet.Spec(Base)
		.addChild()
		.createChild()
		.getChildren()
		.removeChild()

	o('JSON.stringify(@base)', ()=>{
		const instance = new Base()
		instance.createChild()
		instance.createChild()

		const json = JSON.parse(JSON.stringify(instance))
		o(Object.keys(json)).deepEquals(['tables'])
		o(json['tables'].length).equals(2)
	})
})
