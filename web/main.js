window.addEventListener('DOMContentLoaded', ()=>{
	const base = new Base()
	base.createTable()
	m.mount(document.getElementById('app-output'), base)
})
