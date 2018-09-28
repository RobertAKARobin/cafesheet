class Column{
	constructor(parent, index){
		this.parent = parent
		this.index = index
		this.cells = this.parent.rows.map((row)=>{
			return row.cells[this.index]
		})
	}

	static get name(){
		return 'Column'
	}

	get class(){
		return this.constructor
	}

	createColumn(){
		this.parent.createColumn().place(this.index + 1)
	}
	place(index){
		this.index = index
		this.cells.forEach((cell)=>{
			cell.place(index)
		})
	}
	remove(){
		this.cells.forEach((cell)=>{
			cell.remove()
		})
	}
}
Column.allById = {}
