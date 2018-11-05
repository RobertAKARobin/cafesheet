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
		add: function(instance, children){
			return {
				value: function(child){
					if(child instanceof instance.constructor.child){
						if(child.parent && child.parent !== this){
							child.parent.remove(child)
						}
						Object.defineProperties(child, {
							parent: {
								value: instance
							}
						})
						// child.id = instance.ids++
						children.push(child)
						return child
					}else{
						throw new Error(`Cannot add items of type ${child.constructor.name}.`)
					}
				}
			}
		},
		remove: function(instance, children){
			return {
				value: function(child){
					if(child instanceof instance.constructor.child){
						return children.remove(child)
					}else{
						throw new Error(`No items exist of type ${child.constructor.name}`)
					}
				}
			}
		}
	},
	prototypeMethods: {
		create: {
			value: function(){
				const instance = this
				const childClass = instance.constructor.child
				const child = new childClass()
				instance.add(child)
				return child
			}
		}
	}
}
