const Row = {
	ancestors: [Section, Table, Base],
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
			pvt.children = Array.from(input.cells)
			// TODO: Detect if raw functions are passed as children
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
