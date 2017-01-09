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
    this.state = {foodValue: '', recommendationData: '', food: ''}
    this.handleChangeSetState = this.handleChangeSetState.bind(this);
    this.sendRecommendationRequest = this.sendRecommendationRequest.bind(this);
    this.sendRecommendationRequest = debounce(this.sendRecommendationRequest, 300);
  }

  handleChangeSetState(value) {
    this.setState({foodValue: value});
  }

  sendRecommendationRequest(food) {
    this.setState({food: food})
    var config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    axios.get(`http://food2fork.com/api/search?key=888d6280d7887e48587971d37c6e88f2&q=${food}`)
      .then(response => {
        return axios.get(`http://food2fork.com/api/get?key=888d6280d7887e48587971d37c6e88f2&rId=${response.data.recipes[0].recipe_id}`)

        this.setState({
          recommendationData: response.data
        });
      })
      .then(response => {
        console.log(response.data.recipe.ingredients);
        let ingredients = response.data.recipe.ingredients[0].split(' ').join(',') + response.data.recipe.ingredients[1].split(' ').join(',') + response.data.recipe.ingredients[2].split(' ').join(',') + response.data.recipe.ingredients[3].split(' ').join(',');
        
        console.log(ingredients);
        ingredients = ingredients.replace(/[0-9]/g, '')
        console.log(ingredients);

      axios.get(`http://www.recipepuppy.com/api/?i=${ingredients}`)
        .then(response => {
          console.log(response);
          let recipeNames = response.data.results.map(function getTitle(obj) {
            console.log(obj, obj.title);
            return obj.title
          })
        axios.get(`https://api.edamam.com/search?q=${recipeNames[0]}&app_id=ecb5988e&app_key=f60f52e1598b9838fa31de996441a797&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`, {}, config)
          .then(response => {
            // this.setState({
            //   recommendationData: response.data
            // });
          })
        })
      })


    // return axios.get(`https://api.edamam.com/search?q=${food}&app_id=ecb5988e&app_key=f60f52e1598b9838fa31de996441a797&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`, {}, config)
    //   .then(response => {
    //     this.setState({
    //       recommendationData: response.data
    //     });
    //   })
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
          <p>Find alternative cooking recipes for your cravings.</p>
        </div>
        <Recommendation value={this.state.foodValue} data={this.state.recommendationData}/>
      </div>
    );
  }
}

export default App;
