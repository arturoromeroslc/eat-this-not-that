import React, { Component } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import forEach from 'lodash.foreach'
import Filter from './Filter/Filter'
import AutoComplete from './AutoComplete/AutoComplete'
import List from './List/List'
import './App.css'

const domain = 'https://api.edamam.com/search?q='
const appKey = '&app_key=0709d5dfba60edefb6abf1ec1d953fe5'
const anchor = '&from=0&to=25&'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foodValue: '',
      recommendationData: false,
      food: '',
      initialWindowLoad: true,
      showFilter: false,
      dietFilter: ''
    }
    this.updateFoodValue = this.updateFoodValue.bind(this)
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
    this.sendRecommendationRequest = this.sendRecommendationRequest.bind(this)
    this.setFoodAndMakeApiCall = this.setFoodAndMakeApiCall.bind(this)
    this.sendRequestWithFilter = this.sendRequestWithFilter.bind(this)
    this.sendRecommendationRequest = debounce(this.sendRecommendationRequest, 300)
  }

  /**
   * Call back when user selects a value from the auto complete dropdown.
   * @param  {String} value The value chosen by the user from dropdown.
   */
  updateFoodValue(value) {
    this.setState({foodValue: value})
  }

  /**
   * Show hide the filter menu
   */
  toggleFilterMenu() {
    this.setState({showFilter: !this.state.showFilter})
  }

  /**
   * When a user selelects an item from the autoComplete dropdown. setup up the value to called into
   * the api request.
   * @param {String} foodValue food value that will be added to the api call.
   */
  setFoodAndMakeApiCall(foodValue) {
    this.setState({food: foodValue})
    this.sendRecommendationRequest(foodValue, this.state.dietFilter)
  }

  /**
   * When a user selects a filter setup a filter object that will be passed to the api call.
   * @param  {string} filter value of filter selected
   */
  sendRequestWithFilter(filterObject) {
    console.log('hello')
    let dietFilter = ''

    if (!isEmpty(filterObject)) {
      forEach(filterObject, function (filterArray, key) {
        if (!isEmpty(filterArray)) {
          dietFilter += `&${key}=${filterArray}`
        }
      })
    } else {
      dietFilter = ''
    }

    this.setState({dietFilter: dietFilter})

    if (this.state.food.trim().length > 0) {
      this.sendRecommendationRequest(this.state.food, dietFilter)
    }
  }

  /**
   * Send Api call
   * @param  {String} food value of food to send
   * @param  {String} dietFilter stringified array to send in api call
   */
  sendRecommendationRequest(food, dietFilter) {
    var config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }

    return axios.get(domain + food + appKey + anchor + dietFilter, {}, config)
      .then(response => {
        this.setState({
          recommendationData: response.data,
          initialWindowLoad: false
        })
      })
  }

  render() {
    const totalCountString = this.state.recommendationData.count > 0 ? `Total alternatives: ${this.state.recommendationData.count}` : ''

    return (
      <div>
        <Filter show={this.state.showFilter} onToggleFilterMenu={this.toggleFilterMenu} onSelectionOfFilters={this.sendRequestWithFilter}/>
        <div className="app">
          <div className="app__header">
            <div className="flex-space-between app__header__container">
              <h2 className="app__header__heading">Eat This, Not That.</h2>
              <span onClick={this.toggleFilterMenu}>Filter</span>
            </div>
            <AutoComplete onSelectedItem={this.setFoodAndMakeApiCall} onChangedInputValue={this.updateFoodValue} value={this.state.foodValue}/>
            <p>Find alternative cooking recipes for your cravings.</p>
            <span>{totalCountString}</span>
          </div>
          <List value={this.state.foodValue} data={this.state.recommendationData.hits}/>
        </div>
      </div>
    )
  }
}
