const ENV = require('../../env')
const CSNode = require('./csnode')

class Coffeesheet extends CSNode{
	constructor(parent){
		super(parent)
		this.createTable()
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

	static get childClass(){
		return Section
	}
	static get parentClass(){
		return Coffeesheet
	}
}

class Section extends CSNode{
	constructor(parent){
		super(parent)
		this.createRow()
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
				columns[index] = (columns[index] || [])
				columns[index].push(cell)
			})
		})
		return columns
	}
}

class Row extends CSNode{
	constructor(parent){
		super(parent)
		for(let i = 0; i < ENV.CFS_DEFAULT_ROW_CELLS; i++){
			this.createCell(i)
		}
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

	static get parentClass(){
		return Row
	}

	get size(){
	}
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
