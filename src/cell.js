class Cell extends CSNode{
	constructor(parent, input = {}){
		super(parent, input)
		if(input && input.datum){
			this.datum = input.datum
		}else{
			this.datum = input
		}
	}

	static get name(){
		return 'Cell'
	}
	static get parentClass(){
		return Row
	}

	get length(){
		return undefined
	}
}
