const CSData = $CSData$

window.addEventListener('DOMContentLoaded', ()=>{
	let sheet = new Sheet(CSData)
	m.mount(document.getElementById('app-output'), sheet)
})
