const ENV = require('../env')

class CSNode{
	constructor(parent){
		if(parent){
			this.parent = parent
			for(let key in this.ancestors){
				this[key] = this.ancestors[key]
			}
		}
		if(this.childClass){
			this[this.childClass.pluralName] = []
			this[`create${this.childClass.name}`] = this.createChild
			for(let key in this.descendants){
				this[key] = this.descendants[key]
			}
		}
	}
	
	static get singularName(){
		return `${this.name.toLowerCase()}`
	}
	static get pluralName(){
		return `${this.name.toLowerCase()}s`
	}

	get ancestors(){
		let ancestors = {}
		let getAncestor = function(child){
			if(child.parent){
				ancestors[child.parentClass.singularName] = child.parent
				getAncestor(child.parent)
			}
		}
		getAncestor(this)
		return ancestors
	}
	get children(){
		if(this.childClass){
			return this[this.childClass.pluralName]
		}
	}
	get childClass(){
		return this.class.childClass
	}
	get class(){
		return this.constructor
	}
	get descendants(){
		let descendants = {}
		let getDescendants = function(parent){
			if(parent.children){
				descendants[parent.childClass.pluralName] = (descendants[parent.childClass.pluralName] || []).concat(parent.children)
				parent.children.forEach(getDescendants)
			}
		}
		getDescendants(this)
		return descendants
	}
	get index(){
		return this.siblings.indexOf(this)
	}
	get next(){
		return this.siblings[this.index + 1]
	}
	get parentClass(){
		return this.class.parentClass
	}
	get previous(){
		return this.siblings[this.index - 1]
	}
	get siblings(){
		if(this.parent){
			return this.parent.children
		}
	}

	createChild(options){
		let child = new this.childClass(this, options)
		this.children.push(child)
		return child
	}
}

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
