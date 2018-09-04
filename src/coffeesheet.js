const ENV = require('../env')

class CSNode{
	constructor(parent){
		this.class = this.constructor
		this.childType = this.class.childType
		this.parentType = this.class.parentType
		if(this.class.parentType){
			this[this.class.parentType.name.toLowerCase()] = parent
		}
		if(this.class.childType){
			this[`${this.class.childType.name.toLowerCase()}s`] = []
			this[`create${this.class.childType.name}`] = this.add
		}
		this.add()
	}

	add(afterIndex = 0){
		let child = new this.class.childType(this)
		this[`${this.class.childType.name.toLowerCase()}s`].splice(afterIndex, 0, child)
		return child
	}
}

class Coffeesheet extends CSNode{
	static get childType(){
		return Table
	}
}

class Table extends CSNode{
	static get childType(){
		return Section
	}
	static get parentType(){
		return Coffeesheet
	}
}

class Section extends CSNode{
	static get childType(){
		return Row
	}
	static get parentType(){
		return Table
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }
}

class Row extends CSNode{
	static get childType(){
		return Cell
	}
	static get parentType(){
		return Section
	}
	get index(){
		return this.section.rows.indexOf(this)
	}
	get next(){
		return this.section.rows[this.index + 1]
	}
	get previous(){
		return this.section.rows[this.index - 1]
	}
	createCell(datum){
		let cell = new Cell(this, datum)
		this.cells.push(cell)
		return cell
	}
}

// class Column{
// 	constructor(){
// 		this.cells = []
// 	}
// }

class Cell{
	constructor(row, datum){
		this.row = row
		this.section = row.section
		this.table = row.table
		this.coffeesheet = row.coffeesheet
		this.datum = datum
	}
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
