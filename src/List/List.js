import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FoodCard from '../FoodCard/FoodCard'

export default class List extends Component {
  render() {
    const { data } = this.props

    if (data) {
      return (
        <ul>
          {data.map(({
 id, label, image, ingredientLines
}, i) => (
  <FoodCard
    key={id}
    index={i}
    label={label}
    image={image}
    ingredientLines={ingredientLines}
    cardClicked={this.cardClick}
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
