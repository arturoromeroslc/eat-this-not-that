/* eslint-disable react/no-unescaped-entities */
import Downshift from 'downshift'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import debounce from 'lodash.debounce'
import './AutoComplete.css'

const BASE_END_POINT = 'https://api.nutritionix.com/v2/'
const APP_ID = process.env.REACT_APP_NUTRITIONIX_API_KEY

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  )
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

class AutoComplete extends Component {
  constructor(props) {
    super(props)
    this.debouncedAutoComplete = debounce(this.AutoComplete, 250)
    this.state = {
      items: [],
    }
  }

  AutoComplete = event => {
    const { value } = event.target
    if (!value) {
      return
    }

    fetch(`${BASE_END_POINT}autocomplete?q=${value}${APP_ID}`)
      .then(res => res.json())
      .then(
        result => {
          const items = result.map(item => item.text)
          this.setState({ items })
        },
        error => {
          console.error(error)
        },
      )
  }

  render() {
    const { classes } = this.props
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
                autoFocus
                className="autocomplete__input"
                placeholder="search"
                type="search"
                {...getInputProps({
                  onChange: e => {
                    e.persist()
                    this.debouncedAutoComplete(e)
                  },
                })}
              />
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {this.state.items.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
          )}
        </Downshift>
      </span>
    )
  }
}

AutoComplete.propTypes = {
  onSelectedItem: PropTypes.func,
  classes: PropTypes.string,
}

export default withStyles(styles)(AutoComplete)
