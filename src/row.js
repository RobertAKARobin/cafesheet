Object.defineProperties(Row, {
	ancestors: {
		value: [Section, Table, Base]
	},
	name: {
		value: 'Row'
	},
	parent: {
		value: Section
	},
	pluralName: {
		value: 'rows'
	},

	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Row
			},
			getWidth: {
				value: function(){
					return this.getChildren().length
				}
			},
			toJSON: {
				value: function(){
					return {
						cells: this.getChildren()
					}
				}
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				children: [],
				parent: undefined
			}
			const row = pvt.instance = Object.create(Row.proto, {
				getChildren: {
					value: Cafesheet.instance.getChildren(pvt)
				},
				getParent: {
					value: Cafesheet.instance.getParent(pvt)
				}
			})

			if(input.cells instanceof Array){
				pvt.children = Array.from(input.cells)
				// TODO: Detect if raw functions are passed as children
			}
			if(input.parent && input.parent.class === Row.parent){
				pvt.parent = input.parent
			}
			return row
		}
	}
})
