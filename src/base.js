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

		createTable: {
			value: children.create
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
