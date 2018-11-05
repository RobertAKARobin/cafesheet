function Base(){
	const base = this
	Object.defineProperties(base, {
		children: {
			get: ()=>base.tables
		},
		tables: {
			value: new WeakArray(base),
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
