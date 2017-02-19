import React, { Component } from 'react'
import './Range.css'

export default class Range extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueMin: 0,
      valueMax: 0
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(valueKey, event) {
    let max = parseInt(this.refs.maxVal.value)
    let min = parseInt(this.refs.minVal.value)
      
    if ( min > max ) { 
      let tmp = max; 
      max = min; 
      min = tmp; 
    }
    
    this.setState({
      valueMin: min,
      valueMax: max
    })
  }

	render () {
		return (
      <div className="range-slider">
        <div className="range-value-container">
          <span className="range-values">Min: {this.state.valueMin}</span>
          <span className="range-values">Max: {this.state.valueMax}</span>
        </div>
        <input ref="minVal" min="0" max="5000" step="200" type="range" onChange={this.handleOnChange}/>
        <input ref="maxVal" min="0" max="5000" step="200" type="range" onChange={this.handleOnChange}/>
      </div>
		)
	}
}
