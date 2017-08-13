import React, { Component } from 'react'
import shortid from 'shortid'
import isEmpty from 'lodash.isempty'
import FoodCard from '../FoodCard/FoodCard'
import './List.css'

function objectWithoutProperties(obj, keys) {
  const target = {};
  for (let i in obj) {
      if (keys.indexOf(parseInt(i)) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
  }
  return target;
}

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTouch: null,
      selectedCards: {},
      showIndex: 0,
      direction: null,
      showIngredient: false
    }
    this.cardClick = this.cardClick.bind(this)
    this.state.selectedCards = {}
  }

  cardClick(index, label) {
    debugger;
    let newState

    if (this.state.selectedCards[index] === label) {
      newState = objectWithoutProperties(this.state.selectedCards, [index])
    } else {
      const newPropertyObject = {[index]: label}
      newState = Object.assign({}, this.state.selectedCards, newPropertyObject)
    }

    this.setState({selectedCards: newState})
  }

	render() {
    if (this.props.data.hits !== undefined) {
      const listClass = isEmpty(this.state.selectedCards) ? "recommendation-list" : "recommendation-list selection--active"

      return (
      <ul className={listClass}>
          {this.props.data.hits.map((recipeObject, i) => {
            return (
              <FoodCard key={shortid.generate()} index={i} recipeObject={recipeObject} cardClicked={this.cardClick} selectedCards={this.state.selectedCards}/>
            )
          })}
      	</ul>
      )
    } else if (this.props.data.hits && this.props.data.hits.length === 0) {
    	return <div>No data for searched term</div>
    } else {
      return null
    }
	}
}
