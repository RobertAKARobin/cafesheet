const m = require('mithril')

window.addEventListener('DOMContentLoaded', ()=>{
	m.mount(document.getElementById('app-output'), {
		view: ()=>{
			return m('p', 'Hello, Mithril!')
		}
	})
})
