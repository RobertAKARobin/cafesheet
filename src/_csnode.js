Array.prototype.sortOn = function(callback){
	return this.sort((a,b)=>{
		const valueA = callback(a).toString()
		const valueB = callback(b).toString()
		if(valueA > valueB) return 1
		else if(valueA < valueB) return -1
		else return 0
	})
}
Array.prototype.without = function(item){
	const index = this.indexOf(item)
	return this.slice(0,index).concat(this.slice(index + 1))
}
Array.prototype.remove = function(item){
	this.splice(this.indexOf(item), 1)
	return item
}

let ids = 0
class CSNode{
	constructor(parent, input = {}){
		this.id = (input.id || ids++)
		this.class.allById[this.id] = this
		if(parent){
			this.parent = parent
			this.ancestorClasses.forEach((ancestorClass)=>{
				Object.defineProperty(this, ancestorClass.singularName, {
					get: function(){
						return this.ancestors[ancestorClass.singularName]
					}
				})
			})
		}
		if(this.childClass){
			const children = []
			this.getChildren = function(){
				return children.slice()
			}
			this.createChild = function(input){
				let child = new this.childClass(this, input)
				children.push(child)
				return child
			}
			this.descendantClasses.forEach((descendantClass)=>{
				Object.defineProperty(this, descendantClass.pluralName, {
					get: function(){
						return this.descendants[descendantClass.pluralName]
					}
				})
			})
		}
	}

	static get all(){
		return Object.values(this.allById)
	}
	
	static get ancestorClasses(){
		let ancestorClasses = []
		const getNextGeneration = function(childClass){
			if(childClass.parentClass){
				ancestorClasses.push(childClass.parentClass)
				getNextGeneration(childClass.parentClass)
			}
		}
		getNextGeneration(this)
		return ancestorClasses
	}
	static get descendantClasses(){
		let descendantClasses = []
		const getNextGeneration = function(parentClass){
			if(parentClass.childClass){
				descendantClasses.push(parentClass.childClass)
				getNextGeneration(parentClass.childClass)
			}
		}
		getNextGeneration(this)
		return descendantClasses
	}
	static get pluralName(){
		return `${this.singularName}s`
	}
	static get singularName(){
		return `${this.name.toLowerCase()}`
	}

	get ancestors(){
		let ancestors = {}
		const getAncestor = function(child){
			if(child.parent){
				ancestors[child.parentClass.singularName] = child.parent
				getAncestor(child.parent)
			}
		}
		getAncestor(this)
		return ancestors
	}
	get ancestorClasses(){
		return this.class.ancestorClasses
	}
	get childClass(){
		return this.class.childClass
	}
	get class(){
		return this.constructor
	}
	get descendants(){
		let descendants = {}
		const getDescendants = function(parent){
			if(parent.childClass){
				descendants[parent.childClass.pluralName] = (descendants[parent.childClass.pluralName] || []).concat(parent.getChildren())
				parent.getChildren().forEach(getDescendants)
			}
		}
		getDescendants(this)
		return descendants
	}
	get descendantClasses(){
		return this.class.descendantClasses
	}
	get index(){
		return this.siblings.indexOf(this)
	}
	get length(){
		return this.getChildren().length
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
		return this.parent.getChildren()
	}

	createSibling(input){
		return this.parent.createChild(input).place(this.index + 1)
	}
	place(index){
		this.remove()
		this.siblings.splice(index, 0, this)
		return this
	}
	remove(){
		this.siblings.splice(this.index, 1)
		return this
	}
}
