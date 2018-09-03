import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import forEach from 'lodash.foreach'
import Typography from '@material-ui/core/Typography'
<<<<<<< HEAD
=======
>>>>>>> a949f1d... add responsive cards
=======
>>>>>>> 23a54fb... wip
import Filter from './Filter/Filter'
import AutoComplete from './AutoComplete/AutoComplete'
import List from './List/List'
import dataNormalizer from './utils/normalize'
import './App.css'
import Placeholder from './Placeholder/Placeholder'

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
      authed: false,
      data: undefined,
      foodSearchTerm: '',
      showFilter: false,
      dietFilter: '',
      totalCount: 0,
    }
    this.sendRecommendationRequest = debounce(
      this.sendRecommendationRequest,
      300,
    )
  }

  onLoginClick = () => this.setState({ authed: true })

  onLogoutClick = () => this.setState({ authed: false })

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

  toggleFilterMenu = () =>
    this.setState(prevState => ({ showFilter: !prevState.showFilter }))

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
            data: dataNormalizer(result),
            totalCount: result.count,
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
    const { error, isLoaded, totalCount, authed, data, fetching } = this.state

    const appClass = data ? 'app app-percent' : 'app app-vh'
<<<<<<< HEAD
=======
    let list

    if (error) {
      list = <div>Error: {error.message}</div>
    } else if (fetching && !isLoaded) {
      list = <Placeholder />
    } else {
      list = <List data={recommendationData} />
    }

    const appClass = recommendationData ? 'app app-percent' : 'app app-vh'
>>>>>>> a949f1d... add responsive cards
=======
>>>>>>> 23a54fb... wip

    const loginSection = authed ? (
      <button onClick={this.onLogoutClick} data-testid="logout">
        Logout
      </button>
    ) : (
      <React.Fragment>
        <a
          href="https://eatthis.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=j0rr0pdrk68hrjrv9phab6qdt&redirect_uri=https://localhost"
          onClick={this.onLoginClick}
          data-testid="login"
        >
          Login
        </a>
        <button data-testid="register">Register</button>
      </React.Fragment>
    )

    return (
      <div>
        <Filter
          show={this.state.showFilter}
          onToggleFilterMenu={this.toggleFilterMenu}
          onSelectionOfFilters={this.getRecoomendationListWithDietFilter}
        />
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
              {loginSection}
            </div>
            <AutoComplete onSelectedItem={this.setFoodAndMakeApiCall} />
            <Typography paragraph>
              {error
                ? 'Please search for a different recipe, we could not find an alternative at this time'
                : 'Find alternative cooking recipes for your cravings.'}
            </Typography>
            <Typography span>
              {totalCount > 0 && `Total alternatives: ${totalCount}`}
            </Typography>
          </div>
          {fetching && !isLoaded && <Placeholder />}
          {isLoaded && !error && <List data={data} />}
        </div>
      </div>
    )
  }
}
