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

class WeakArray extends Array{
	constructor(parent){
		super()
		this.parent = parent
	}
	create(){
		const childClass = this.parent.constructor.child
		const child = new childClass()
		this.push(child)
		return child
	}
	push(child){
		if(child instanceof this.parent.constructor.child){
			if(child.parent && child.parent !== this.parent){
				child.parent.children.remove(child)
			}
			Object.defineProperties(child, {
				parent: {
					value: this.parent
				}
			})
			// child.id = instance.ids++
			Array.prototype.push.call(this, child)
			return child
		}else{
			throw new Error(`Cannot add items of type ${child.constructor.name}.`)
		}
	}
	remove(child){
		if(child instanceof this.parent.constructor.child){
			return Array.prototype.remove.call(this, child)
		}else{
			throw new Error(`No items exist of type ${child.constructor.name}`)
		}
	}
}
