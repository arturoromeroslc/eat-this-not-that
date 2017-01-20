import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Filter from './Filter/Filter';
import AutoComplete from './AutoComplete/AutoComplete';
import Recommendation from './Recommendation/Recommendation';
import './App.css';

let filtersSelected = [];

class App extends Component {
  constructor(props) {
    console.log('called', props);
    super(props);
    this.state = {
      foodValue: '',
      recommendationData: false,
      food: '',
      initialWindowLoad: true,
      showFilter: false,
      filtersSelected: []
    }
    this.handleChangeSetState = this.handleChangeSetState.bind(this);
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this);
    this.sendRecommendationRequest = this.sendRecommendationRequest.bind(this);
    this.setFoodAndMakeApiCall = this.setFoodAndMakeApiCall.bind(this);
    this.getReadyToSendRequestWithFilter = this.getReadyToSendRequestWithFilter.bind(this);
    this.sendRecommendationRequest = debounce(this.sendRecommendationRequest, 300);
  }

  handleChangeSetState(value) {
    this.setState({foodValue: value});
  }

  toggleFilterMenu() {
    this.setState({showFilter: !this.state.showFilter});
    console.log(this.state.showFilter);
  }

  setFoodAndMakeApiCall(foodValue) {
    let dietFilter;
    
    if (filtersSelected.length > 0) {
      dietFilter = `&diet=${filtersSelected}`
    } else {
      dietFilter = ''
    }

    this.setState({food: foodValue});
    this.sendRecommendationRequest(foodValue, dietFilter);
  }

  getReadyToSendRequestWithFilter(filter) {
    filtersSelected = filter.slice(0);

    let dietFilter;

    if (filtersSelected.length > 0) {
      dietFilter = `&diet=${filtersSelected}`
    } else {
      dietFilter = ''
    }

    let foodValue = this.state.food.trim(); 

    if (foodValue.length > 0) {
      this.sendRecommendationRequest(foodValue, dietFilter);
    }
  }

  sendRecommendationRequest(food, dietFilter) {
    var config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    return axios.get(`https://api.edamam.com/search?q=${food}&app_key=0709d5dfba60edefb6abf1ec1d953fe5&from=0&to=100&calories=gte%20591,%20lte%20722${dietFilter}`, {}, config)
      .then(response => {
        this.setState({
          recommendationData: response.data,
          initialWindowLoad: false
        });
      })
  }  

  render() {
    let visible = {display: 'block'};
    let hidden = {display: 'none'};
    console.log('called render', this.state.initialWindowLoad);

    return (
      <div>
        <Filter show={this.state.showFilter} onToggleFilterMenu={this.toggleFilterMenu} onSelectionOfFilters={this.getReadyToSendRequestWithFilter}/>
        <div className="app">
          <div className="app__header">
            <div className="flex-space-between app__header__container">
              <h2
                style={(this.state.initialWindowLoad) ? visible : hidden}
                className="app__header__heading">
                Eat This, Not That.
              </h2>
              <span onClick={this.toggleFilterMenu}>Filter</span>
            </div>
            <AutoComplete onSelectedItem={this.setFoodAndMakeApiCall} onChangedInputValue={this.handleChangeSetState} value={this.state.foodValue}/>
            <p>Find alternative cooking recipes for your cravings.</p>
          </div>
          <Recommendation value={this.state.foodValue} data={this.state.recommendationData}/>
        </div>
      </div>
    );
  }
}

export default App;
