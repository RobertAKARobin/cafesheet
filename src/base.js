function Base(){
	const base = this
	const tables = []
	Object.defineProperties(base, {
		addTable: Cafesheet.instanceMethods.addChild(base, tables),
		removeTable: Cafesheet.instanceMethods.removeChild(base, tables),
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
	addChild: {
		get: function(){
			return this.addTable
		}
	},
	createChild: Cafesheet.prototypeMethods.createChild,
	createTable: Cafesheet.prototypeMethods.createChild,
	removeChild: {
		get: function(){
			return this.removeTable
		}
	}
})
