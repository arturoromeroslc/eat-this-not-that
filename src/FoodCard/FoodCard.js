import React, { Component } from 'react'
import shortid from 'shortid'
import './FoodCard.css'

function ActionText({ className, onClicked, text }) {
  return (
    <span
      onClick={onClicked}
      className={className}>
      {text}
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
    this.cacheLastActiveListItem = false;
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)
  }

  onTitleClick(event, index) {
    this.props.cardClicked(index, this.props.recipeObject.recipe.label)
  }

  onBackClick(event, index) {
    this.props.cardClicked(index, this.props.recipeObject.recipe.label)
  }

  onSaveClick(event, recipe) {
    let currentSession = JSON.parse(localStorage.getItem('Favs'));

    if (currentSession) {
      currentSession.push(recipe)
      localStorage.setItem('Favs', JSON.stringify(currentSession));
    } else {
      currentSession = [recipe]
      localStorage.setItem('Favs', JSON.stringify(currentSession));
    }
  }

  render() {
    const index = this.props.index
    const recipe = this.props.recipeObject.recipe
    const activeListItem = (this.props.selectedCards[index] === recipe.label) ? "recommendation-list__item active" : "recommendation-list__item"

    return (
      <li className={activeListItem}>
        <div className="flex-space-between">
          <BackArrow onClicked={(event) => this.onBackClick(event, index)}/>
          <ActionText className="recommendation-list__item-title" onClicked={(event) => this.onTitleClick(event, index)} text={recipe.label}/>
          <ActionText className="food-card__action-text" onClicked={(event) => this.onSaveClick(event, recipe)} text="Add to Fave"/>
        </div>
        <img className="recommendation-list__item-img" alt={recipe.label} src={recipe.image} />
        <IngredientsList ingredients={recipe.ingredients}/>
      </li>
    )
  }
}
