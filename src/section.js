const Section = (function(){

	const allById = {}
	let ids = 0
	return class Section extends CSNode{
		constructor(parent, input = {}){
			super(parent)

			const id = (input.id || `section${ids++}`)
			allById[id] = this
			Object.defineProperty(this, 'id', {get: ()=>id})
			if(input && input.rows){
				input.rows.forEach((row)=>{
					this.createRow(row)
				})
			}else{
				this.createRow()
			}
		}

		static get ancestorClasses(){
			return [Table, Sheet]
		}
		static get descendantClasses(){
			return [Row, Cell]
		}
		static get name(){
			return 'Section'
		}
		static getAll(){
			return Object.values(allById)
		}
		
		// get columns(){
		// 	let columns = []
		// 	for (let i = 0; i < this.width; i++){
		// 		columns.push(new Column(this, i))
		// 	}
		// 	return columns
		// }
		// get width(){
		// 	return this.rows.reduce((maxRowLength, row)=>{
		// 		return (maxRowLength = Math.max(maxRowLength, row.length))
		// 	}, 0)
		// }

		// createColumn(){
		// 	this.rows.forEach((row)=>{
		// 		row.createCell()
		// 	})
		// 	return this.columns[this.width - 1]
		// }
		createRow(){
			return this.createChild.apply(this, arguments)
		}
		createSection(){
			return this.createSibling.apply(this, arguments)
		}
	}
})()
