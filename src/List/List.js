import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import FoodCard from '../FoodCard/FoodCard'

import './List.css'

export default class List extends Component {
  render() {
    const { data } = this.props

    if (data.length > 0) {
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
      return (
        <Typography paragraph>
          Please search for a different recipe, we could not find an alternative
          at this time.
        </Typography>
      )
    }

    return null
  }
}

List.defaultProps = {
  data: [],
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      image: PropTypes.string,
      ingredientLines: PropTypes.array,
      calories: PropTypes.string,
    }),
  ),
}
