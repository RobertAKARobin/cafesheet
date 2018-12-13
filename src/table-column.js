function TableColumn(input = {}){
	const instance = this
	const pvt = {
		parent: undefined,
		place: -1,
		instance
	}

	function setPlace(place){
		if(place && isNaN(place)){
			throw new Error(`'${place}' is not a valid TableColumn place.`)
		}else if(place === undefined || place === null){
			pvt.place = -1
		}else{
			pvt.place = input.place
		}
	}
	function setParent(parent){
		if(parent){
			if(parent instanceof TableColumn.parent){
				pvt.parent = parent
			}else{
				throw new Error(`${parent ? parent.constructor.name : parent} cannot be TableColumn parent.`)
			}
		}
	}
	Object.defineProperties(instance, {
		getParent: {
			value: Cafesheet.instance.getParent(pvt)
		}
	})

	Object.defineProperties(instance, {
		cells: {
			enumerable: true,
			get: instance.getCells
		},
		place: {
			enumerable: true,
			get: ()=>pvt.place
		}
	})
	setPlace(input.place)
	setParent(input.parent)
}
Object.defineProperties(TableColumn.prototype, {
	getCells: {
		value: function(){
			const instance = this
			const parent = instance.getParent()
			if(parent){
				return parent.scanFor(Cell).filter(cell => cell.getPlace() === instance.place)
			}else{
				return []
			}
		}
	},
	removeFromParent: {
		value: function(){
			const instance = this
			instance.getCells().forEach(cell=>{
				cell.removeFromParent()
			})
			return instance
		}
	}
})
Object.defineProperties(TableColumn, {
	get: {
		value: function(input){
			return new TableColumn(input)
			// TODO: Add public .setPlace and .setParent methods
		}
	},
	new: {
		value: ()=>new TableColumn()
	},
	parent: {
		get: ()=>Table
	}
})
