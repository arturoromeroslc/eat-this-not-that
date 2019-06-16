import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import FoodCard from '../FoodCard/FoodCard'

const flex = {
  display: 'flex',
  flexWrap: 'wrap',
}

export default class RecipeList extends Component {
  render() {
    const { data } = this.props

    if (data.length > 0) {
      return (
        <ul style={flex}>
          {data.map(
            ({ id, label, image, ingredientLines, calories, url }, i) => (
              <FoodCard
                key={id}
                index={i}
                label={label}
                image={image}
                url={url}
                ingredientLines={ingredientLines}
                cardClicked={this.cardClick}
                calories={calories}
              />
            ),
          )}
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

RecipeList.defaultProps = {
  data: [],
}

RecipeList.propTypes = {
  hasMore: PropTypes.bool.isRequired,
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
