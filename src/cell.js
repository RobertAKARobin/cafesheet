const Cell = {proto: {}}
Object.defineProperties(Cell, {
	from: {
		value: function(input = {}){
			const cell = Object.create(Cell.proto, {
				datum: {
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
	},
	toJSON: {
		value: function(){
			const instance = this
			return JSON.stringify({
				datum: instance.datum
			})
		}
	}
})
Object.freeze(Cell)
Object.freeze(Cell.proto)
