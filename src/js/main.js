const CSData = $CSData$

window.addEventListener('DOMContentLoaded', ()=>{
	let cafesheet = new Cafesheet(CSData)
	m.mount(document.getElementById('app-output'), cafesheet)
})
