import React, { Component } from 'react'
import FoodCard from '../FoodCard/FoodCard'
import shortid from 'shortid'
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
  }

  cardClick(isExpanded) {
    if (isExpanded) {
      this.listParentElement.classList.add('selection--active')
    } else {
      this.listParentElement.classList.remove('selection--active')
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
