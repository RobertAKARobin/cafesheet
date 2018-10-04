const Table = (function(){
	
	const allById = {}
	let ids = 0
	return class Table extends CSNode{
		constructor(parent, input = {}){
			super(parent)

			const id = (input.id || `table${ids++}`)
			allById[id] = this
			Object.defineProperty(this, 'id', {get: ()=>id})
			if(input && input.sections){
				input.sections.forEach((section)=>{
					this.createSection(section)
				})
			}else{
				this.createSection()
			}
		}
	
		static get ancestorClasses(){
			return [Sheet]
		}
		static get descendantClasses(){
			return [Section, Row, Cell]
		}
		static get name(){
			return 'Table'
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
