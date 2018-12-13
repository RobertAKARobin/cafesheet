const Cell = {
	name: 'Cell',
	pluralName: 'cells',
	
	from: function(input = {}){
		const cell = Object.create(Cell.proto, {
			datum: {
				value: input.datum,
				writable: true
			}
		})
		return cell
	}
}
Cell.proto = {
	class: Cell,
	
	empty: function(){
		const instance = this
		instance.datum = ''
		return instance
	},
	toJSON: function(){
		const instance = this
		return JSON.stringify({
			datum: instance.datum
		})
	}
}
Object.freeze(Cell)
Object.freeze(Cell.proto)
