const Cafesheet = {
	state: {},
	instance: {
		addToParent: function(pvt){
			return function(targetParent, index){
				const child = pvt.instance
				const currentParent = pvt.parent

				if(targetParent instanceof child.constructor.parent){
					if(currentParent != targetParent){
						if(currentParent){
							currentParent.removeChild(child)
						}
						pvt.parent = targetParent
						targetParent.placeChild(child, index)
						return child
					}
				}else{
					throw new Error(`Cannot move ${child.constructor.name} to ${targetParent.constructor.name}.`)
				}
			}
		},
		createChild: function(pvt){
			return function(){
				const parent = pvt.instance
				const childClass = pvt.instance.constructor.child
				const children = pvt.children
	
				// const child = new childClass(parent, input)
				const child = new childClass(parent)
				children.push(child)
				return child
			}
		},
		getChildren: function(pvt){
			return function(){
				const children = pvt.children
	
				return Array.from(children)
			}
		},
		getParent: function(pvt){
			return function(){
				const parent = pvt.parent

				return parent
			}
		},
		placeChild: function(pvt){
			return function(child, index){
				const parent = pvt.instance
				const parentClass = pvt.instance.constructor
				const childClass = pvt.instance.constructor.child
				const children = pvt.children
	
				if(child instanceof childClass){
					if(!children.includes(child)){
						children.insert(child, index)
						child.addToParent(parent)
					}
					return child
				}else{
					throw new Error(`Cannot add ${child ? child.constructor.name : child} to ${parentClass.name}.`)
				}
			}
		},
		removeChild: function(pvt){
			return function(child){
				const children = pvt.children
	
				if(children.includes(child)){
					children.remove(child)
					child.removeFromParent()
				}else{
					return false
				}
			}
		},
		removeFromParent: function(pvt){
			return function(){
				const child = pvt.instance
				const parent = pvt.parent

				if(parent){
					parent.removeChild(child)
					pvt.parent = undefined
				}
				return child
			}
		}
	},
	proto: {
		getPlace: function(){
			const instance = this
			const parent = instance.getParent()
			if(parent){
				return parent.getChildren().indexOf(instance)
			}else{
				return -1
			}
		},
		getSiblings: function(){
			const instance = this
			const parent = instance.getParent()
			if(parent){
				return parent.getChildren()
			}else{
				return []
			}
		}
	}
}

// const Cafesheet = {
// 	childCollection: function ChildCollection(parent){
// 		Object.defineProperties(instance, {
// 			place: {
// 				value: function(child, index){
// 					if(children.includes(child)){
// 						children.remove(child)
// 						children.insert(child, index)
// 					}else{
// 						instance.add(child)
// 						instance.place.apply(instance, arguments)
// 					}
// 				}
// 			}
// 		})
// 	},
// 	instanceMethods: {
// 		placeAt: function(index){
// 			const instance = this
// 			if(instance.parent){
// 				instance.parent.children.place(instance, index)
// 			}else{
// 				return false
// 			}
// 		}
// 	}
// }
