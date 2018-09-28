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
			this.children = []
			this.descendantClasses.forEach((descendantClass)=>{
				Object.defineProperty(this, descendantClass.pluralName, {
					get: function(){
						return this.descendants[descendantClass.pluralName]
					}
				})
			})
		}
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
				descendants[parent.childClass.pluralName] = (descendants[parent.childClass.pluralName] || []).concat(parent.children)
				parent.children.forEach(getDescendants)
			}
		}
		getDescendants(this)
		return descendants
	}
	get descendantClasses(){
		return this.class.descendantClasses
	}
	get index(){
		if(this.parent){
			return this.parent.children.indexOf(this)
		}else{
			return -1
		}
	}
	get next(){
		if(this.parent){
			return this.parent.children[this.parent.children.indexOf(this) + 1]
		}else{
			return undefined
		}
	}
	get parentClass(){
		return this.class.parentClass
	}
	get previous(){
		if(this.parent){
			return this.parent.children[this.parent.children.indexOf(this) - 1]
		}else{
			return undefined
		}
	}
	get siblings(){
		if(this.parent){
			return this.parent.children.filter(child => child != this)
		}else{
			return []
		}
	}
	get length(){
		return this.children.length
	}

	createChild(input){
		let child = new this.childClass(this, input)
		this.children.push(child)
		return child
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
