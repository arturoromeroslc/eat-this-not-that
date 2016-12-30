import React, { Component } from 'react';
import './AutoComplete.css';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    const value = this.props.value;
    return (
      <span>
        <span className="autocomplete__icon">⚲</span>
        <input
          className="autocomplete__input"
          placeholder="search"
          type="search"
          autoFocus
          value={value}
          onChange={this.handleChange}
        />
      </span>
    )
  }
}

export default AutoComplete;