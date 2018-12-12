Cafesheet.Spec = function(Class){
	const specs = {
		addTo: ()=>o.spec('.addTo', ()=>{
			o('.addTo(@newParent)', ()=>{
				const child = Class.new()
				const parent = Class.parent.new()

				o(child.getParent()).equals(undefined)
				o(child.addTo(parent)).equals(child)
				o(child.getParent()).equals(parent)

				o(child.removeFromParent()).equals(child)
				o(child.addTo(parent)).equals(child)
				o(child.getParent()).equals(parent)
			})
			o('.addTo(@existingParent)', ()=>{
				const parent = Class.parent.new()
				const child = parent.createChild()

				o(child.addTo(parent)).equals(child)
				o(child.getParent()).equals(parent)
			})
			o('.addTo()', ()=>{
				const child = Class.new()

				o(n=>child.addTo()).throws(Error)
			})
			o('.addTo(@wrongClass)', ()=>{
				const child = Class.new()

				o(n=>child.addTo({})).throws(Error)
			})
		}),
		createChild: ()=>o('.createChild()', ()=>{
			const instance = Class.new()
			const childA = instance.createChild()
			const childB = instance.createChild()
			const childC = instance.createChild()

			o(childA.getParent()).equals(instance)
			o(childA.constructor).equals(instance.constructor.child)
			o(instance.getChildren()).deepEquals([childA, childB, childC])
		}),
		empty: ()=>o('.empty()', ()=>{
			const instance = Class.new()
			const childA = instance.createChild()
			const childB = instance.createChild()
			const childC = instance.createChild()

			o(instance.getChildren()).deepEquals([childA, childB, childC])
			o(instance.empty().getChildren()).deepEquals([])
		}),
		getChildren: ()=>o.spec('.getChildren', ()=>{
			o('.getChildren()', ()=>{
				const instance = Class.new()
	
				o(instance.getChildren()).deepEquals([])
	
				const childA = instance.createChild()
				const childB = instance.createChild()
				const childC = instance.createChild()
				o(instance.getChildren()).deepEquals([childA, childB, childC])
			})
			o('JSON', ()=>{
				const childrenName = Class.child.name.toLowerCase() + 's'
				const instance = Class.new()
				instance.createChild()
				instance.createChild()

				const json = JSON.parse(JSON.stringify(instance))
				o(Object.keys(json).includes(childrenName)).equals(true)
				o(json[childrenName].length).equals(2)
			})
		}),
		getParent: ()=>o('.getParent()', ()=>{
			const parent = Class.parent.new()
			const orphan = Class.new()
			const child = parent.createChild()

			o(orphan.getParent()).equals(undefined)
			o(child.getParent()).equals(parent)

			parent.placeChild(orphan)
			o(orphan.getParent()).equals(parent)
		}),
		getPlace: ()=>o.spec('.getPlace', ()=>{
			o('.getPlace()', ()=>{
				const childA = Class.new()
				o(childA.getPlace()).equals(-1)
				
				const parent = Class.parent.new()
				const childB = parent.createChild()
				o(childA.getPlace()).equals(-1)
				o(childB.getPlace()).equals(0)
	
				const childC = parent.createChild()
				o(childC.getPlace()).equals(1)
	
				parent.placeChild(childA)
				o(childA.getPlace()).equals(2)
				o(parent.getChildren().map(c => c.getPlace())).deepEquals([0, 1, 2])
			})
			o('JSON', ()=>{
				const parent = Class.parent.new()
				const childA = parent.createChild()
				const childB = parent.createChild()
				const jsonA = JSON.parse(JSON.stringify(childA))
				const jsonB = JSON.parse(JSON.stringify(childB))

				o(jsonA.place).equals(childA.getPlace())
				o(jsonB.place).equals(childB.getPlace())
			})
		}),
		getSiblings: ()=>o('.getSiblings()', ()=>{
			const parent = Class.parent.new()
			const childA = Class.new()
			const childB = Class.new()

			o(childA.getSiblings()).deepEquals([])

			childA.addTo(parent)
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
				const parent = Class.parent.new()
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
				const parent = Class.parent.new()
				const child = parent.createChild()
	
				o(n=>child.placeAt('x')).throws(TypeError)
			})
			o('no parent', ()=>{
				const orphan = Class.new()

				o(n=>orphan.placeAt()).throws(Error)
			})
		}),
		placeChild: ()=>o.spec('.placeChild', ()=>{
			o('.placeChild(@childClass)', ()=>{
				const instance = Class.new()
				const childA = Class.child.new()
				const childB = Class.child.new()

				instance.placeChild(childA)
				o(childA.getParent()).equals(instance)
				o(instance.getChildren()).deepEquals([childA])
				instance.placeChild(childB)
				o(instance.getChildren()).deepEquals([childA, childB])
			})
			o('.placeChild(@childClass, $number)', ()=>{
				const instance = Class.new()
				const childA = Class.child.new()
				const childB = Class.child.new()
				const childC = Class.child.new()

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
				const instance = Class.new()
				const childA = Class.child.new()

				o(n=>instance.placeChild(childA, 'x')).throws(TypeError)
			})
			o('.placeChild()', ()=>{
				const instance = Class.new()
				
				o(n=>instance.placeChild()).throws(Error)
			})
			o('.placeChild(@wrongClass)', ()=>{
				const instance = Class.new()
				
				o(n=>instance.placeChild({})).throws(Error)
			})
		}),
		removeChild: ()=>o.spec('.removeChild', ()=>{
			o('.removeChild(@child)', ()=>{
				const instance = Class.new()
				const childA = instance.createChild()
				const childB = instance.createChild()
	
				instance.removeChild(childA)
				o(instance.getChildren()).deepEquals([childB])
				o(childA.getParent()).equals(undefined)
	
				instance.removeChild(childB)
				o(instance.getChildren()).deepEquals([])
			})
			o('.removeChild(@notChild)', ()=>{
				const instance = Class.new()

				o(instance.removeChild({})).equals(false)
			})
			o('.removeChild()', ()=>{
				const instance = Class.new()

				o(instance.removeChild()).equals(false)
			})
		}),
		removeFromParent: ()=>o('.removeFromParent()', ()=>{
			const parent = Class.parent.new()
			const child = Class.new()

			o(child.getParent()).equals(undefined)
			o(child.removeFromParent()).equals(child)

			parent.placeChild(child)
			o(parent.getChildren()).deepEquals([child])
			o(child.getParent()).equals(parent)

			o(child.removeFromParent()).equals(child)
			o(parent.getChildren()).deepEquals([])
			o(child.getParent()).equals(undefined)
		}),
		scan: ()=>o.spec('.scanFor default', ()=>{
			const $ = {}
			o.beforeEach(()=>{
				$.Base = Base.create()
				$.Table = $.Base.tables
				$.Section = $.Table.map(t=>t.sections).flat()
				$.Row = $.Section.map(s=>s.rows).flat()
				$.Cell = $.Row.map(r=>r.cells).flat()

				$.instance = (Class === Base ? $.Base : $[Class.name][0])
			})
			o('.scanFor($Self)', ()=>{
				o($.instance.scanFor(Class)).equals($.instance)
			})
			o('.scanFor()', ()=>{
				o(n=>$.instance.scanFor()).throws(Error)
			})
			o('.scanFor(ExternalClass)', ()=>{
				o(n=>$.instance.scanFor(Element)).throws(Error)
			})
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
