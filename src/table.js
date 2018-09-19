class Table extends CSNode{
	constructor(parent){
		super(parent)
		this.createSection()
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

	createSection(){
		return this.createChild.apply(this, arguments)
	}
	createTable(){
		return this.createSibling.apply(this, arguments)
	}
}
