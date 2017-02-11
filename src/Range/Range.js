import React, { Component } from 'react'
import './Range.css'

class Range extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 0,
      max: 0,
      valueMin: 0,
      valueMax: 30000
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (valueKey, event) {
    var newState = {};
    newState[valueKey] = event.target.value
    this.setState(newState)
  }

	render () {
		return (
      <section className="range-slider">
        <span className="range-values">Min{this.state.valueMin}   Max{this.state.valueMax}</span>
        <input min="1" max="50000" step="100" type="range" value={this.state.valueMin} onChange={this.handleOnChange.bind(this, 'valueMin')}/>
        <input min="1" max="50000" step="100" type="range" value={this.state.valueMax} onChange={this.handleOnChange.bind(this, 'valueMax')}/>
      </section>
		)
	}
}

export default Range