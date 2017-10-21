import axios from 'axios'
import debounce from 'lodash.debounce'
import Downshift from 'downshift'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './AutoComplete.css'

// const baseEndpoint = 'https://api.github.com/search/repositories?q='
const baseEndpoint = 'https://api.nutritionix.com/v2/autocomplete?q=';
const appId = '&appId=be48f72d&appKey=36843f47de3c76347879e12f49cbfcf4';

const propTypes = {
  onChangedInputValue: PropTypes.func,
  onSelectedItem: PropTypes.func,
  value: PropTypes.string
}

export default class AutoComplete extends Component {
  constructor(props) {
    super(props)
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this)
    this.handleSelectedItem = this.handleSelectedItem.bind(this)
    this.getAutoCompleteResults = this.getAutoCompleteResults.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      autoCompleteData: [],
      selectedIndex: 0,
      items: []
    }
    this.getAutoCompleteResults = debounce(this.getAutoCompleteResults, 300)
  }

  /**
   * get the value for the input
   * @param  {Object} e event object passed in
   */
  handleInputSearchChange(e) {
    let value = e.target.value

    if (value.length > 0) {
      this.getAutoCompleteResults(value)
      this.props.onChangedInputValue(value)
    } else {
      this.setState({
        autoCompleteData: [],
        selectedIndex: 0
      })
    }
    this.props.onChangedInputValue(value)
  }

  /**
   * when we click a list item call the prop onChange which will send an api call to get recipes
   * @param  {String} text item which was clicked
   */
  handleSelectedItem(text) {
    this.props.onChangedInputValue(text)
    this.props.onSelectedItem(text)
    this.setState({
      autoCompleteData: [],
      selectedIndex: 0
    })
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
      })
  }

  /**
   * Handle the keydown of the input field.  This function will also handle the highlighted index from the ul element.
   * @param  {Object} event object passed in by React
   */
  handleKeyDown(e) {
    if (this.state.autoCompleteData.length === 0) { return }

    const DOWN_ARROW_KEY = 40
    const UP_ARROW_KEY = 38
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
        })
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
      })
    }
  }

  onChange() {
    console.log('hi');
  }

  render() {
    return (
      <span>
        <span className="autocomplete__icon">⚲</span>
        <Downshift onChange={this.props.onSelectedItem}>
          {({
            selectedItem,
            getInputProps,
            getItemProps,
            highlightedIndex,
            isOpen,
          }) => {
            return (
              <div>
                <input
                  autoFocus
                  className="autocomplete__input"
                  placeholder="search"
                  type="search"
                  {...getInputProps({
                    onChange: event => {
                      // would probably be a good idea to debounce this
                      // 😅
                      const value = event.target.value
                      if (!value) {
                        return
                      }

                      axios
                        .get(baseEndpoint + value + appId)
                        .then(response => {
                          debugger;
                          const items = response.data.map(
                            item => item.text
                          ) // Added ID to make it unique
                          this.setState({items})
                        })
                        .catch(error => {
                          console.log(error)
                        })
                    },
                  })}
                />
                {isOpen && (
                  <div>
                    {this.state.items.map((item, index) => (
                      <div
                        key={index}
                        {...getItemProps({
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'gray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }}
        </Downshift>
      </span>
    )
  }
}

AutoComplete.propTypes = propTypes
