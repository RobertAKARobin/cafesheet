const m = require('mithril')

const CFS_DEFAULT_ROW_CELLS = 5

class Coffeesheet{
	constructor(){
		this.tables = []
		this.createTable()
	}
	createTable(){
		this.tables.push(new Table())
	}

	view(){
		return this.tables.map((table)=>{
			return table.view()
		})
	}
}

class Table{
	constructor(){
		this.sections = []
		this.createSection()
	}
	createSection(){
		this.sections.push(new Section())
	}

	view(){
		return m('table', this.sections.map((section)=>{
			return section.view()
		}))
	}
}

class Section{
	constructor(){
		this.rows = []
		// this.columns = []
		this.createRow()
	}
	createRow(){
		this.rows.push(new Row())
	}
	// createColumn(){
	// 	this.columns.push(new Column())
	// }

	view(){
		return m('tbody', this.rows.map((row)=>{
			return row.view()
		}))
	}
}

class Row{
	constructor(){
		this.cells = []
		for(let i = 0; i < CFS_DEFAULT_ROW_CELLS; i++){
			this.createCell(i)
		}
	}
	createCell(datum){
		this.cells.push(new Cell(datum))
	}

	view(){
		return m('tr', this.cells.map((cell)=>{
			return cell.view()
		}))
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

	view(){
		return m('td', this.datum)
	}
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
