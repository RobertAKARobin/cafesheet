Object.defineProperties(Section, {
	ancestors: {
		value: [Table, Base]
	},
	child: {
		value: Row
	},
	defaultNumberOfChildren: {
		value: 3
	},
	descendants: {
		value: [Row]
	},
	name: {
		value: 'Section'
	},
	parent: {
		value: Table
	},
	pluralName: {
		value: 'sections'
	},

	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Section
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				children: [],
				parent: undefined
			}
			const section = pvt.instance = Object.create(Section.proto, {
				getChildren: {
					value: Cafesheet.instance.getChildren(pvt)
				},
				getParent: {
					value: Cafesheet.instance.getParent(pvt)
				}
			})

			if(input.rows instanceof Array){
				input.rows.forEach(row=>{
					if(row.class === Row){
						pvt.children.push(row)
					}
				})
			}else{
				Section.defaultNumberOfChildren.times(n=>{
					pvt.children.push(Row.create({parent: section}))
				})
			}
			if(input.parent && input.parent.class === Section.parent){
				pvt.parent = input.parent
			}
			return section
		}
	}
})
