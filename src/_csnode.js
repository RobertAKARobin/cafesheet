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
String.prototype.toPlural = function(){
	return `${this}s`
}

const CSNode = (function(){

	return class{
		constructor(parent){
			const children = []
			this.getParent = function(){
				return (parent || undefined)
			}
			if(this.childClass){
				this.addChild = function(child){
					children.push(child)
					return child
				}
				this.createChild = function(input){
					let child = new this.childClass(this, input)
					children.push(child)
					return child
				}
				this.getChildren = function(){
					return children.slice()
				}
			}
			this.ancestorClasses.forEach((ancestorClass)=>{
				this[`get${ancestorClass.name}`] = function(){
					return this.getAncestors()[ancestorClass.name.toLowerCase()]
				}
			})
			this.descendantClasses.forEach((descendantClass)=>{
				this[`get${descendantClass.name.toPlural()}`] = function(){
					return this.getDescendants()[descendantClass.name.toLowerCase().toPlural()]
				}
			})
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
	
		get ancestorClasses(){
			return this.class.ancestorClasses
		}
		get childClass(){
			return this.class.childClass
		}
		get class(){
			return this.constructor
		}
		get descendantClasses(){
			return this.class.descendantClasses
		}
		get parentClass(){
			return this.class.parentClass
		}
	
		createSibling(input){
			return this.getParent().createChild(input)
		}
		getAncestors(){
			let ancestors = {}
			const getAncestor = function(child){
				const parent = child.getParent()
				if(parent){
					ancestors[parent.class.name.toLowerCase()] = parent
					getAncestor(parent)
				}
			}
			getAncestor(this)
			return ancestors
		}
		getDescendants(){
			let descendants = {}
			const getDescendants = function(parent){
				if(parent.childClass){
					const className = parent.childClass.name.toLowerCase().toPlural()
					descendants[className] = (descendants[className] || []).concat(parent.getChildren())
					parent.getChildren().forEach(getDescendants)
				}
			}
			getDescendants(this)
			return descendants
		}
		getIndex(){
			return this.getSiblings().indexOf(this)
		}
		getLength(){
			return this.getChildren().length
		}
		getNext(){
			return this.getSiblings()[this.getIndex() + 1]
		}
		getPrevious(){
			return this.getSiblings()[this.getIndex() - 1]
		}
		getSiblings(){
			const parent = this.getParent()
			if(parent){
				return parent.getChildren()
			}else{
				return this.class.getAll()
			}
		}
	}

})()
