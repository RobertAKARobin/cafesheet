const ENV = require('../env')

class CSNode{
	constructor(parent, options){
		this.class = this.constructor
		this.childType = this.class.childType
		this.parentType = this.class.parentType
		if(this.class.parentType){
			this.parent = parent
			this.siblings = parent.children
			this[this.class.parentType.name.toLowerCase()] = parent
		}
		if(this.class.childType){
			this.children = new CSSiblings(this)
			this[`${this.class.childType.name.toLowerCase()}s`] = this.children
		}
		this.onCreate(options)
		
		let ancestors = []
		let child = this
		let ancestor
		while(true){
			ancestor = child.parent
			if(!ancestor){
				break
			}else{
				ancestors.push(ancestor)
				this[ancestor.class.name.toLowerCase()] = ancestor
				child = ancestor
			}
		}
	}

	get descendants(){
		let descendants = {}
		let getDescendants = function(parent){
			let children = parent.children
			if(!children){
				return
			}else{
				let childClassName = `${children.class.name.toLowerCase()}s`
				descendants[childClassName] = (descendants[childClassName] || []).concat(children)
				children.forEach(getDescendants)
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
	get previous(){
		return this.siblings[this.index - 1]
	}

	onCreate(){
		this.children.add()
	}
}

class CSSiblings extends Array{
	constructor(parent){
		super()
		this.parent = parent
		this.class = parent.childType
	}

	add(options){
		let child = new this.class(this.parent, options)
		this.push(child)
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

	onCreate(){
		for(let i = 0; i < ENV.CFS_DEFAULT_ROW_CELLS; i++){
			this.children.add(i)
		}
	}
}

// class Column{
// 	constructor(){
// 		this.cells = []
// 	}
// }

class Cell extends CSNode{
	static get parentType(){
		return Row
	}

	onCreate(options){
		this.datum = options
	}
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
