class Coffeesheet{
	constructor(){
		this.tables = []
	}
}

class Table{
	constructor(){
		this.sections = []
	}
}

class Section{
	constructor(){
		this.rows = []
		this.columns = []
	}
}

class Row{
	constructor(){
		this.cells = []
	}
}

class Column{
	constructor(){
		this.cells = []
	}
}

module.exports = Coffeesheet
