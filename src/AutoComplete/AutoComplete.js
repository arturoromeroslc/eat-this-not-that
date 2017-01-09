import axios from 'axios';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import './AutoComplete.css';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
    this.handleSelectedItem = this.handleSelectedItem.bind(this);
    this.getAutoCompleteResults = this.getAutoCompleteResults.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      autoCompleteData: [],
      selectedIndex: 0
    };
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
      this.state = {
        autoCompleteData: [],
        selectedIndex: 0
      }
    }
    this.props.onChangedInputValue(value);
  }

  /**
   * when we click a list item call the prop onChange which will send an api call to get recipes
   * @param  {String} text item which was clicked
   */
  handleSelectedItem(text) {
    this.props.onChangedInputValue(text);
    this.props.onSelectedItem(text);
    this.setState({
      autoCompleteData: [],
      selectedIndex: 0
    });
  }

  /**
   * Make api call after 300 ms debouce to get auto complete results.  After 200 set autoCompleteData value to return.
   * @param  {String} value string to set as query parameter
   */
  getAutoCompleteResults(value) {
    axios.get(`https://api.nutritionix.com/v2/autocomplete?q=${value}&appId=be48f72d&appKey=36843f47de3c76347879e12f49cbfcf4`)
      .then(response => {
        this.setState({
          autoCompleteData: response.data
        })
      })
      .catch(response => {
        console.log(response);
      })
  }

  /**
   * Handle the keydown of the input field.  This function will also handle the highlighted index from the ul element.
   * @param  {Object} event object passed in by React
   */
  handleKeyDown(e) {
    if (this.state.autoCompleteData.length === 0) { return; }

    const DOWN_ARROW_KEY = 40;
    const UP_ARROW_KEY = 38;
    const ENTER = 13

    if (e.keyCode === DOWN_ARROW_KEY) {
      if (this.state.selectedIndex === this.state.autoCompleteData.length - 1) {
        this.setState({
          selectedIndex: 0
        })
      } else {
        this.setState({
          selectedIndex: this.state.selectedIndex + 1
        })
      }
    }

    if (e.keyCode === UP_ARROW_KEY) {
      if (this.state.selectedIndex === 0) {
        this.setState({
          selectedIndex: 9
        });
      } else {
        this.setState({
          selectedIndex: this.state.selectedIndex - 1
        })
      }
    }

    if (e.keyCode === ENTER) {
      this.handleSelectedItem(this.state.autoCompleteData[this.state.selectedIndex].text)
      this.setState({
        selectedIndex: 0
      });
      console.log(this.state.selectedIndex);
    }
  }

  render() {
    let borderTopStyle = {borderTop: '1px solid lightgray'},
        seleectedBackgroundColor = {backgroundColor: 'darkgrey'};

    const listItems = this.state.autoCompleteData.map((data, i) =>
      <li
        style={(this.state.selectedIndex === i) ? seleectedBackgroundColor : {}}
        className="autocomplete__list-item"
        onClick={(event) => this.handleSelectedItem(data.text)}
        key={data.id}>{data.text}
      </li>
    );

    return (
      <span>
        <span className="autocomplete__icon">⚲</span>
        <input
          autoFocus
          className="autocomplete__input"
          placeholder="search"
          type="search"
          value={this.props.value}
          onChange={this.handleInputSearchChange}
          onKeyDown={this.handleKeyDown}
        />
        <ul style={(this.state.autoCompleteData.length > 0) ? borderTopStyle : {}} className="autocomplete__list">
          {listItems}
        </ul> 
      </span>
    )
  }
}

AutoComplete.propTypes = {
  onChangedInputValue: React.PropTypes.func,
  onSelectedItem: React.PropTypes.func,
  value: React.PropTypes.string
};

export default AutoComplete;