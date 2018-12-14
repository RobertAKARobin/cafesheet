const Cell = {
	name: 'Cell',
	pluralName: 'cells',
	
	from(input = {}){
		const cell = Object.create(Cell.proto)
		const pvt = {
			data: input.data
		}
		Object.assign(cell, Cell.generateInstanceMethods(pvt))
		Object.freeze(cell)
		return cell
	}
}
Cell.generateInstanceMethods = function(pvt){
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
		return {
			data: this.getData()
		}
	}
}
Object.freeze(Cell)
Object.freeze(Cell.proto)
