import React, { Component } from 'react'
import shortid from 'shortid'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import isEmpty from 'lodash.isempty'
import './Recommendation.css'

let cacheLastActiveListItem;

export default class Recommendation extends Component {
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
    if (this.props.value && !isEmpty(this.props.data.hits)) {
      return (
      <div ref={(div) => { this.listParentElement = div; }} className="recommendation-list">
          {this.props.data.hits.map(function(recipeObject, i) {
            return (
              <div
                className="recommendation-list__item"
                key={shortid.generate()}>
                <span
                  onClick={this.onTitleClick}
                  className="recommendation-list__item-title">
                  {recipeObject.recipe.label}
                </span>
                <p>
                  <a
                    className="back-arrow"
                    onClick={this.onBackClick}
                    tabIndex="-1">
                    X
                  </a>
                  <img
                    className="recommendation-list__item-img"
                    alt={recipeObject.recipe.label}
                    src={recipeObject.recipe.image}
                  />
                  <p>
                    <ul>{recipeObject.recipe.ingredients.map(function(ingredient, key) {
                        return <li key={`ingredient-${key}`}>{ingredient.food}</li>
                      })}
                    </ul>
                  </p>
                </p>
              </div>
            )
          }.bind(this))}
      	</div>
      )
    } else if (this.props.value && isEmpty(this.props.data.hits)) {
    	return <div>No data for searched term</div>
    } else {
      return null
    }
	}
}