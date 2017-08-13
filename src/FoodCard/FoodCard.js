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
    const listItem = event.target.closest('.recommendation-list__item')

    // if (this.cacheLastActiveListItem) {
    //   this.cacheLastActiveListItem.classList.remove('active');
    // }

    // listItem.classList.add('active')
    this.props.cardClicked(index, this.props.recipeObject.recipe.label)
    // this.cacheLastActiveListItem = listItem;
  }

  onBackClick(event, index) {
    const expanded = false
    event.stopPropagation()
    let listItem = event.target.closest('.recommendation-list__item')
    this.props.cardClicked(index, this.props.recipeObject.recipe.label)
    // listItem.classList.toggle('active')
  }

  render() {
    const index = this.props.index
    const recipe = this.props.recipeObject.recipe
    const activeListItem = (this.props.selectedCards[index] === recipe.label) ? "recommendation-list__item active" : "recommendation-list__item"

    return (
      <li className={activeListItem}>
        <Title onClicked={(event) => this.onTitleClick(event, index)} label={recipe.label}/>
        <img className="recommendation-list__item-img" alt={recipe.label} src={recipe.image} />
        <BackArrow onClicked={(event) => this.onBackClick(event, index)}/>
        <IngredientsList ingredients={recipe.ingredients}/>
      </li>
    )
  }
}
