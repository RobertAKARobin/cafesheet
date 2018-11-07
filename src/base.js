function Base(){
	const instance = this
	const children = []

	const all = new Map()
	all.set(Table, new Set())
	all.set(Section, new Set())
	all.set(Row, new Set())
	all.set(Cell, new Set())

	Object.defineProperties(instance, {
		all: {
			get: function(){
				return {
					tables: Array.from(all.get(Table)),
					sections: Array.from(all.get(Section)),
					rows: Array.from(all.get(Row)),
					cells: Array.from(all.get(Cell))
				}
			}
		},
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
