o('Base', ()=>{
	o(Base.descendants).deepEquals([Table, Section, Row, Cell])
	o(Base.child).equals(Table)
	o(Base.ancestors).equals(undefined)
	o(Base.parent).equals(undefined)
})
o.spec('@base', ()=>{
	Cafesheet.Spec(Base)
		.createChild()
		.getChildren()
		.empty()
		.placeChild()
		.removeChild()
		.scan()
	
	o('.scan($Descendant)', ()=>{
		const $ = {}
		$.Base = Base.create()
		$.Table = $.Base.tables
		$.Section = $.Table.map(t=>t.sections).flat()
		$.Row = $.Section.map(s=>s.rows).flat()
		$.Cell = $.Row.map(r=>r.cells).flat()

		const instance = $.Base
		o(instance.scan(Base)).deepEquals(instance)
		o(instance.scan(Table)).deepEquals($.Table)
		o(instance.scan(Section)).deepEquals($.Section)
		o(instance.scan(Row)).deepEquals($.Row)
		o(instance.scan(Cell)).deepEquals($.Cell)
	})
})
