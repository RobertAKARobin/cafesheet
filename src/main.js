import m from 'mithril'
import Coffeesheet from './coffeesheet'

window.addEventListener('DOMContentLoaded', ()=>{
	m.mount(document.getElementById('app-output'), {
		view: ()=>{
			return m('p', 'Hello, Mithril!')
		}
	})
})
