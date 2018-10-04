const Cell = (function(){

	const allById = {}
	let ids = 0
	return class Cell extends CSNode{
		constructor(parent, input = {}){
			super(parent)

			const id = (input.id || `cell${ids++}`)
			allById[id] = this
			Object.defineProperty(this, 'id', {get: ()=>id})
			if(input && input.datum){
				this.datum = input.datum
			}else{
				this.datum = input
			}
		}
	
		static get ancestorClasses(){
			return [Row, Section, Table, Sheet]
		}
		static get descendantClasses(){
			return []
		}
		static get name(){
			return 'Cell'
		}
		static getAll(){
			return Object.values(allById)
		}
	
		createChild(){
			throw new Error('Cells have no children.')
		}
		getLength(){
			return undefined
		}
	}
})()
