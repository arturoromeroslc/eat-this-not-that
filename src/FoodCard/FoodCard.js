import React, { Component } from 'react'
import shortid from 'shortid'
import './FoodCard.css'

function Title({ onClicked, label }) {
  return (
    <span
      onClick={onClicked}
      className="recommendation-list__item-title">
      {label}
    </span>
  )
}

function BackArrow({onClicked}) {
  return (
    <a
      className="back-arrow"
      onClick={onClicked}
      tabIndex="-1">
      X
    </a>
  )
}

function IngredientsList({ingredients}) {
  return (
    <ul>{ingredients.map(function(ingredient) {
        return <li key={shortid.generate()}>{ingredient.food}</li>
      })}
    </ul>
  )
}

export default class FoodCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.cacheLastActiveListItem = false;
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
  }

  onTitleClick(event, index) {
    this.props.cardClicked(index, this.props.recipeObject.recipe.label)
  }

  onBackClick(event, index) {
    this.props.cardClicked(index, this.props.recipeObject.recipe.label)
  }

  render() {
    const index = this.props.index
    const recipe = this.props.recipeObject.recipe
    const activeListItem = (this.props.selectedCards[index] === recipe.label) ? "recommendation-list__item active" : "recommendation-list__item"

    return (
      <li className={activeListItem}>
        <div className="flex-space-between">
          <BackArrow onClicked={(event) => this.onBackClick(event, index)}/>
          <Title onClicked={(event) => this.onTitleClick(event, index)} label={recipe.label}/>
          <span className="food-card__action-text">Add to Fave</span>
        </div>
        <img className="recommendation-list__item-img" alt={recipe.label} src={recipe.image} />
        <IngredientsList ingredients={recipe.ingredients}/>
      </li>
    )
  }
}
