import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Range.css'

export default class Range extends Component {
  constructor(props) {
    super(props)
    this.minValueRef = React.createRef()
    this.maxValueRef = React.createRef()
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentDidMount() {
    this.minValueRef.current.value = parseInt(this.props.valueMin, 10)
    this.maxValueRef.current.value = parseInt(this.props.valueMax, 10)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.valueMin === 0 && nextProps.valueMax === 0) {
      this.minValueRef.current.value = nextProps.valueMin
      this.maxValueRef.current.value = nextProps.valueMax
    }
  }

  handleOnChange() {
    let max = parseInt(this.maxValueRef.current.value, 10)
    let min = parseInt(this.minValueRef.current.value, 10)

    if (min > max) {
      const tmp = max;
      max = min;
      min = tmp;
    }

    const rangeValue = {
      valueMin: min,
      valueMax: max
    }

    const filterString = `gte ${min}, lte ${max}`
    this.props.onhandleFilterRange(filterString, rangeValue)
  }

  render () {
    return (
      <div className="range-slider">
        <div className="range-value-container">
          <span className="range-values">Min: {this.props.valueMin}</span>
          <span className="range-values">Max: {this.props.valueMax}</span>
        </div>
        <input ref={this.minValueRef} min="0" max="5000" step="200" type="range" onChange={this.handleOnChange}/>
        <input ref={this.maxValueRef} min="0" max="5000" step="200" type="range" onChange={this.handleOnChange}/>
      </div>
    )
  }
}

Range.propTypes = {
  onhandleFilterRange: PropTypes.func,
  valueMin: PropTypes.number,
  valueMax: PropTypes.number,
}
