function ChildArray(parent, Class){
	const instance = this
	const children = []

	Object.defineProperties(instance, {
		class: {
			value: Class
		},
		parent: {
			value: parent
		},

		add: {
			value: function(child){
				if(child instanceof Class){
					if(!children.includes(child)){
						children.push(child)
						child.addTo(parent)
						return child
					}
				}else{
					throw new Error(`Cannot add ${child.constructor.name} to ${Class.name}.`)
				}
			}
		},
		get: {
			value: function(){
				return Array.from(children)
			}
		},
		create: {
			value: function(){
				const child = new Class(parent)
				children.push(child)
				return child
			}
		},
		remove: {
			value: function(child){
				if(children.includes(child)){
					children.remove(child)
				}else{
					return false
				}
			}
		}
	})
}

function Base(){
	const instance = this
	const children = new ChildArray(instance, Table)

	Object.defineProperties(instance, {
		children: {
			value: children
		},
		tables: {
			get: children.get,
			enumerable: true
		},

		addTable: {
			value: children.add
		},
		createTable: {
			value: children.create
		},
		removeTable: {
			value: children.remove
		}
	})
}
Object.defineProperties(Base, {
	child: {
		value: Table,
		enumerable: true
	},
	descendants: {
		value: [Table, Section, Row, Cell]
	}
})
