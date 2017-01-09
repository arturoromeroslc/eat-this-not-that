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
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    console.log('called click');
  }

  handleTouchStart(e) {
    let touch = e.touches[0]
    this.setState({direction: null});
    this.setState({initialTouch: touch});
  }

  handleTouchMove(e) {
    let touch = e.touches[0];
    
    if (Math.abs(touch.pageX < this.state.initialTouch.pageX) && ((this.state.initialTouch.pageX - touch.pageX) > 35)){
      this.setState({direction: 'left'});
    } else if (Math.abs(touch.pageX > this.state.initialTouch.pageX) && ((touch.pageX - this.state.initialTouch.pageX) > 35)) {
      this.setState({direction: 'right'});
    } else {
      this.setState({direction: null});
    }
  }

  handleTouchEnd(e) {
    let dataLength = this.props.data.hits.length - 1;

    if (this.state.direction === 'left') {
      if (dataLength !== this.state.showIndex) {
        this.setState({showIndex: this.state.showIndex + 1})
      } else {
        this.setState({showIndex: 0})
      }
    } else if (this.state.direction === 'right') {
      if (this.state.showIndex === 0) {
        this.setState({showIndex: dataLength})
      } else {
        this.setState({showIndex: this.state.showIndex - 1})
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
              <div
                className="recommendation__card--is-hidden"
                style={(i === this.state.showIndex) ? displayBlock : {}}
                key={i}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                onTouchMove={this.handleTouchMove}
                onClick={this.handleClick}>
                <div className="recommendation__card-heading-container">
                  <h2 className="recommendation__card-heading-title">{recipeObject.recipe.label}</h2>
                </div>
                <img className="recommendation__card-image-round-border" src={recipeObject.recipe.image} />
                <p>{recipeObject.recipe.ingredientLines}</p>
              </div>
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