import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FoodCard from '../FoodCard/FoodCard'

import './List.css'

export default class List extends Component {
  render() {
    const { data } = this.props

    if (data) {
      return (
        <ul className="flex">
          {data.map(({ id, label, image, ingredientLines, calories }, i) => (
            <FoodCard
              key={id}
              index={i}
              label={label}
              image={image}
              ingredientLines={ingredientLines}
              cardClicked={this.cardClick}
              calories={calories}
            />
          ))}
        </ul>
      )
    } else if (data.length === 0) {
      return <div>No data for searched term</div>
    }

    return null
  }
}

List.defaultProps = {
  data: [],
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
}
