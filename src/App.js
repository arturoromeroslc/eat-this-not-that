import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import forEach from 'lodash.foreach'
import ContentLoader from 'react-content-loader'
import Filter from './Filter/Filter'
import AutoComplete from './AutoComplete/AutoComplete'
import List from './List/List'
import dataNormalizer from './utils/normalize'
import './App.css'

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
      recommendationData: undefined,
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
            recommendationData: dataNormalizer(result),
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
    const {
      error,
      isLoaded,
      totalCount,
      authed,
      recommendationData,
      fetching,
    } = this.state

    let list

    if (error) {
      list = <div>Error: {error.message}</div>
    } else if (fetching && !isLoaded) {
      list = (
        <React.Fragment>
          <div style={{ backgroundColor: 'white', margin: '10px' }}>
            <ContentLoader
              height={475}
              width={400}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <circle cx="625" cy="-50" r="30" />
              <rect
                x="51.53"
                y="24"
                rx="4"
                ry="4"
                width="297"
                height="31.590000000000003"
              />
              <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
              <rect x="30" y="76.05" rx="5" ry="5" width="344" height="308" />
              <rect x="165" y="412.05" rx="0" ry="0" width="0" height="0" />
              <rect
                x="50"
                y="397.05"
                rx="0"
                ry="0"
                width="301.99"
                height="16"
              />
              <rect x="70" y="422.05" rx="0" ry="0" width="258" height="16" />
              <rect
                x="92"
                y="448.05"
                rx="0"
                ry="0"
                width="216.69"
                height="15"
              />
            </ContentLoader>
          </div>
          <div style={{ backgroundColor: 'white' }}>
            <ContentLoader
              height={475}
              width={400}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <circle cx="625" cy="-50" r="30" />
              <rect
                x="51.53"
                y="24"
                rx="4"
                ry="4"
                width="297"
                height="31.590000000000003"
              />
              <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
              <rect x="30" y="76.05" rx="5" ry="5" width="344" height="308" />
              <rect x="165" y="412.05" rx="0" ry="0" width="0" height="0" />
              <rect
                x="50"
                y="397.05"
                rx="0"
                ry="0"
                width="301.99"
                height="16"
              />
              <rect x="70" y="422.05" rx="0" ry="0" width="258" height="16" />
              <rect
                x="92"
                y="448.05"
                rx="0"
                ry="0"
                width="216.69"
                height="15"
              />
            </ContentLoader>
          </div>
        </React.Fragment>
      )
    } else {
      list = <List data={recommendationData} />
    }

    const appClass = recommendationData ? 'app app-percent' : 'app app-vh'

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
            <p>Find alternative cooking recipes for your cravings.</p>
            <span>{totalCount > 0 && `Total alternatives: ${totalCount}`}</span>
          </div>
          {list}
        </div>
      </div>
    )
  }
}
