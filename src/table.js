class Table extends CSNode{
	constructor(parent, input = {}){
		super(parent, input)
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

	createSection(){
		return this.createChild.apply(this, arguments)
	}
	createTable(){
		return this.createSibling.apply(this, arguments)
	}
}
