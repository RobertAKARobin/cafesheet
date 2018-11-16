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
	},
	capitalize: {
		value: function(){
			return `${this.substring(0,1).toUpperCase()}${this.substring(1)}`
		}
	}
})

const Cafesheet = {
	childCollection: function ChildCollection(parent){
		const instance = this
		const Class = parent.constructor.child
		const children = []

		Object.defineProperties(instance, {
			class: {
				value: Class
			},
			parent: {
				value: parent
			},

			add: {
				value: function(child){
					if(child instanceof Class){
						if(!children.includes(child)){
							children.push(child)
							child.addTo(parent)
							return child
						}
					}else{
						throw new Error(`Cannot add ${child.constructor.name} to ${Class.name}.`)
					}
				}
			},
			get: {
				value: function(){
					return Array.from(children)
				}
			},
			create: {
				value: function(input){
					const child = new Class(parent, input)
					children.push(child)
					return child
				}
			},
			remove: {
				value: function(child){
					if(children.includes(child)){
						children.remove(child)
						child.removeFromParent()
					}else{
						return false
					}
				}
			}
		})
	},
	instanceMethods: {
		addToParent: function(instance, pvt){
			return function(targetParent){
				if(targetParent instanceof instance.constructor.parent){
					if(pvt.parent != targetParent){
						if(pvt.parent){
							pvt.parent.children.remove(instance)
						}
						pvt.parent = targetParent
						targetParent.children.add(instance)
					}
				}else{
					throw new Error(`Cannot move ${instance.constructor.name} to ${targetParent.constructor.name}.`)
				}
			}
		},
		removeFromParent: function(instance, pvt){
			return function(){
				if(pvt.parent){
					pvt.parent.children.remove(instance)
					pvt.parent = undefined
				}else{
					return false
				}
			}
		}
	}
}
