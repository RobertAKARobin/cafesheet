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

const Cafesheet = {
	classTypes: [Base, Table, Section, Row, Cell],
	instanceMethods: {
		add: function(instanceChildren){
			return function(child){
				const instance = this
				if(child instanceof instance.constructor.child){
					const instanceHasChild = (instanceChildren.includes(child))
					const childHasInstance = (child.parent === instance)
					if(instanceHasChild && childHasInstance){
						return false
					}else{
						if(!instanceHasChild){
							instanceChildren.push(child)
						}
						if(!childHasInstance){
							child.addTo(instance)
						}
						return child
					}
				}else{
					throw new Error(`Cannot add ${child.constructor.name} to ${instance.constructor.name}.`)
				}
			}
		},
		addTo: function(instanceParentWrapper){
			return function(parent){
				const instance = this
				if(parent instanceof instance.constructor.parent){
					const instanceHasParent = (instance.parent && instance.parent == parent)
					const parentHasInstance = (parent.children.includes(instance))
					if(instanceHasParent && parentHasInstance){
						return false
					}else{
						if(!instanceHasParent){
							instanceParentWrapper.parent = parent
						}
						if(!parentHasInstance){
							parent.add(instance)
						}
						return instance
					}
				}else{
					throw new Error(`Cannot move ${instance.constructor.name} to ${parent.constructor.name}.`)
				}
			}
		},
		remove: function(instanceChildren){
			return function(child){
				const instance = this
				const instanceHasChild = (instance.children.includes(child))
				if(instanceHasChild){
					instanceChildren.remove(child)
					child.removeFromParent()
				}else{
					return false
				}
			}
		},
		removeFromParent: function(parentWrapper){
			return function(){
				const instance = this
				const currentParent = instance.parent
				if(currentParent){
					parentWrapper.parent = undefined
					currentParent.remove(instance)
				}else{
					return false
				}
			}
		}
	},
	prototypeMethods: {
		create: function(){
			const instance = this
			const childClass = instance.constructor.child
			const child = new childClass()
			instance.add(child)
			return child
		}
	}
}
