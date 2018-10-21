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
	nodeTypes: [Sheet, Table, Section, Row, Cell],
	nodeFactory: {
		generateFamilyTree: function(_Class){
			const Classes = Cafesheet.nodeTypes
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
		}
	}
}
