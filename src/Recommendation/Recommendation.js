import React, { Component } from 'react';
import './Recommendation.css';

class Recommendation extends Component {
  constructor(props) {
    super(props);
  };

	render() {
    if (this.props.value && this.props.data.hits) {
      return (
      	<div className="recommendation__card-container">
      		<div className="recommendation__heading-container">
		      	<h2 className="recommendation__heading-title">{this.props.data.hits[0].recipe.label}</h2>
	      	</div>
	      	<img className="recommendation__image-round-border" src={this.props.data.hits[0].recipe.image} />
	      	<p>{this.props.data.hits[0].recipe.ingredientLines}</p>
      	</div>
      );
    } else if (this.props.value && !this.props.data.hits) {
    	return <div>Loading..</div>
    }

    return <div>Loading...</div>;
	}
}

export default Recommendation;