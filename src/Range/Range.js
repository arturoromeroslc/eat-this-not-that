import React, { Component } from 'react'
import isNewMaxValue from '../utils/isNewMaxValue'
import isNewMinValue from '../utils/isNewMinValue'
import './Range.css'

export default class Range extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 0,
      max: 0,
      valueMin: 1000,
      valueMax: 1600
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(valueKey, event) {
    let targetValue = parseInt(event.target.value)
      
      if (isNewMaxValue(targetValue, this.state.valueMax)) {
        let temp = this.state.valueMax
        this.setState({
          valueMax: targetValue
        })
      } else if (isNewMinValue(targetValue, this.state.valueMin)) {
        this.setState({
          valueMin: targetValue
        })
      } else if (targetValue > this.state.valueMin && targetValue < this.state.valueMax && this.state.valueMin < this.state.valueMax) {
        console.log(targetValue, this.state.valueMin, this.state.valueMax)
        this.setState({
          valueMin: targetValue
        })
      } else {
        this.setState({
          valueMin: targetValue
        })
      }
      /*
      console.log('else', valueKey, targetValue)
      if (targetValue < this.state.valueMin) {
        this.setState({
          valueMin: targetValue,
          valueMax: this.state.valueMin
        })
      } else {
        let newState = {}
        newState[valueKey] = targetValue
        this.setState(newState)
      }
*/    
  }


  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
  }  

	render () {
		return (
      <div className="range-slider">
        <div className="range-value-container">
          <span className="range-values">Min: {this.state.valueMin}</span>
          <span className="range-values">Max: {this.state.valueMax}</span>
        </div>
        <input min="0" max="5000" step="400" type="range" defaultValue="1000" onInput={this.handleOnChange.bind(this, 'valueMin')}/>
        <input min="0" max="5000" step="400" type="range" defaultValue="1600" onInput={this.handleOnChange.bind(this, 'valueMax')}/>
      </div>
		)
	}
}
