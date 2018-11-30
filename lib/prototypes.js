Object.defineProperties(Array.prototype, {
	flat: {
		value: function(){
			return this.reduce((aggregate, item)=>{
				if(item instanceof Array){
					aggregate = aggregate.concat(item)
				}else{
					aggregate.push(item)
				}
				return aggregate
			}, [])
		}
	},
	insert: {
		value: function(item, index){
			if(isNaN(index)){
				if(index){
					throw new TypeError('Index must be a number')
				}else{
					index = this.length
				}
			}
			this.splice(index, 0, item)
			return this
		}
	},
	place: {
		value: function(item, index){
			if(index && isNaN(index)){
				throw new TypeError('Index must be a number')
			}else{
				if(this.includes(item)){
					this.remove(item)
				}
				this.insert(item, index)
				return this
			}
		}
	},
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
Object.defineProperties(Number.prototype, {
	times: {
		value: function(input){
			if(input instanceof Function){
				let i = 0
				for(; i < this; i++){
					input()
				}
				return this
			}else{
				return this * input
			}
		}
	}
})
