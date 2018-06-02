import React, { Component } from 'react'
import shortid from 'shortid'
import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types';
import FoodCard from '../FoodCard/FoodCard'
import './List.css'

function objectWithoutProperties(obj, keys) {
  const target = {};
  for (const i in obj) {
    if (keys.indexOf(parseInt(i, 10)) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCards: {},
    }
    this.cardClick = this.cardClick.bind(this)
  }

  cardClick(index, label) {
    let newState

    if (this.state.selectedCards[index] === label) {
      newState = objectWithoutProperties(this.state.selectedCards, [index])
    } else {
      const newPropertyObject = { [index]: label }
      newState = Object.assign({}, this.state.selectedCards, newPropertyObject)
    }

    this.setState({ selectedCards: newState })
  }

  render() {
    if (this.props.data !== undefined) {
      const listClass = isEmpty(this.state.selectedCards) ? 'recommendation-list' : 'recommendation-list selection--active'

      return (
        <ul className={listClass}>
          {this.props.data.map((recipeObject, i) => (
            <FoodCard
              key={shortid.generate()}
              index={i}
              recipeObject={recipeObject}
              cardClicked={this.cardClick}
              selectedCards={this.state.selectedCards}
            />
            ))}
        </ul>
      )
    } else if (this.props.data && this.props.data.length === 0) {
      return <div>No data for searched term</div>
    }

    return null
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
}
