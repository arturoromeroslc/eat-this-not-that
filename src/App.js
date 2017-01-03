import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import logo from './logo.svg';
import AutoComplete from './AutoComplete/AutoComplete';
import Recommendation from './Recommendation/Recommendation';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {foodValue: '', recommendationData: ''}
    this.handleChangeSetState = this.handleChangeSetState.bind(this);
    this.sendRecommendationRequest = this.sendRecommendationRequest.bind(this);
    this.sendRecommendationRequest = debounce(this.sendRecommendationRequest, 300);
  }

  handleChangeSetState(value) {
    this.setState({foodValue: value});
  }

  sendRecommendationRequest(food) {
    var config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    return axios.get(`https://api.edamam.com/search?q=${food}&app_id=ecb5988e&app_key=f60f52e1598b9838fa31de996441a797&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`, {}, config)
      .then(response => {
        this.setState({
          recommendationData: response.data
        });
      })
  }  

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <div className="flex-space-between app__header__container">
            <img src="http://www.clker.com/cliparts/n/H/d/c/L/W/restaurant-hi.png" className="app__logo" alt="logo" />
            <h2 className="app__header__heading">Eat This, Not That.</h2>
            <span>menu</span>
          </div>
          <AutoComplete onSelectedItem={this.sendRecommendationRequest} onChangedInputValue={this.handleChangeSetState} value={this.state.foodValue}/>
          <p>Find alternative cooking recipes for <strong>Cookies</strong>, <strong>hamburgers</strong>, <strong>Kale</strong>, <strong>nutella</strong></p>
        </div>
        <Recommendation value={this.state.foodValue} data={this.state.recommendationData}/>
      </div>
    );
  }
}

export default App;
