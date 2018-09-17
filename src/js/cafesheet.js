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

	createCafesheet(){
		return this.createSibling.apply(this, arguments)
	}
	createTable(){
		return this.createChild.apply(this, arguments)
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

	createSection(){
		return this.createChild.apply(this, arguments)
	}
	createTable(){
		return this.createSibling.apply(this, arguments)
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
	createRow(){
		return this.createChild.apply(this, arguments)
	}
	createSection(){
		return this.createSibling.apply(this, arguments)
	}
}

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
}

class Row extends CSNode{
	constructor(parent){
		super(parent)
		for(let i = 0; i < $CFS_DEFAULT_ROW_CELLS$; i++){
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

	createCell(){
		return this.createChild.apply(this, arguments)
	}
	createRow(){
		return this.createSibling.apply(this, arguments)
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
