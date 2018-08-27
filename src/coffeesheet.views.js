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
	return m('td', this.datum)
}

module.exports = {
	Coffeesheet,
	Table,
	Section,
	Row,
	Cell
}
