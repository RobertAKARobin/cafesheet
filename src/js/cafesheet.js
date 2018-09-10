const ENV = require('../../env')
const CSNode = require('./csnode')

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
		this.rows.forEach((row)=>{
			row.cells.forEach((cell, index)=>{
				columns[index] = (columns[index] || new Column())
				columns[index].push(cell)
			})
		})
		return columns
	}
}

class Column extends Array{
	constructor(parent){
		super()
		this.parent = parent
	}

	static get name(){
		return 'Column'
	}

	get index(){
		return this.parent.columns.indexOf(this)
	}
}

class Row extends CSNode{
	constructor(parent){
		super(parent)
		for(let i = 0; i < ENV.CFS_DEFAULT_ROW_CELLS; i++){
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

module.exports = {
	Cafesheet,
	Table,
	Section,
	Row,
	Cell
}
