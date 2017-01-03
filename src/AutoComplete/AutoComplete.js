import axios from 'axios';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import './AutoComplete.css';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.getAutoCompleteResults = this.getAutoCompleteResults.bind(this);
    this.state = {autoCompleteData: []}
    this.getAutoCompleteResults = debounce(this.getAutoCompleteResults, 300);
  }

  /**
   * get the value for the input
   * @param  {Object} e event object passed in
   */
  handleInputSearchChange(e) {
    let value = e.target.value;
    
    if (e.target.value.length > 0) {
      this.getAutoCompleteResults(e.target.value)
      this.props.onChangedInputValue(value);
    } else {
      this.state = {autoCompleteData: []}
      this.props.onChangedInputValue(value);
    }
  }

  /**
   * when we click a list item call the prop onChange which will send an api call to get recipes
   * @param  {String} text item which was clicked
   */
  handleClickListItem(text) {
    this.props.onChangedInputValue(text);
    this.props.onSelectedItem(text)
    this.state = {autoCompleteData: []}
  }

  /**
   * Make api call after 300 ms debouce to get auto complete results.  After 200 set autoCompleteData value to return.
   * @param  {String} value string to set as query parameter
   */
  getAutoCompleteResults(value) {
    console.log('hey');
    axios.get(`https://api.nutritionix.com/v2/autocomplete?q=${value}&appId=be48f72d&appKey=36843f47de3c76347879e12f49cbfcf4`)
      .then(response => {
        this.setState({autoCompleteData: response.data})
      })
      .catch(response => {
        console.log(response);
      })
  }

  render() {
    let borderTopStyle = {borderTop: '1px solid lightgray'};

    const listItems = this.state.autoCompleteData.map((data) =>
      <li className="autocomplete__list-item" onClick={(event) => this.handleClickListItem(data.text)} key={data.id}>{data.text}</li>
    );

    return (
      <span>
        <span className="autocomplete__icon">⚲</span>
        <input
          className="autocomplete__input"
          placeholder="search"
          type="search"
          autoFocus
          value={this.props.value}
          onChange={this.handleInputSearchChange}
        />
        <ul style={(this.state.autoCompleteData.length > 0) ? borderTopStyle : {}} className="autocomplete__list">
          {listItems}
        </ul> 
      </span>
    )
  }
}

export default AutoComplete;