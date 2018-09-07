const m = require('mithril')
const {Coffeesheet, Table, Section, Row, Cell} = require('./coffeesheet')

Coffeesheet.prototype.view = function(){
	return this.tables.map((table)=>{
		return table.view()
	})
}

Table.prototype.view = function(){
	return m('table', this.sections.map((section)=>{
		return section.view()
	}))
}

Section.prototype.view = function(){
	return m('tbody', this.rows.map((row)=>{
		return row.view()
	}))
}

Row.prototype.view = function(){
	return m('tr', this.cells.map((cell)=>{
		return cell.view()
	}))
}

Cell.prototype.view = function(){
	let cell = this
	return m('td', [
		m('textarea', {
			value: cell.datum,
			oninput: (event)=>{
				event.redraw = false
				cell.datum = event.target.value
			}
		})
	])
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
