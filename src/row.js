const Row = {
	ancestors: [Section, Table, Base],
	child: Cell,
	descendants: [Cell],
	name: 'Row',
	parent: Section,
	pluralName: 'rows',

	create(input = {}){
		const row = Object.create(Row.proto)
		const pvt = {
			children: [],
			instance: row,
			parent: undefined
		}
		if(input.cells instanceof Array){
			pvt.children = input.cells.map(Cell.from)
		}
		if(input.parent && input.parent.constructor === Row.parent){
			pvt.parent = input.parent
		}
		Object.assign(row, Row.generateInstanceMethods(pvt))
		Object.freeze(row)
		return row
	}
}
Row.generateInstanceMethods = function(pvt){
	return {
		getChildren: Cafesheet.instance.getChildren(pvt),
		getParent: Cafesheet.instance.getParent(pvt)
	}
}
Row.proto = {
	class: Row,
	empty(){
		this.getChildren().forEach(c=>c.empty())
		return this
	},
	getWidth(){
		return this.getChildren().length
	},
	toJSON(){
		return {
			cells: this.getChildren()
		}
	}
}
Object.freeze(Row)
Object.freeze(Row.proto)
