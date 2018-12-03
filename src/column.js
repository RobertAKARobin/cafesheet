function Column(input = {}){
	const instance = this
	const pvt = {
		cells: [],
		parent: undefined,
		instance
	}

	Object.defineProperties(instance, {
		addToParent: {
			value: (targetParent)=>{
				if(targetParent.constructor == pvt.parent.constructor){
					// pvt.parent = targetParent
					// targetParent.addColumn(instance)
					return instance
				}else{
					throw new Error()
				}
			}
		},
		getParent: {
			value: ()=>{
				return pvt.parent
			}
		},
		removeFromParent: {
			value: ()=>{
				if(pvt.parent){
					// pvt.parent.removeColumn(instance)
					// pvt.parent = undefined
				}
				return instance
			}
		}
	})

	Object.defineProperties(instance, {
		cells: {
			enumerable: true,
			get: ()=>Array.from(pvt.cells)
		},
		place: {
			enumerable: true,
			get: instance.getPlace
		}
	})

	if(input.cells){
		pvt.cells = input.cells.map(cell=>{
			if(cell.constructor != Cell){
				throw new Error(`Column can contain only Cells.`)
			}else{
				return cell
			}
		})
	}
	if(input.parent){
		if([Section, Table].includes(input.parent.constructor)){
			pvt.parent = input.parent
		}else{
			throw new Error()
		}
	}
}
Object.defineProperties(Column.prototype, {
	empty: {
		value: ()=>{}
	},
	getPlace: {
		value: ()=>{}
	},
	getSiblings: {
		value: ()=>{}
	},
	placeAt: {
		value: ()=>{}
	}
})
Object.defineProperties(Column, {
	new: {
		value: function(input){
			return new Column(input)
		}
	}
})
