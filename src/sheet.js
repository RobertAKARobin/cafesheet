function Sheet(){
	const sheet = this
	Object.defineProperties(sheet, {
		children: {
			value: []
		},
		tables: {
			get: ()=>Array.from(sheet.children),
			enumerable: true
		}
	})
}
Object.defineProperties(Sheet, {
	child: {
		value: Table,
		enumerable: true
	},
	descendants: {
		value: [Table, Section, Row, Cell]
	}
})
Object.defineProperties(Sheet.prototype, {
	addChild: Cafesheet.prototypeMethods.addChild,
	addTable: Cafesheet.prototypeMethods.addChild,
	createChild: Cafesheet.prototypeMethods.createChild,
	createTable: Cafesheet.prototypeMethods.createChild,
	removeChild: Cafesheet.prototypeMethods.removeChild,
	removeTable: Cafesheet.prototypeMethods.removeChild
})
