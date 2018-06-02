import axios from 'axios'
import Downshift from 'downshift'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import shortid from 'shortid'
import debounce from 'lodash.debounce'
import './AutoComplete.css'

const BASE_END_POINT = 'https://api.nutritionix.com/v2/';
const APP_ID = '&appId=be48f72d&appKey=36843f47de3c76347879e12f49cbfcf4';

export default class AutoComplete extends Component {
  constructor(props) {
    super(props)
    this.debouncedAutoComplete = debounce(this.AutoComplete.bind(this), 250);
    this.state = {
      items: []
    }
  }

  AutoComplete(event) {
    const { value } = event.target
    if (!value) {
      return
    }

    axios
      .get(`${BASE_END_POINT}autocomplete?q=${value}${APP_ID}`)
      .then((response) => {
        const items = response.data.map(item => item.text)
        this.setState({ items })
      })
      .catch((error) => {
        console.error(error)
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
          }) => (
            <div>
              <input
                className="autocomplete__input"
                placeholder="search"
                type="search"
                {...getInputProps({
                    onChange: (e) => { e.persist(); this.debouncedAutoComplete(e) }
                  })}
              />
              {isOpen && (
              <div>
                {this.state.items.map((item, index) => (
                  <div
                    className="autocomplete__list"
                    key={shortid.generate()}
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
            )}
        </Downshift>
      </span>
    )
  }
}

AutoComplete.propTypes = {
  onChangedInputValue: PropTypes.func,
  onSelectedItem: PropTypes.func,
  value: PropTypes.string
}
