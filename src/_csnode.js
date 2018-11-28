const Cafesheet = {
	state: {},
	instance: {
		addChild: function(pvt){
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
						targetParent.addChild(child, index)
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
		getIndex: function(){
			const instance = this
			if(instance.parent){
				return instance.parent.children.indexOf(instance)
			}else{
				return -1
			}
		},
		getSiblings: function(){
			const instance = this
			if(instance.parent){
				return instance.parent.children
			}else{
				return false
			}
		}
	}
}

// const Cafesheet = {
// 	state: {},
// 	childCollection: function ChildCollection(parent){
// 		const instance = this
// 		const Class = parent.constructor.child
// 		const children = []

// 		Object.defineProperties(instance, {
// 			class: {
// 				value: Class
// 			},
// 			parent: {
// 				value: parent
// 			},

// 			add: {
// 				value: function(child, index){
					// if(child instanceof Class){
					// 	if(!children.includes(child)){
					// 		children.insert(child, index)
					// 		child.addTo(parent)
					// 	}
					// 	return child
					// }else{
					// 	throw new Error(`Cannot add ${child.constructor.name} to ${Class.name}.`)
					// }
// 				}
// 			},
// 			create: {
// 				value: function(input){
					// const child = new Class(parent, input)
					// children.push(child)
					// return child
// 				}
// 			},
// 			get: {
				// value: function(){
				// 	return Array.from(children)
				// }
// 			},
// 			indexOf: {
// 				value: function(child){
// 					return children.indexOf(child)
// 				}
// 			},
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
// 			},
// 			remove: {
// 				value: function(child){
					// if(children.includes(child)){
					// 	children.remove(child)
					// 	child.remove()
					// }else{
					// 	return false
					// }
// 				}
// 			}
// 		})
// 	},
// 	instanceMethods: {
// 		addToParent: function(instance, pvt){
// 			return function(targetParent, index){
				// if(targetParent instanceof instance.constructor.parent){
				// 	if(pvt.parent != targetParent){
				// 		if(pvt.parent){
				// 			pvt.parent.children.remove(instance)
				// 		}
				// 		pvt.parent = targetParent
				// 		targetParent.children.add(instance, index)
				// 		return instance
				// 	}
				// }else{
				// 	throw new Error(`Cannot move ${instance.constructor.name} to ${targetParent.constructor.name}.`)
				// }
// 			}
// 		},
// 		index: function(){
			// const instance = this
			// if(instance.parent){
			// 	return instance.parent.children.indexOf(instance)
			// }else{
			// 	return -1
			// }
// 		},
// 		placeAt: function(index){
// 			const instance = this
// 			if(instance.parent){
// 				instance.parent.children.place(instance, index)
// 			}else{
// 				return false
// 			}
// 		},
// 		removeFromParent: function(instance, pvt){
// 			return function(){
				// if(pvt.parent){
				// 	pvt.parent.children.remove(instance)
				// 	pvt.parent = undefined
				// }else{
				// 	return false
				// }
// 			}
// 		},
// 		siblings: function(){
			// const instance = this
			// if(instance.parent){
			// 	return instance.parent.children
			// }else{
			// 	return false
			// }
// 		}
// 	}
// }
