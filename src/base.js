const Base = Object.defineProperties({}, {
	child: {
		get: ()=>Table
	},
	defaultNumberOfChildren: {
		value: 1
	},
	descendants: {
		get: ()=>[Table, Section, Row]
	},
	name: {
		value: 'Base'
	},
	pluralName: {
		value: 'bases'
	},

	proto: {
		value: Object.defineProperties({}, {
			class: {
				get: ()=>Base
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				children: []
			}
			const base = pvt.instance = Object.create(Base.proto, {
				getChildren: {
					value: Cafesheet.instance.getChildren(pvt)
				}
			})

			if(input.tables instanceof Array){
				input.tables.forEach(table=>{
					if(table.class === Base.child){
						pvt.children.push(table)
					}
				})
			}else{
				Base.defaultNumberOfChildren.times(n=>{
					pvt.children.push(Table.create({parent: base}))
				})
			}
			return base
		}
	}
})
