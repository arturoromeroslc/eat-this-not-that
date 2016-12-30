import React, { Component } from 'react';
import axios from 'axios';
import './Recommendation.css';

class Recommendation extends Component {
	constructor(props) {
		super(props);
		this.state = {recommendationData: ''};
	};

  sendRequest(food) {
  	var me;
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

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.input !== this.state.recommendationData) {
    	console.log(nextProps.input);
    	this.sendRequest(nextProps.input);
    }
  }

	render() {
    if (this.props.input && this.state.recommendationData.hits) {
      return (
      	<div className="food__card-container">
      		<div className="food__heading-container">
		      	<h2 className="food__heading-title">{this.state.recommendationData.hits[0].recipe.label}</h2>
	      	</div>
	      	<img className="image-round-border" src={this.state.recommendationData.hits[0].recipe.image} />
	      	<p>{this.state.recommendationData.hits[0].recipe.ingredientLines}</p>
      	</div>
      );
    } else if (this.props.input && !this.state.recommendationData.hits) {
    	return <div>Loading..</div>
    }

    return <div>Loading...</div>;
	}
}

export default Recommendation;