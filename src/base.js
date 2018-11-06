function Base(){
	const instance = this
	const children = []
	Object.defineProperties(instance, {
		add: Cafesheet.instanceMethods.add(children),
		children: {
			get: ()=>instance.tables
		},
		remove: Cafesheet.instanceMethods.remove(children),
		tables: {
			get: ()=>Array.from(children),
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
