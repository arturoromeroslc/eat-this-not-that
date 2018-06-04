import React, { Component } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import forEach from 'lodash.foreach'
import Filter from './Filter/Filter'
import AutoComplete from './AutoComplete/AutoComplete'
import List from './List/List'
import dataNormalizer from './utils/normalize'
import './App.css'

const DOMAIN = 'https://api.edamam.com/search?q='
const APP_ID_AND_KEY = '&app_id=334597fd&app_key=1885eb04264cd11a86208ee4c489574e'
const ANCHOR = '&from=0&to=25&'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommendationData: undefined,
      foodSearchTerm: '',
      showFilter: false,
      dietFilter: '',
      totalCount: 0,
    }
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
    this.sendRecommendationRequest = this.sendRecommendationRequest.bind(this)
    this.setFoodAndMakeApiCall = this.setFoodAndMakeApiCall.bind(this)
    this.getRecoomendationListWithDietFilter = this.getRecoomendationListWithDietFilter.bind(this)
    this.sendRecommendationRequest = debounce(this.sendRecommendationRequest, 300)
  }

  /**
   * When a user selelects an item from the autoComplete dropdown. setup up the value to called into
   * the api request.
   * @param {String} foodValue food value that will be added to the api call.
   */
  setFoodAndMakeApiCall(foodSearchTerm) {
    this.setState({ foodSearchTerm })
    this.sendRecommendationRequest(foodSearchTerm, this.state.dietFilter)
  }

  /**
   * Show hide the filter menu
   */
  toggleFilterMenu() {
    this.setState(prevState => ({ showFilter: !prevState.showFilter }))
  }

  /**
   * When a user selects a filter setup a filter object that will be passed to the api call.
   * @param  {string} filter value of filter selected
   */
  getRecoomendationListWithDietFilter(filterObject) {
    let dietFilter = ''

    if (!isEmpty(filterObject)) {
      forEach(filterObject, (filterArray, key) => {
        if (!isEmpty(filterArray)) {
          dietFilter += `&${key}=${filterArray}`
        }
      })
    }

    this.setState({ dietFilter })

    if (this.state.foodSearchTerm.trim().length > 0) {
      this.sendRecommendationRequest(this.state.foodSearchTerm, dietFilter)
    }
  }

  /**
   * Send Api call
   * @param  {String} food value of food to send
   * @param  {String} dietFilter stringified array to send in api call
   */
  sendRecommendationRequest(foodSearchTerm, dietFilter) {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }

    return axios.get(`${DOMAIN}${foodSearchTerm}${APP_ID_AND_KEY}${ANCHOR}${dietFilter}`, {}, config)
      .then((response) => {
        this.setState({
          recommendationData: dataNormalizer(response.data),
          totalCount: response.data.count,
        })
      })
  }

  render() {
    const totalCountString = this.state.totalCount > 0 ? `Total alternatives: ${this.state.totalCount}` : ''

    return (
      <div>
        <Filter
          show={this.state.showFilter}
          onToggleFilterMenu={this.toggleFilterMenu}
          onSelectionOfFilters={this.getRecoomendationListWithDietFilter}
        />
        <div className="app">
          <div className="app__header">
            <div className="flex-space-between app__header__container">
              <h2 className="app__header__heading">Eat This, Not That.</h2>
              <button
                onKeyDown={this.toggleFilterMenu}
                onClick={this.toggleFilterMenu}
              >Filter
              </button>
            </div>
            <AutoComplete
              onSelectedItem={this.setFoodAndMakeApiCall}
            />
            <p>Find alternative cooking recipes for your cravings.</p>
            <span>{totalCountString}</span>
          </div>
          <List data={this.state.recommendationData}/>
        </div>
      </div>
    )
  }
}
