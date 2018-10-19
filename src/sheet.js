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
			add: {
				value: function(instance){
					const _Class = instance.constructor
					const allOfClass = all[_Class]
					const id = ids++
					if(!allOfClass){
						throw new Error(`Cannot add items of type ${_Class.name}.`)
					}else{
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
			create: {
				value: function(_Class){
					const allOfClass = all[_Class]
					if(!allOfClass){
						throw new Error(`Cannot create items of type ${_Class.name}`)
					}else{
						const instance = new _Class()
						this.add(instance)
						return instance
					}
				}
			},
			getAll: {
				value: function(_Class){
					return Array.from(all[_Class])
				}
			},
			tables: {
				get: ()=>this.getAll(Table),
				enumerable: true
			}
		}
	))
}
Object.defineProperties(Sheet, CafesheetBase.static.generateFamilyTree(Sheet))
