const Cell = {proto: {}}
Object.defineProperties(Cell, {
	create: {
		value: function(input = {}){
			const cell = Object.create(Cell.proto, {
				datum: {
					enumerable: true,
					value: input.datum,
					writable: true
				}
			})
			return cell
		}
	},
	name: {
		value: 'Cell'
	},
	pluralName: {
		value: 'cells'
	}
})
Object.defineProperties(Cell.proto, {
	class: {
		value: Cell
	},
	empty: {
		value: function(){
			const instance = this
			instance.datum = ''
			return instance
		}
	}
})
Object.freeze(Cell)
Object.freeze(Cell.proto)
