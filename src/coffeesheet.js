const CFS_DEFAULT_ROW_CELLS = 5

class Coffeesheet{
	constructor(){
		this.tables = []
		this.createTable()
	}

	get sections(){
		return this.tables.reduce((sections, table)=>{
			sections = sections.concat(table.sections)
			return sections
		}, [])
	}

	createTable(){
		let table = new Table(this)
		this.tables.push(table)
		return table
	}
}

class Table{
	constructor(coffeesheet){
		this.coffeesheet = coffeesheet
		this.sections = []
		this.createSection()
	}
	createSection(){
		let section = new Section(this)
		this.sections.push(section)
		return section
	}
}

class Section{
	constructor(table){
		this.table = table
		this.coffeesheet = table.coffeesheet
		this.rows = []
		// this.columns = []
		this.createRow()
	}
	createRow(){
		let row = new Row(this)
		this.rows.push(row)
		return row
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }
}

class Row{
	constructor(section){
		this.section = section
		this.table = section.table
		this.coffeesheet = section.coffeesheet
		this.cells = []
		for(let i = 0; i < CFS_DEFAULT_ROW_CELLS; i++){
			this.createCell(i)
		}
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
