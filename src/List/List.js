import React, { Component } from 'react'
import shortid from 'shortid'
import isEmpty from 'lodash.isempty'
import FoodCard from '../FoodCard/FoodCard'
import './List.css'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTouch: null,
      showIndex: 0,
      direction: null,
      showIngredient: false
    }
    this.cardClick = this.cardClick.bind(this)
    this.selectedCards = {}
  }

  cardClick(index, label) {
    if (this.selectedCards[index] === label) {
      delete this.selectedCards[index];
    } else {
      this.selectedCards[index] = label
    }

    if (isEmpty(this.selectedCards)) {
      this.listParentElement.classList.remove('selection--active')
    } else {
      this.listParentElement.classList.add('selection--active')
    }
  }

	render() {
    if (this.props.value && this.props.data.hits !== undefined) {
      return (
      <ul ref={(div) => { this.listParentElement = div; }} className="recommendation-list">
          {this.props.data.hits.map((recipeObject, i) => {
            return (
              <FoodCard key={shortid.generate()} index={i} recipeObject={recipeObject} cardClicked={this.cardClick}/>
            )
          })}
      	</ul>
      )
    } else if (this.props.value && this.props.data.hits && this.props.data.hits.length === 0) {
    	return <div>No data for searched term</div>
    } else {
      return null
    }
	}
}
