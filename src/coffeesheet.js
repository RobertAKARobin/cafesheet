const CFS_DEFAULT_ROW_CELLS = 5

class Coffeesheet{
	constructor(){
		this.tables = []
		createTable()
	}
	createTable(){
		this.tables.push(new Table())
	}
}

class Table{
	constructor(){
		this.sections = []
		createSection()
	}
	createSection(){
		this.tables.push(new Section())
	}
}

class Section{
	constructor(){
		this.rows = []
		// this.columns = []
		createRow()
	}
	createRow(){
		this.rows.push(new Row())
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }
}

class Row{
	constructor(){
		this.cells = []
		for(let i = 0; i < CFS_DEFAULT_ROW_CELLS; i++){
			createCell(i)
		}
	}
	createCell(datum){
		this.cells.push(new Cell(datum))
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

module.exports = Coffeesheet
