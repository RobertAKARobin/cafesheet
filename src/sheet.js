function Sheet(){
	let ids = 0
	const sheet = this
	const all = {}
	all[Table] = {}
	all[Section] = {}
	all[Row] = {}
	all[Cell] = {}

	const generateCreator = function(_Class){
		return function(){
			const instance = new _Class
			const id = ids++
			Object.defineProperties(instance, {
				sheet: {
					value: sheet
				},
				id: {
					value: id,
					enumerable: true
				}
			})
			all[_Class][id] = instance
			return instance
		}
	}
	Object.defineProperties(this, Object.assign({},
		{
			tables: {
				get: ()=>Object.values(all[Table]),
				enumerable: true
			},
			createTable: {
				value: generateCreator(Table)
			},

			sections: {
				get: ()=>Object.values(all[Section]),
				enumerable: true
			},
			createSection: {
				value: generateCreator(Section)
			},

			rows: {
				get: ()=>Object.values(all[Row]),
				enumerable: true
			},
			createRow: {
				value: generateCreator(Row)
			},

			cells: {
				get: ()=>Object.values(all[Cell]),
				enumerable: true
			},
			createCell: {
				value: generateCreator(Cell)
			}
		}
	))
}
Object.defineProperties(Sheet, CafesheetBase.static.generateFamilyTree(Sheet))
