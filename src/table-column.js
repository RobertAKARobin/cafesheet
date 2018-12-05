function TableColumn(input = {}){
	const instance = this
	const pvt = {
		parent: (input.parent || undefined),
		place: (isNaN(input.place) ? -1 : input.place),
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
	new: {
		value: function(input){
			return new TableColumn(input)
		}
	}
})
