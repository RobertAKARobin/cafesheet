const m = require('mithril')
const {Cafesheet} = require('./cafesheet.views')

window.addEventListener('DOMContentLoaded', ()=>{
	let cafesheet = new Cafesheet()
	m.mount(document.getElementById('app-output'), cafesheet)
})
