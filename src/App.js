import React, { Component } from 'react';
import logo from './logo.svg';
import AutoComplete from './AutoComplete/AutoComplete';
import Recommendation from './Recommendation/Recommendation';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {foodValue: ''}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({foodValue: value})
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
          <AutoComplete onChange={this.handleChange} value={this.state.foodValue}/>
          <p>Find alternative cooking recipes for <strong>Cookies</strong>, <strong>hamburgers</strong>, <strong>Kale</strong>, <strong>nutella</strong></p>
        </div>
        <Recommendation input={this.state.foodValue}/>
      </div>
    );
  }
}

export default App;
