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
				const child = new this.class(parent)
				children.push(child)
				return child
			}
		}
	})
}

function Base(){
	const instance = this

	Object.defineProperties(instance, {
		children: {
			value: new ChildArray(instance, Table)
		},
		tables: {
			get: ()=>instance.children.get(),
			enumerable: true
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
