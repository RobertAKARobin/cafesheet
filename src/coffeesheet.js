const ENV = require('../env')

class CSNode{
	constructor(parent){
		this[this.parentType.name.toLowerCase()] = parent
		this[`${this.childType.name.toLowerCase()}s`] = []
		this[`create${this.childType.name}`] = this.add
		this.add()
	}

	add(afterIndex = 0){
		let child = new this.childType(this)
		this[`${this.childType.name.toLowerCase()}s`].splice(afterIndex, 0, child)
		return child
	}
}

class Coffeesheet extends CSNode{
	get childType(){
		return Table
	}
	get parentType(){
		return Coffeesheet
	}
}

class Table extends CSNode{
	get childType(){
		return Section
	}
	get parentType(){
		return Coffeesheet
	}
}

class Section extends CSNode{
	get childType(){
		return Row
	}
	get parentType(){
		return Table
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }
}

class Row extends CSNode{
	get childType(){
		return Cell
	}
	get parentType(){
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
