const CFS_DEFAULT_ROW_CELLS = 5

class Coffeesheet{
	constructor(){
		this.tables = []
		this.createTable()
	}
	createTable(){
		let table = new Table()
		table.coffeesheet = this
		this.tables.push(table)
		return table
	}
}

class Table{
	constructor(){
		this.sections = []
		this.createSection()
	}
	createSection(){
		let section = new Section()
		section.table = this
		section.coffeesheet = this.coffeesheet
		this.sections.push(section)
		return section
	}
}

class Section{
	constructor(){
		this.rows = []
		// this.columns = []
		this.createRow()
	}
	createRow(){
		let row = new Row()
		row.section = this
		row.table = this.table
		row.coffeesheet = this.coffeesheet
		this.rows.push(row)
		return row
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }
}

class Row{
	constructor(){
		this.cells = []
		for(let i = 0; i < CFS_DEFAULT_ROW_CELLS; i++){
			this.createCell(i)
		}
	}
	createCell(datum){
		let cell = new Cell(datum)
		cell.row = this
		cell.section = this.section
		cell.table = this.table
		cell.coffeesheet = this.coffeesheet
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
	constructor(datum){
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
