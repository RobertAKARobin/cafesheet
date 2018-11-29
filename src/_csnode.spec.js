function thrownBy(callback){
	try{
		callback()
	}catch(e){
		return e.constructor
	}
}

Cafesheet.Spec = function(Class){
	const specs = {
		addToParent: ()=>o.spec('.addToParent', ()=>{
			o('.addToParent(@newParent)', ()=>{
				const child = new Class()
				const parent = new Class.parent()

				o(child.getParent()).equals(undefined)
				o(child.addToParent(parent)).equals(child)
				o(child.getParent()).equals(parent)

				o(child.removeFromParent()).equals(child)
				o(child.addToParent(parent)).equals(child)
				o(child.getParent()).equals(parent)
			})
			o('.addToParent(@existingParent)', ()=>{
				const parent = new Class.parent()
				const child = parent.createChild()

				o(child.addToParent(parent)).equals(child)
				o(child.getParent()).equals(parent)
			})
			o('.addToParent()', ()=>{
				const child = new Class()

				o(thrownBy(n=>child.addToParent())).equals(Error)
			})
			o('.addToParent(@wrongClass)', ()=>{
				const child = new Class()

				o(thrownBy(n=>child.addToParent({}))).equals(Error)
			})
		}),
		createChild: ()=>o('.createChild()', ()=>{
			const instance = new Class()
			const childA = instance.createChild()
			const childB = instance.createChild()
			const childC = instance.createChild()

			o(childA.getParent()).equals(instance)
			o(childA.constructor).equals(instance.constructor.child)
			o(instance.getChildren()).deepEquals([childA, childB, childC])
		}),
		getChildren: ()=>o('.getChildren()', ()=>{
			const instance = new Class()

			o(instance.getChildren()).deepEquals([])

			const childA = instance.createChild()
			const childB = instance.createChild()
			const childC = instance.createChild()
			o(instance.getChildren()).deepEquals([childA, childB, childC])
		}),
		getParent: ()=>o('.getParent()', ()=>{
			const parent = new Class.parent()
			const orphan = new Class()
			const child = parent.createChild()

			o(orphan.getParent()).equals(undefined)
			o(child.getParent()).equals(parent)

			parent.placeChild(orphan)
			o(orphan.getParent()).equals(parent)
		}),
		getPlace: ()=>o('.getPlace()', ()=>{
			const childA = new Class()
			o(childA.getPlace()).equals(-1)
			
			const parent = new Class.parent()
			const childB = parent.createChild()
			o(childA.getPlace()).equals(-1)
			o(childB.getPlace()).equals(0)

			const childC = parent.createChild()
			o(childC.getPlace()).equals(1)

			parent.placeChild(childA)
			o(childA.getPlace()).equals(2)
			o(parent.getChildren().map(c => c.getPlace())).deepEquals([0, 1, 2])
		}),
		getSiblings: ()=>o('.getSiblings()', ()=>{
			const parent = new Class.parent()
			const childA = new Class()
			const childB = new Class()

			o(childA.getSiblings()).deepEquals([])

			childA.addToParent(parent)
			o(childA.getSiblings()).deepEquals([childA])

			parent.placeChild(childB)
			o(childA.getSiblings()).deepEquals([childA, childB])
			o(childB.getSiblings()).deepEquals([childA, childB])
			
			parent.removeChild(childB)
			o(childA.getSiblings()).deepEquals([childA])
			o(childB.getSiblings()).deepEquals([])
		}),
		placeAt: ()=>o.spec('.placeAt', ()=>{
			o('.placeAt($number || empty)', ()=>{
				const parent = new Class.parent()
				const childA = parent.createChild()
				const childB = parent.createChild()
				const childC = parent.createChild()
	
				o(parent.getChildren()).deepEquals([childA, childB, childC])
				childA.placeAt(1)
				o(parent.getChildren()).deepEquals([childB, childA, childC])
				childA.placeAt(0)
				o(parent.getChildren()).deepEquals([childA, childB, childC])
				childA.placeAt()
				o(parent.getChildren()).deepEquals([childB, childC, childA])
			})
			o('.placeAt($notNumber)', ()=>{

			})
			o('no parent', ()=>{
				
			})
		}),
		placeChild: ()=>o.spec('.placeChild', ()=>{
			o('.placeChild(@childClass)', ()=>{
				const instance = new Class()
				const childA = new Class.child()
				const childB = new Class.child()

				instance.placeChild(childA)
				o(childA.getParent()).equals(instance)
				o(instance.getChildren()).deepEquals([childA])
				instance.placeChild(childB)
				o(instance.getChildren()).deepEquals([childA, childB])
			})
			o('.placeChild(@childClass, $number)', ()=>{
				const instance = new Class()
				const childA = new Class.child()
				const childB = new Class.child()
				const childC = new Class.child()

				instance.placeChild(childA, 1)
				o(instance.getChildren()).deepEquals([childA])
				instance.placeChild(childB, 1)
				o(instance.getChildren()).deepEquals([childA, childB])
				instance.placeChild(childC, 1)
				o(instance.getChildren()).deepEquals([childA, childC, childB])
				instance.placeChild(childC, 0)
				o(instance.getChildren()).deepEquals([childC, childA, childB])
				instance.placeChild(childC, -1)
				o(instance.getChildren()).deepEquals([childA, childC, childB])
			})
			o('.placeChild(@childClass, $notNumber)', ()=>{
				const instance = new Class()
				const childA = new Class.child()

				o(thrownBy(n=>instance.placeChild(childA, 'x'))).equals(TypeError)
			})
			o('.placeChild()', ()=>{
				const instance = new Class()
				
				o(thrownBy(n=>instance.placeChild())).equals(Error)
			})
			o('.placeChild(@wrongClass)', ()=>{
				const instance = new Class()
				
				o(thrownBy(n=>instance.placeChild({}))).equals(Error)
			})
		}),
		removeChild: ()=>o.spec('.removeChild', ()=>{
			o('.removeChild(@child)', ()=>{
				const instance = new Class()
				const childA = instance.createChild()
				const childB = instance.createChild()
	
				instance.removeChild(childA)
				o(instance.getChildren()).deepEquals([childB])
				o(childA.getParent()).equals(undefined)
	
				instance.removeChild(childB)
				o(instance.getChildren()).deepEquals([])
			})
			o('.removeChild(@notChild)', ()=>{
				const instance = new Class()

				o(instance.removeChild({})).equals(false)
			})
			o('.removeChild()', ()=>{
				const instance = new Class()

				o(instance.removeChild()).equals(false)
			})
		}),
		removeFromParent: ()=>o('.removeFromParent()', ()=>{
			const parent = new Class.parent()
			const child = new Class()

			o(child.getParent()).equals(undefined)
			o(child.removeFromParent()).equals(child)

			parent.placeChild(child)
			o(parent.getChildren()).deepEquals([child])
			o(child.getParent()).equals(parent)

			o(child.removeFromParent()).equals(child)
			o(parent.getChildren()).deepEquals([])
			o(child.getParent()).equals(undefined)
		}),
		toJSON: ()=>o('JSON.stringify(@instance)', ()=>{
			const childrenName = Class.child.name.toLowerCase().toPlural()
			const instance = new Class()
			instance.createChild()
			instance.createChild()

			const json = JSON.parse(JSON.stringify(instance))
			o(Object.keys(json)).deepEquals([childrenName])
			o(json[childrenName].length).equals(2)
		})
	}

	const output = {}
	for(let key in specs){
		output[key] = ()=>{
			specs[key]()
			return output
		}
	}
	return output
}
