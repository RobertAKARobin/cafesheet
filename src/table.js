function Table(base){
	const instance = this
	let parent = (base || undefined)
	Object.defineProperties(instance, {
		base: {
			get: ()=>parent
		},
		parent: {
			get: ()=>parent
		},

		addTo: {
			value: function(targetParent){
				if(targetParent instanceof instance.constructor.parent){
					if(parent != targetParent){
						if(parent){
							parent.children.remove(instance)
						}
						parent = targetParent
						targetParent.children.add(instance)
					}
				}else{
					throw new Error(`Cannot move ${instance.constructor.name} to ${targetParent.constructor.name}.`)
				}
			}
		},
		removeFromParent: {
			value: function(){
				if(parent){
					parent.children.remove(instance)
					parent = undefined
				}else{
					return false
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
