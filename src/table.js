const Table = Object.defineProperties({}, {
	ancestors: {
		get: ()=>[Base]
	},
	child: {
		get: ()=>Section
	},
	defaultNumberOfChildren: {
		value: 2
	},
	descendants: {
		get: ()=>[Section, Row]
	},
	name: {
		value: 'Table'
	},
	parent: {
		get: ()=>Base
	},
	pluralName: {
		value: 'tables'
	},

	proto: {
		value: Object.defineProperties({}, {
			class: {
				get: ()=>Table
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				children: [],
				parent: undefined
			}
			const table = pvt.instance = Object.create(Table.proto, {
				getChildren: {
					value: Cafesheet.instance.getChildren(pvt)
				},
				getParent: {
					value: Cafesheet.instance.getParent(pvt)
				}
			})

			if(input.sections instanceof Array){
				input.sections.forEach(section=>{
					if(section.class === Section){
						pvt.children.push(section)
					}
				})
			}else{
				Table.defaultNumberOfChildren.times(n=>{
					pvt.children.push(Section.create({parent: table}))
				})
			}
			if(input.parent && input.parent.class === Table.parent){
				pvt.parent = input.parent
			}
			return table
		}
	}
})
