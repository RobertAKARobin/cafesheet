function Base(){
	const base = this
	Object.defineProperties(base, {
		children: {
			value: []
		},
		tables: {
			get: ()=>Array.from(base.children),
			enumerable: true
		}
	})
}
Object.defineProperties(Base, {
	child: {
		value: Table,
		enumerable: true
	},
	descendants: {
		value: [Table, Section, Row, Cell]
	}
})
Object.defineProperties(Base.prototype, {
	addChild: Cafesheet.prototypeMethods.addChild,
	addTable: Cafesheet.prototypeMethods.addChild,
	createChild: Cafesheet.prototypeMethods.createChild,
	createTable: Cafesheet.prototypeMethods.createChild,
	removeChild: Cafesheet.prototypeMethods.removeChild,
	removeTable: Cafesheet.prototypeMethods.removeChild
})
