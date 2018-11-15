function Table(base){
	const instance = this
	const parentWrapper = {parent: (base || undefined)}
	Object.defineProperties(instance, {
		base: {
			get: ()=>instance.parent
		},
		parent: {
			get: ()=>parentWrapper.parent
		},

		addTo: {
			value: function(targetParent){
				if(targetParent instanceof instance.constructor.parent){
					if(parentWrapper.parent != targetParent){
						if(parentWrapper.parent){
							parentWrapper.parent.children.remove(instance)
						}
						parentWrapper.parent = targetParent
						targetParent.children.add(instance)
					}
				}else{
					throw new Error(`Cannot move ${instance.constructor.name} to ${targetParent.constructor.name}.`)
				}
			}
		},
		removeFromParent: {
			value: function(){
				if(parentWrapper.parent){
					parentWrapper.parent.children.remove(instance)
					parentWrapper.parent = undefined
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
