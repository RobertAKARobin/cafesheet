const Row = (function(){

	const allById = {}
	let ids = 0
	return class Row extends CSNode{
		constructor(parent, input = {}){
			super(parent)

			const id = (input.id || `row${ids++}`)
			allById[id] = this
			Object.defineProperty(this, 'id', {get: ()=>id})
			if(input && input.cells){
				input.cells.forEach((cell)=>{
					this.createCell(cell)
				})
			}else{
				for(let i = 0; i < (parent.width || $CFS_DEFAULT_ROW_CELLS$); i++){
					this.createCell(i)
				}
			}
		}

		static get ancestorClasses(){
			return [Section, Table, Sheet]
		}
		static get descendantClasses(){
			return [Cell]
		}
		static get name(){
			return 'Row'
		}
		static getAll(){
			return Object.values(allById)
		}

		createCell(){
			return this.createChild.apply(this, arguments)
		}
		createRow(){
			return this.createSibling.apply(this, arguments)
		}
	}
})()
