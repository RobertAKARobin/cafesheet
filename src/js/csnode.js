let ids = 0
class CSNode{
	constructor(parent){
		this.id = ids++
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
			this[`create${this.childClass.name}`] = this.createChild
			this[`create${this.class.name}`] = this.createSibling
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
		let getNextGeneration = function(childClass){
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
		let getNextGeneration = function(parentClass){
			if(parentClass.childClass){
				descendantClasses.push(parentClass.childClass)
				getNextGeneration(parentClass.childClass)
			}
		}
		getNextGeneration(this)
		return descendantClasses
	}
	static get pluralName(){
		return `${this.name.toLowerCase()}s`
	}
	static get singularName(){
		return `${this.name.toLowerCase()}`
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
		let getDescendants = function(parent){
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
	get length(){
		return this.children.length
	}

	createChild(options){
		let child = new this.childClass(this, options)
		this.children.push(child)
		return child
	}
	createSibling(options){
		return this.parent.createChild(options).place(this.index + 1)
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
