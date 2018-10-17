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

const CafesheetBase = {
	allObj: function(){
		return {
			ids: 0,
			byId: {}
		}
	},
	staticMethods: {
		getAll: function(all){
			return function(){
				return Object.values(all.byId)
			}
		},
		newWithId: function(all){
			return function(){
				const id = all.ids++
				const _Class = this
				const instance = new _Class(id)
				all.byId[id] = instance
				return instance
			}
		}
	},
	prototypeMethods: {
		createChild: function(input){
			let child = this.childClass.create(input)
			this.addChild(child)
			return child
		},
		createSibling: function(input){
			return this.getParent().createChild(input)
		},
		getAncestors: function(){
			let ancestors = {}
			getAncestor = function(child){
				if (child.parentClass){
					parent = child.getParent()
					ancestors[parent.class.name.toLowerCase()] = parent
					getAncestor(parent)
				}
			}
			getAncestor(this)
			return ancestors
		},
		getDescendants: function(){
			let descendants = {}
			getDescendants = function(parent){
				if (parent.childClass){
					className = parent.childClass.name.toLowerCase().toPlural()
					descendants[className] = (descendants[className] || []).concat(parent.getChildren())
					parent.getChildren().forEach(getDescendants)
				}
			}
			getDescendants(this)
			return descendants
		},
		getIndex: function(){
			return this.getSiblings().indexOf(this)
		},
		getLength: function(){
			return this.getChildren().length
		},
		getNext: function(){
			return this.getSiblings()[this.getIndex() + 1]
		},
		getPrevious: function(){
			return this.getSiblings()[this.getIndex() - 1]
		},
		getSiblings: function(){
			if (this.parentClass){
				parent = this.getParent()
				return parent.getChildren()
			} else {
				return this.class.getAll()
			}
		}
	},
	instanceMethods: {
		addChild: function(children){
			return function(child){
				children.push(child)
				return child
			}
		},
		getChildren: function(children){
			return function(){
				return children.slice()
			}
		}
	}
}
