import axios from 'axios'
import Downshift from 'downshift'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './AutoComplete.css'

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
    this.state = {
      autoCompleteData: [],
      selectedIndex: 0,
      items: []
    }
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
                      const value = event.target.value
                      if (!value) {
                        return
                      }
                      setTimeout(() => {
                        axios
                          .get(baseEndpoint + value + appId)
                          .then(response => {
                            const items = response.data.map(item => item.text)
                            this.setState({items})
                          })
                          .catch(error => {
                            console.log(error)
                          })
                      }, 500);
                    }
                  })}
                />
                {isOpen && (
                  <div>
                    {this.state.items.map((item, index) => (
                      <div
                        className="autocomplete__list"
                        key={index}
                        {...getItemProps({
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'black' : 'orange',
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
