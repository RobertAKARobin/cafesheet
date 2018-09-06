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
	// createColumn(){
	// 	this.columns.push(new Column())
	// }
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

// class Column{
// 	constructor(){
// 		this.cells = []
// 	}
// }

class Cell extends CSNode{
	constructor(parent, datum){
		super(parent)
		this.datum = datum
	}

	static get parentClass(){
		return Row
	}
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
