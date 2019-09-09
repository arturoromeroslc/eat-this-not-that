import React, { Component, Suspense } from 'react'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import forEach from 'lodash.foreach'
import AutoComplete from './AutoComplete/AutoComplete'
import normalize from './utils/normalize'
import './App.css'

const Placeholder = React.lazy(() => import('./Placeholder/Placeholder'))
const RecipeList = React.lazy(() => import('./RecipeList/RecipeList'))
const FilterDrawer = React.lazy(() => import('./FilterDrawer/FilterDrawer'))

const DOMAIN = 'https://api.edamam.com/search?q='
const APP_ID_AND_KEY = process.env.REACT_APP_EDAMAM_API_KEY
const ANCHOR = '&from=0&to=25&'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      fetching: false,
      isLoaded: false,
      data: undefined,
      foodSearchTerm: '',
      showFilter: false,
      dietFilter: '',
      totalCount: 0,
      selectedFilters: {},
      hasMore: false,
    }
    this.sendRecommendationRequest = debounce(
      this.sendRecommendationRequest,
      300,
    )
  }

  setFoodAndMakeApiCall = foodSearchTerm => {
    this.setState({ foodSearchTerm })
    this.sendRecommendationRequest(foodSearchTerm, this.state.dietFilter)
  }

  getRecoomendationListWithDietFilter = filterObject => {
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

  updateSelectedFilters = selectedFilters => this.setState({ selectedFilters })

  toggleFilterMenu = () =>
    this.setState(prevState => ({
      showFilter: !prevState.showFilter,
    }))

  sendRecommendationRequest = (foodSearchTerm, dietFilter) => {
    this.setState({ fetching: true })
    return fetch(
      `${DOMAIN}${foodSearchTerm}${APP_ID_AND_KEY}${ANCHOR}${dietFilter}`,
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            fetching: false,
            data: normalize(result),
            totalCount: result.count,
            hasMore: result.more,
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            fetching: false,
            error,
          })
        },
      )
  }

  render() {
    const {
      error,
      isLoaded,
      totalCount,
      data,
      fetching,
      showFilter,
      selectedFilters,
      hasMore,
    } = this.state

    const appClass = data ? 'app app-percent' : 'app app-vh'

    return (
      <div>
        <Suspense fallback={null}>
          <FilterDrawer
            showFilter={showFilter}
            toggleFilterMenu={this.toggleFilterMenu}
            updateSelectedFilters={this.updateSelectedFilters}
            selectedFilters={selectedFilters}
            onToggleFilterMenu={this.toggleFilterMenu}
            onSelectionOfFilters={this.getRecoomendationListWithDietFilter}
          />
        </Suspense>
        <div className={appClass}>
          <div className="app__header">
            <div className="flex-space-between app__header__container">
              <h2 className="app__header__heading">Eat This, Not That.</h2>
              <button
                onKeyDown={this.toggleFilterMenu}
                onClick={this.toggleFilterMenu}
              >
                Filter
              </button>
            </div>
            <AutoComplete onSelectedItem={this.setFoodAndMakeApiCall} />
            <p>
              {error
                ? 'Please search for a different recipe, we could not find an alternative at this time'
                : 'Find alternative cooking recipes for your cravings.'}
            </p>
            {totalCount > 0 ?
              <span>
                <span>Total alternatives</span> <span id="total-count">{totalCount}</span>
              </span>
              : null}
          </div>
          {fetching &&
            !isLoaded && (
              <Suspense fallback={<div>Loading...</div>}>
                <Placeholder />
              </Suspense>
            )}
          {isLoaded &&
            !error && (
              <Suspense fallback={<div>Loading...</div>}>
                <RecipeList data={data} hasMore={hasMore} />
              </Suspense>
            )}
        </div>
      </div>
    )
  }
}
