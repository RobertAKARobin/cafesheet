function Base(){
	const instance = this
	const children = []
	const all = {}
	all[Table] = {}
	Object.defineProperties(instance, {
		children: {
			get: ()=>instance.tables
		},
		tables: {
			get: ()=>Array.from(children),
			enumerable: true
		},

		add: {
			value: Cafesheet.instanceMethods.add(children)
		},
		remove: {
			value: Cafesheet.instanceMethods.remove(children)
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
	create: {
		value: Cafesheet.prototypeMethods.create
	}
})
