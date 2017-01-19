import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Filter from './Filter/Filter';
import AutoComplete from './AutoComplete/AutoComplete';
import Recommendation from './Recommendation/Recommendation';
import './App.css';

class App extends Component {
  constructor(props) {
    console.log('called', props);
    super(props);
    this.state = {
      foodValue: '',
      recommendationData: false,
      food: '',
      initialWindowLoad: true,
      showFilter: false
    }
    this.handleChangeSetState = this.handleChangeSetState.bind(this);
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this);
    this.sendRecommendationRequest = this.sendRecommendationRequest.bind(this);
    this.sendRecommendationRequest = debounce(this.sendRecommendationRequest, 300);
  }

  handleChangeSetState(value) {
    this.setState({foodValue: value});
  }

  toggleFilterMenu() {
    this.setState({showFilter: !this.state.showFilter});
    console.log(this.state.showFilter);
  }

  sendRecommendationRequest(food) {
    this.setState({food: food})
    var config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    return axios.get(`https://api.edamam.com/search?q=${food}&app_key=0709d5dfba60edefb6abf1ec1d953fe5&from=0&to=100&calories=gte%20591,%20lte%20722&health=red-meat-free`, {}, config)
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
        <Filter show={this.state.showFilter} onToggleFilterMenu={this.toggleFilterMenu}/>
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
            <AutoComplete onSelectedItem={this.sendRecommendationRequest} onChangedInputValue={this.handleChangeSetState} value={this.state.foodValue}/>
            <p>Find alternative cooking recipes for your cravings.</p>
          </div>
          <Recommendation value={this.state.foodValue} data={this.state.recommendationData}/>
        </div>
      </div>
    );
  }
}

export default App;
