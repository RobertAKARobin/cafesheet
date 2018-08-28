const CFS_DEFAULT_ROW_CELLS = 5

class Coffeesheet{
	constructor(){
		this.tables = []
		this.createTable()
	}
	createTable(){
		let table = new Table()
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
