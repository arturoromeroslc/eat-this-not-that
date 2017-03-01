import React, { Component } from 'react'
import shortid from 'shortid'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import isEmpty from 'lodash.isempty'
import './Recommendation.css'

export default class Recommendation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTouch: null,
      showIndex: 0,
      direction: null,
      showIngredient: false
    }
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
  }

  onTitleClick(e) {
    
    /**
     * get the current active item and remove the active class, so we only have one item expanded at a time.
     */
    let listItems = document.getElementsByClassName('recommendation-list__item active')
    for (var i = listItems.length - 1; i >= 0; i--) {
      listItems[i].classList.remove('active');
    }


    let listItem = e.target.closest('.recommendation-list__item')
    let parent = listItem.parentNode;
    // let index = Array.prototype.indexOf.call(parent.children, listItem);
    let totalChildren = listItems.length;

    listItem.parentNode.classList.remove('selection--active')
    listItem.classList.toggle('active')
    listItem.parentNode.classList.add('selection--active')

    // if (index !== 0) {
      // let marginValue = index / totalChildren * 100 * -1
      // listItem.style.marginTop = marginValue + 'vh';
    // }
  }

  onBackClick(e) {
    e.stopPropagation()
    let listItem = e.target.closest('.recommendation-list__item')
    // listItem.style.marginTop = 0
    listItem.parentNode.classList.toggle('selection--active')
    listItem.classList.toggle('active')
  }

	render() {
    let displayBlock = {display: 'block'}

    if (this.props.value && !isEmpty(this.props.data.hits)) {
      return (
      <div className="recommendation-list">
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