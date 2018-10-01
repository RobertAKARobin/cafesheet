class Sheet extends CSNode{
	constructor(input = {}){
		super(null, input)
		if(input && input.tables){
			input.tables.forEach((table)=>{
				this.createTable(table)
			})
		}else{
			this.createTable()
		}
	}

	static get name(){
		return 'Sheet'
	}
	static get childClass(){
		return Table
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
Sheet.allById = {}
