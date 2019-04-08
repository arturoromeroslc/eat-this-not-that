import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './Range.css'

export default function Range(props) {
  const minValueRef = useRef(parseInt(props.valueMin, 10))
  const maxValueRef = useRef(parseInt(props.valueMax, 10))

  useEffect(
    () => {
      minValueRef.current.value = props.valueMin
      maxValueRef.current.value = props.valueMax
    },
    [props.valueMin, props.valueMax],
  )

  const handleOnChange = () => {
    let max = parseInt(maxValueRef.current.value, 10)
    let min = parseInt(minValueRef.current.value, 10)

    if (min > max) {
      const tmp = max
      max = min
      min = tmp
    }

    const rangeValue = {
      valueMin: min,
      valueMax: max,
    }

    const filterString = `gte ${min}, lte ${max}`
    props.onhandleFilterRange(filterString, rangeValue)
  }

  return (
    <div className="range-slider">
      <div className="range-value-container">
        <span className="range-values">Min: {props.valueMin}</span>
        <span className="range-values">Max: {props.valueMax}</span>
      </div>
      <input
        ref={minValueRef}
        min="0"
        max="5000"
        step="200"
        type="range"
        onChange={handleOnChange}
      />
      <input
        ref={maxValueRef}
        min="0"
        max="5000"
        step="200"
        type="range"
        onChange={handleOnChange}
      />
    </div>
  )
}

Range.propTypes = {
  onhandleFilterRange: PropTypes.func,
  valueMin: PropTypes.number,
  valueMax: PropTypes.number,
}
