const m = require('mithril')
const {Coffeesheet} = require('./coffeesheet')

window.addEventListener('DOMContentLoaded', ()=>{
	let coffeesheet = new Coffeesheet()
	m.mount(document.getElementById('app-output'), coffeesheet)
})
