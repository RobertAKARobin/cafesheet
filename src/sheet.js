const Sheet = (function(){

	const allById = {}
	let ids = 0
	return class Sheet extends CSNode{
		constructor(input = {}){
			super(null)

			const id = (input.id || `sheet${ids++}`)
			allById[id] = this
			Object.defineProperty(this, 'id', {get: ()=>id})
			if(input && input.tables){
				input.tables.forEach((table)=>{
					this.createTable(table)
				})
			}else{
				this.createTable()
			}
		}

		static get ancestorClasses(){
			return []
		}
		static get descendantClasses(){
			return [Table, Section, Row, Cell]
		}
		static get name(){
			return 'Sheet'
		}
		static getAll(){
			return Object.values(allById)
		}
	
		createSheet(){
			return this.createSibling.apply(this, arguments)
		}
		createSibling(){
			return new Sheet()
		}
		createTable(){
			return this.createChild.apply(this, arguments)
		}
	}
})()
