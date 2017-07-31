import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Range.css'

const propTypes = {
  onhandleFilterRange: PropTypes.func
}

export default class Range extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentDidMount() {
    this.refs.minVal.value = parseInt(this.props.valueMin, 10)
    this.refs.maxVal.value = parseInt(this.props.valueMax, 10)
  }

  handleOnChange(valueKey, event) {
    let tmp, backendString, rangeFilter,
      max = parseInt(this.refs.maxVal.value, 10),
      min = parseInt(this.refs.minVal.value, 10)
      
    if ( min > max ) { 
      tmp = max; 
      max = min; 
      min = tmp; 
    }
    
    rangeFilter = {
      valueMin: min,
      valueMax: max
    }
    
    backendString = `gte ${min}, lte ${max}`
    this.props.onhandleFilterRange(backendString, 'calories', rangeFilter)
  }

	render () {
		return (
      <div className="range-slider">
        <div className="range-value-container">
          <span className="range-values">Min: {this.props.valueMin}</span>
          <span className="range-values">Max: {this.props.valueMax}</span>
        </div>
        <input ref="minVal" min="0" max="5000" step="200" type="range" onChange={this.handleOnChange}/>
        <input ref="maxVal" min="0" max="5000" step="200" type="range" onChange={this.handleOnChange}/>
      </div>
		)
	}
}

Range.propTypes = propTypes