import React, { Component } from 'react'
import PropTypes from 'prop-types';
import shortid from 'shortid'
import './FoodCard.css'

export default class FoodCard extends Component {
  constructor(props) {
    super(props)
    this.cacheLastActiveListItem = false;
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)
  }

  onTitleClick(event, index) {
    this.props.cardClicked(index, this.props.recipeObject.label)
  }

  onBackClick(event, index) {
    this.props.cardClicked(index, this.props.recipeObject.label)
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
    const { index } = this.props
    const activeListItem = (this.props.selectedCards[index] === this.props.recipeObject.label) ? 'recommendation-list__item active' : 'recommendation-list__item'

    return (
      <li className={activeListItem}>
        <div className="flex-space-between">
          <button
            className="back-arrow"
            onClick={event => this.onBackClick(event, index)}
            onKeyUp={event => this.onBackClick(event, index)}
            tabIndex="-1"
          >
            X
          </button>
          <button
            className="recommendation-list__item-title"
            onKeyUp={event => this.onTitleClick(event, index)}
            onClick={event => this.onTitleClick(event, index)}
            text={this.props.recipeObject.label}
          >
            {this.props.recipeObject.label}
          </button>
          <button
            className="food-card__action-text"
            onKeyUp={event => this.onSaveClick(event, this.props.recipeObject)}
            onClick={event => this.onSaveClick(event, this.props.recipeObject)}
          >
            Add to Fave
          </button>
        </div>
        <img className="recommendation-list__item-img" alt={this.props.recipeObject.label} src={this.props.recipeObject.image} />
        <ul className="recommendation-list__unordered-container">
          {this.props.recipeObject.ingredientLines.map(ingredient => (
            <li key={shortid.generate()}>{ingredient}</li>
          ))}
        </ul>
      </li>
    )
  }
}

FoodCard.propTypes = {
  cardClicked: PropTypes.func,
  recipeObject: PropTypes.shape({
    recipe: PropTypes.shape({
      label: PropTypes.string
    })
  }),
  index: PropTypes.number,
  selectedCards: PropTypes.shape(),
}
