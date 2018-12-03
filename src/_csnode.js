const Cafesheet = {
	state: {},
	class: {
		create: function(Class, children){
			return function(input = {}){
				const instance = new Class()
				if(input[children]){
					input[children].forEach(instance.createChild)
				}else{
					(Class.defaultNumberOfChildren).times(instance.createChild)
				}
				return instance
			}
		},
		new: function(Class){
			return function(){
				return new Class()
			}
		}
	},
	instance: {
		addToParent: function(pvt){
			return function(targetParent){
				const child = pvt.instance
				const currentParent = pvt.parent

				if(targetParent instanceof child.constructor.parent){
					if(currentParent != targetParent){
						if(currentParent){
							currentParent.removeChild(child)
						}
						pvt.parent = targetParent
						if(!targetParent.getChildren().includes(child)){
							targetParent.placeChild(child)
						}
					}
					return child
				}else{
					throw new Error(`Cannot move ${child.constructor.name} to ${targetParent ? targetParent.constructor.name : targetParent}.`)
				}
			}
		},
		createChild: function(pvt){
			return function(input){
				const parent = pvt.instance
				const childClass = pvt.instance.constructor.child
				const children = pvt.children
	
				const child = childClass.create(input).addToParent(parent)
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
					}else if(child.getPlace() !== index){
						children.place(child, index)
					}
					return child
				}else{
					throw new Error(`Cannot add ${child ? child.constructor.name : child} to ${parentClass.name}.`)
				}
			}
		},
		removeChild: function(pvt){
			return function(child){
				const parent = this
				const children = pvt.children
	
				if(children.includes(child)){
					children.remove(child)
					child.removeFromParent()
					return parent
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
		empty: function(){
			const instance = this
			instance.getChildren().forEach(instance.removeChild)
			return instance
		},
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
		},
		placeAt: function(index){
			const instance = this
			const parent = instance.getParent()
			if(parent){
				return parent.placeChild(instance, index)
			}else{
				throw new Error(`${instance.constructor.name} must have a parent.`)
			}
		},
		scanForFamily: (function(){
			function scanAncestors(startingInstance, TargetClass){
				let parent = undefined
				let current = startingInstance
				while(parent = current.getParent()){
					if(parent.constructor === TargetClass){
						break
					}else{
						current = parent
					}
				}
				return parent
			}
			function scanDescendants(startingInstance, TargetClass){
				let combinedChildren = []
				gatherChildren(startingInstance)
				return combinedChildren.flat()

				function gatherChildren(current){
					const children = current.getChildren()
					if(current.constructor.child === TargetClass){
						combinedChildren.push(children)
					}else{
						children.forEach(gatherChildren)
					}
				}
			}
			return function(TargetClass){
				const instance = this
				const Anchor = instance.constructor
				if(Anchor === TargetClass){
					return instance
				}else if(Anchor.ancestors && Anchor.ancestors.includes(TargetClass)){
					return scanAncestors(instance, TargetClass)
				}else if(Anchor.descendants && Anchor.descendants.includes(TargetClass)){
					return scanDescendants(instance, TargetClass)
				}else{
					throw new Error(`${Anchor.name} cannot scan for ${TargetClass ? TargetClass.name : TargetClass}`)
				}
			}
		})()
	}
}
