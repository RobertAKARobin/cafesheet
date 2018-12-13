const Cell = {
	name: 'Cell',
	pluralName: 'cells',
	
	from(input = {}){
		const pvt = {
			data: input.data
		}
		const cell = Object.create(Cell.proto)
		Object.assign(cell, Cell.instance(pvt))
		Object.freeze(cell)
		return cell
	}
}
Cell.instance = function(pvt){
	return {
		getData(){
			return pvt.data
		},

		setData(data){
			pvt.data = data
			return this
		}
	}
}
Cell.proto = {
	class: Cell,

	empty(){
		this.setData('')
		return this
	},
	toJSON(){
		return JSON.stringify({
			data: this.getData()
		})
	}
}
Object.freeze(Cell)
Object.freeze(Cell.proto)
