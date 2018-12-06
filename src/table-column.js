function TableColumn(input = {}){
	const instance = this
	const pvt = {
		parent: undefined,
		place: -1,
		instance
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

	if(input.place && isNaN(input.place)){
		throw new Error(`'${input.place}' is not a valid TableColumn place.`)
	}else if(input.place === undefined || input.place === null){
		pvt.place = -1
	}else{
		pvt.place = input.place
	}
	if(input.parent){
		if(input.parent instanceof TableColumn.parent){
			pvt.parent = input.parent
		}else{
			throw new Error(`TableColumn parent must be a ${TableColumn.parent.name}.`)
		}
	}
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
	}
})
Object.defineProperties(TableColumn, {
	get: {
		value: function(input){
			return new TableColumn(input)
		}
	},
	new: {
		value: Cafesheet.class.new(TableColumn)
	},
	parent: {
		value: Table
	}
})
