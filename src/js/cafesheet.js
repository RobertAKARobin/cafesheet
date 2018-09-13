class Cafesheet extends CSNode{
	constructor(parent){
		super(parent)
		this.createTable()
	}

	static get name(){
		return 'Cafesheet'
	}
	static get childClass(){
		return Table
	}
}

class Table extends CSNode{
	constructor(parent){
		super(parent)
		this.createSection()
	}

	static get name(){
		return 'Table'
	}
	static get childClass(){
		return Section
	}
	static get parentClass(){
		return Cafesheet
	}
}

class Section extends CSNode{
	constructor(parent){
		super(parent)
		this.createRow()
	}

	static get name(){
		return 'Section'
	}
	static get childClass(){
		return Row
	}
	static get parentClass(){
		return Table
	}
	
	get columns(){
		let columns = []
		for (let i = 0; i < this.width; i++){
			columns.push(new Column(this, i))
		}
		return columns
	}
	get width(){
		return this.rows.reduce((maxRowLength, row)=>{
			return (maxRowLength = Math.max(maxRowLength, row.length))
		}, 0)
	}

	createColumn(){
		this.rows.forEach((row)=>{
			row.createCell()
		})
		return this.columns[this.width - 1]
	}
}

class Column{
	constructor(parent, index){
		this.parent = parent
		this.index = index
	}

	static get name(){
		return 'Column'
	}

	get cells(){
		return this.parent.rows.map((row)=>{
			return row.cells[this.index]
		})
	}
	get class(){
		return this.constructor
	}

	place(index){
		this.index = index
		this.cells.forEach((cell)=>{
			cell.place(index)
		})
	}
}

class Row extends CSNode{
	constructor(parent){
		super(parent)
		for(let i = 0; i < 5; i++){
			this.createCell(i)
		}
	}

	static get name(){
		return 'Row'
	}
	static get childClass(){
		return Cell
	}
	static get parentClass(){
		return Section
	}
}

class Cell extends CSNode{
	constructor(parent, datum){
		super(parent)
		this.datum = datum
	}

	static get name(){
		return 'Cell'
	}
	static get parentClass(){
		return Row
	}

	get length(){
		return undefined
	}
}
