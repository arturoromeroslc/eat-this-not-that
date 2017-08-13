import React, { Component } from 'react'
import shortid from 'shortid'
import './List.css'

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

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTouch: null,
      showIndex: 0,
      direction: null,
      showIngredient: false
    }
    this.cacheLastActiveListItem = false;
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
  }

  /**
   * Expand the clicked list card
   * @param  {Object} e the event object
   */
  onTitleClick(e) {
    let listItem = e.target.closest('.recommendation-list__item')

    if (this.cacheLastActiveListItem) {
      this.cacheLastActiveListItem.classList.remove('active');
    }

    listItem.classList.add('active')
    this.listParentElement.classList.add('selection--active')
    this.cacheLastActiveListItem = listItem;
  }

  /**
   * Close the current expanded list card
   * @param  {Object} e event object from click
   */
  onBackClick(e) {
    e.stopPropagation()
    let listItem = e.target.closest('.recommendation-list__item')
    this.listParentElement.classList.remove('selection--active')
    listItem.classList.toggle('active')
  }

	render() {
    if (this.props.value && this.props.data.hits !== undefined) {
      return (
      <ul ref={(div) => { this.listParentElement = div; }} className="recommendation-list">
          {this.props.data.hits.map(function(recipeObject, i) {
            return (
              <li className="recommendation-list__item" key={shortid.generate()}>
                <Title onClicked={this.onTitleClick} label={recipeObject.recipe.label}/>
                <BackArrow onClicked={this.onBackClick}/>
                <img className="recommendation-list__item-img" alt={recipeObject.recipe.label} src={recipeObject.recipe.image} />
                <IngredientsList ingredients={recipeObject.recipe.ingredients}/>
              </li>
            )
          }.bind(this))}
      	</ul>
      )
    } else if (this.props.value && this.props.data.hits && this.props.data.hits.length === 0) {
    	return <div>No data for searched term</div>
    } else {
      return null
    }
	}
}
