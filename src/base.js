function Base(){
	const base = this
	const tables = []
	Object.defineProperties(base, {
		add: Cafesheet.instanceMethods.add(base, tables),
		remove: Cafesheet.instanceMethods.remove(base, tables),
		tables: {
			get: ()=>Array.from(tables),
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
	create: Cafesheet.prototypeMethods.create
})
