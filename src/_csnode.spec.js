function thrownBy(callback){
	try{
		callback()
	}catch(e){
		return e.constructor
	}
}

Cafesheet.Spec = function(Class){
	const specs = {
		addChild: ()=>o.spec('.addChild', ()=>{
			o('.addChild(@childClass)', ()=>{
				const instance = new Class()
				const childA = new Class.child()
				const childB = new Class.child()

				instance.addChild(childA)
				o(childA.getParent()).equals(instance)
				o(instance.getChildren()).deepEquals([childA])
				instance.addChild(childB)
				o(instance.getChildren()).deepEquals([childA, childB])
			})
			o('.addChild(@childClass, index)', ()=>{
				const instance = new Class()
				const childA = new Class.child()
				const childB = new Class.child()
				const childC = new Class.child()

				instance.addChild(childA, 1)
				o(instance.getChildren()).deepEquals([childA])
				instance.addChild(childB, 1)
				o(instance.getChildren()).deepEquals([childA, childB])
				instance.addChild(childC, 1)
				o(instance.getChildren()).deepEquals([childA, childC, childB])
			})
			o('.addChild()', ()=>{
				const instance = new Class()
				
				o(thrownBy(n=>instance.addChild())).equals(Error)
			})
			o('.addChild(@wrongClass)', ()=>{
				const instance = new Class()
				
				o(thrownBy(n=>instance.addChild({}))).equals(Error)
			})
		}),
		addToParent: ()=>o.spec('.addToParent', ()=>{
			o('.addToParent(@parent)', ()=>{
				const child = new Class()
				const parent = new Class.parent()

				o(child.getParent()).equals(undefined)
				o(child.addToParent(parent)).equals(child)
				o(child.getParent()).equals(parent)

				o(child.removeFromParent()).equals(child)
				o(child.addToParent(parent)).equals(child)
				o(child.getParent()).equals(parent)
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

			parent.addChild(orphan)
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

			parent.addChild(childA)
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

			parent.addChild(childB)
			o(childA.getSiblings()).deepEquals([childA, childB])
			o(childB.getSiblings()).deepEquals([childA, childB])
			
			parent.removeChild(childB)
			o(childA.getSiblings()).deepEquals([childA])
			o(childB.getSiblings()).deepEquals([])
		}),
		placeAt: ()=>{},
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

			parent.addChild(child)
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

function specChildren(Class){
	o.spec('.children', ()=>{
		const _ = {}
		_.class = Class
		o.beforeEach(()=>{
			_.instance = new _.class()
			_.childClass = _.class.child
		})
		o('new', ()=>{
			o(_.instance.children.get().length).equals(0)
			o(_.instance.children.get()).deepEquals([])
		})
		o('.place(@child, index)', ()=>{
			const childA = _.instance.children.create()
			const childB = _.instance.children.create()
			const childC = _.instance.children.create()
			o(_.instance.children.get()).deepEquals([childA, childB, childC])
			_.instance.children.place(childB)
			o(_.instance.children.get()).deepEquals([childA, childC, childB])
			_.instance.children.place(childB, 0)
			o(_.instance.children.get()).deepEquals([childB, childA, childC])
			_.instance.children.place(childB, 200)
			o(_.instance.children.get()).deepEquals([childA, childC, childB])

			const childD = new _.childClass()
			_.instance.children.place(childD, 1)
			o(_.instance.children.get()).deepEquals([childA, childD, childC, childB])
		})
	})
}

function specParent(Class){
	o.spec('.parent', ()=>{
		const _ = {}
		_.class = Class
		o.beforeEach(()=>{
			_.instance = new _.class()
			_.parentClass = _.class.parent
		})
		o('.placeAt(index)', ()=>{
			const parent = new _.parentClass()
			const childA = parent.children.create()
			const childB = parent.children.create()
			const childC = parent.children.create()

			childA.placeAt(1)
			o(parent.children.get()).deepEquals([childB, childA, childC])
			childA.placeAt(0)
			o(parent.children.get()).deepEquals([childA, childB, childC])
			childA.placeAt()
			o(parent.children.get()).deepEquals([childB, childC, childA])
		})
	})
}
