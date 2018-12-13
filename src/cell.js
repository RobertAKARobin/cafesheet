const Cell = {
	name: 'Cell',
	pluralName: 'cells',
	
	from(input = {}){
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

	empty(){
		const instance = this
		instance.datum = ''
		return instance
	},
	toJSON(){
		const instance = this
		return JSON.stringify({
			datum: instance.datum
		})
	}
}
Object.freeze(Cell)
Object.freeze(Cell.proto)
