Object.defineProperties(Array.prototype, {
	remove: {
		value: function(item){
			this.splice(this.indexOf(item), 1)
			return item
		}
	},
	sortOn: {
		value: function(callback){
			return this.sort((a,b)=>{
				const valueA = callback(a).toString()
				const valueB = callback(b).toString()
				if(valueA > valueB) return 1
				else if(valueA < valueB) return -1
				else return 0
			})
		}
	},
	without: {
		value: function(item){
			const index = this.indexOf(item)
			return this.slice(0,index).concat(this.slice(index + 1))
		}
	}
})
Object.defineProperties(String.prototype, {
	toPlural: {
		value: function(){
			return `${this}s`
		}
	}
})

const CafesheetBase = {
	classes: [Sheet, Table, Section, Row, Cell],
	static: {
		generateFamilyTree: function(_Class){
			const Classes = CafesheetBase.classes
			const index = Classes.indexOf(_Class)
			const tree = {}
			if(index > 0){
				tree.ancestors = {
					value: Classes.slice(0, index).reverse()
				}
				tree.parent = {
					value: tree.ancestors.value[0]
				}
			}
			if(index < Classes.length - 1){
				tree.descendants = {
					value: Classes.slice(index + 1)
				}
				tree.child = {
					value: tree.descendants.value[0]
				}
			}
			return tree
		},
		generateIdProperties: function(){
			const all = {
				ids: 0,
				byId: {}
			}
			return {
				getAll: {
					value: function(){
						return Object.values(all.byId)
					}
				},
				new: {
					value: function(){
						const id = all.ids++
						const _Class = this
						const instance = new _Class(id)
						all.byId[id] = instance
						return instance
					}
				}
			}
		}
	},
	prototype: {
		ancestorProperties: {
			createSibling: {
				value: function(input){
					return this.getParent().createChild(input)
				}
			},
			getAncestors: {
				value: function(){
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
				}
			},
			getIndex: {
				value: function(){
					return this.getSiblings().indexOf(this)
				}
			},
			getNext: {
				value: function(){
					return this.getSiblings()[this.getIndex() + 1]
				}
			},
			getPrevious: {
				value: function(){
					return this.getSiblings()[this.getIndex() - 1]
				}
			},
			getSiblings: {
				value: function(){
					if (this.parentClass){
						parent = this.getParent()
						return parent.getChildren()
					} else {
						return this.class.getAll()
					}
				}
			}
		},
		descendantProperties: {
			createChild: {
				value: function(input){
					let child = this.childClass.create(input)
					this.addChild(child)
					return child
				}
			},
			getDescendants: {
				value: function(){
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
				}
			},
			getLength: {
				value: function(){
					return this.getChildren().length
				}
			}
		}
	},
	instance: {
		generateIdProperties: function(id){
			return {
				id: {
					value: id,
					enumerable: true
				}
			}
		},
		generateChildProperties: function(){
			const children = []
			return {
				addChild: {
					value: function(child){
						children.push(child)
						return child
					}
				},
				getChildren: {
					value: function(){
						return children.slice()
					}
				}
			}
		}
	}
}
