class Section extends CSNode{
	constructor(parent){
		super(parent)
		this.createRow()
	}

	static get name(){
		return 'Section'
	}
	static get childClass(){
		return Row
	}
	static get parentClass(){
		return Table
	}
	
	get columns(){
		let columns = []
		for (let i = 0; i < this.width; i++){
			columns.push(new Column(this, i))
		}
		return columns
	}
	get width(){
		return this.rows.reduce((maxRowLength, row)=>{
			return (maxRowLength = Math.max(maxRowLength, row.length))
		}, 0)
	}

	createColumn(){
		this.rows.forEach((row)=>{
			row.createCell()
		})
		return this.columns[this.width - 1]
	}
	createRow(){
		return this.createChild.apply(this, arguments)
	}
	createSection(){
		return this.createSibling.apply(this, arguments)
	}
}
