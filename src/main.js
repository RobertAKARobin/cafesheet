import m from 'mithril'
import {Coffeesheet} from './coffeesheet'

window.addEventListener('DOMContentLoaded', ()=>{
	let coffeesheet = new Coffeesheet()
	m.mount(document.getElementById('app-output'), coffeesheet)
})
