function Sheet(){
	let ids = 0
	const sheet = this
	const all = {
		[Table]: new Set(),
		[Section]: new Set(),
		[Row]: new Set(),
		[Cell]: new Set
	}
	Object.defineProperties(this, Object.assign({},
		{
			addTable: {
				value: function(instance){
					const _Class = instance.constructor
					const allOfClass = all[_Class]
					const id = ids++
					if(!allOfClass){
						throw new Error(`Cannot add items of type ${_Class.name}.`)
					}else{
						if(instance.sheet && instance.sheet !== this){
							instance.sheet.removeTable(instance)
						}
						Object.defineProperties(instance, {
							sheet: {
								value: sheet,
								writable: true
							},
							id: {
								value: id,
								enumerable: true
							}
						})
						allOfClass.add(instance)
						return instance
					}
				}
			},
			createTable: {
				value: function(){
					const _Class = Table
					const instance = new _Class()
					this.addTable(instance)
					return instance
				}
			},
			removeTable: {
				value: function(instance){
					const _Class = instance.constructor
					const allOfClass = all[_Class]
					if(!allOfClass){
						throw new Error(`No items exist of type ${_Class.name}`)
					}else{
						return allOfClass.delete(instance)
					}
				}
			},
			tables: {
				get: ()=>Array.from(all[Table]),
				enumerable: true
			}
		}
	))
}
Object.defineProperties(Sheet, {
	child: {
		value: Table,
		enumerable: true
	},
	descendants: {
		value: [Table, Section, Row, Cell]
	}
})
