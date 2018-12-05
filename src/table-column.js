function TableColumn(input = {}){
	const instance = this
	const pvt = {
		parent: undefined,
		place: -1,
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
			get: instance.getCells
		},
		place: {
			enumerable: true,
			get: ()=>pvt.place
		}
	})
}
Object.defineProperties(TableColumn.prototype, {
	empty: {
		value: ()=>{}
	},
	getCells: {
		value: ()=>{

		}
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
Object.defineProperties(TableColumn, {
	new: {
		value: function(input){
			return new TableColumn(input)
		}
	}
})
