const Table = (function(){
	
	const allById = {}
	let ids = 0
	return class Table extends CSNode{
		constructor(parent, input = {}){
			super(parent)

			const id = (input.id || `table${ids++}`)
			allById[id] = this
			Object.defineProperty(this, 'id', {
				get: function(){
					return id
				}
			})
			if(input && input.sections){
				input.sections.forEach((section)=>{
					this.createSection(section)
				})
			}else{
				this.createSection()
			}
		}
	
		static get name(){
			return 'Table'
		}
		static get childClass(){
			return Section
		}
		static get parentClass(){
			return Sheet
		}
		static getAll(){
			return Object.values(allById)
		}
	
		createSection(){
			return this.createChild.apply(this, arguments)
		}
		createTable(){
			return this.createSibling.apply(this, arguments)
		}
	}
})()
