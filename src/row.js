class Row extends CSNode{
	constructor(parent, input = {}){
		super(parent, input)
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

	static get name(){
		return 'Row'
	}
	static get childClass(){
		return Cell
	}
	static get parentClass(){
		return Section
	}

	get width(){
		return this.length
	}

	createCell(){
		return this.createChild.apply(this, arguments)
	}
	createRow(){
		return this.createSibling.apply(this, arguments)
	}
}
