function Table(base){
	const instance = this
	const parentWrapper = {parent: (base || {})}
	Object.defineProperties(instance, {
		base: {
			get: ()=>instance.parent
		},
		parent: {
			get: ()=>parentWrapper.parent
		},

		addTo: {
			value: function(parent){
				if(parent instanceof instance.constructor.parent){
					parentWrapper.parent = parent
				}else{
					throw new Error(`Cannot move ${instance.constructor.name} to ${parent.constructor.name}.`)
				}
			}
		}
	})
}
Object.defineProperties(Table, {
	ancestors: {
		value: [Base]
	},
	child: {
		value: Section,
		enumerable: true
	},
	descendants: {
		value: [Section, Row, Cell]
	},
	parent: {
		value: Base
	}
})
