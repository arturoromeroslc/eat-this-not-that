import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import './Recommendation.css';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTouch: null,
      showIndex: 0,
      direction: null

    };
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  };

  handleTouchStart(e) {
    console.log('start');
    if (e.touches.length !== 1) {
      return;
    }
    var touch = e.touches[0]
    this.setState({initialTouch: touch});
  }


  handleTouchMove(e) {
    let touch = e.touches[0];
    console.log(this.state.initialTouch.pageX - touch.pageX);
    if (Math.abs(touch.pageX < this.state.initialTouch.pageX) && ((this.state.initialTouch.pageX - touch.pageX) > 70)){
      this.setState({direction: 'left'});
    } else {
      this.setState({direction: null});
    }
  }

  handleTouchEnd(e) {
    console.log(this.props.data.hits.length, this.state.showIndex);
    if (this.state.direction === 'left') {
      if (this.props.data.hits.length - 1=== this.state.showIndex) {
        this.setState({showIndex: 0})
      } else {
        this.setState({showIndex: this.state.showIndex + 1})
      }

    }
  }

	render() {
    let displayBlock = {display: 'block'};

    if (this.props.value && !isEmpty(this.props.data.hits)) {
      return (
      	<div className="">
          {this.props.data.hits.map(function repeater(recipeObject, i) {
            return (
              <span className="displayNone" style={(i === this.state.showIndex) ? displayBlock : {}} key={i} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove}>
                <div className="recommendation__heading-container">
                  <h2 className="recommendation__heading-title">{recipeObject.recipe.label}</h2>
                </div>
                <img className="recommendation__image-round-border" src={recipeObject.recipe.image} />
                <p>{recipeObject.recipe.ingredientLines}</p>
              </span>
            )
          }.bind(this))}

      	</div>
      );
    } else if (this.props.value && isEmpty(this.props.data.hits)) {
    	return <div>No data for searched term</div>
    } else {
      return null;
    }

	}
}

export default Recommendation;