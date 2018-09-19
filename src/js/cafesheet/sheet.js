class Sheet extends CSNode{
	constructor(parent){
		super(parent)
		this.createTable()
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
	createTable(){
		return this.createChild.apply(this, arguments)
	}
}
