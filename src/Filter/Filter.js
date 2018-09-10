import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import { FILTER_OPTIONS, DEFAULT_RANGE_FILTER } from './Filter.constants'
import Range from '../Range/Range'
import './Filter.css'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

function TextClick({ onClicked, text }) {
  return (
    <button
      className="filter__action-text"
      onKeyUp={onClicked}
      onClick={onClicked}
    >
      {text}
    </button>
  )
}

TextClick.propTypes = {
  onClicked: PropTypes.func,
  text: PropTypes.string,
}

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFilters: {},
      rangeFilter: DEFAULT_RANGE_FILTER,
      hasFilters: false,
    }
  }

  handleFilterClick = (filter, category) => {
    const selectedFilters = Object.assign({}, this.state.selectedFilters)

    const catergoryArray = Array.isArray(selectedFilters[category])
      ? selectedFilters[category]
      : []

    selectedFilters[category] = !catergoryArray.includes(filter)
      ? [...catergoryArray, filter]
      : catergoryArray.filter(item => item !== filter)

    /* delete property so we can correctly check the length of Object.keys(selectedFilters) */
    if (selectedFilters[category].length === 0) {
      delete selectedFilters[category]
    }

    this.setState({
      selectedFilters,
      hasFilters: Object.keys(selectedFilters).length > 0,
    })
  }

  handleRanageChange = (filterString, rangeValue) => {
    const updatedSelectedFilters = Object.assign({}, this.state.selectedFilters)
    updatedSelectedFilters.CALORIES = filterString
    this.setState({
      rangeFilter: rangeValue,
      selectedFilters: updatedSelectedFilters,
      hasFilters: true,
    })
  }

  clearFilter = () => {
    this.setState({
      selectedFilters: [],
      rangeFilter: DEFAULT_RANGE_FILTER,
      hasFilters: false,
    })
  }

  applyFilters = () => {
    this.props.onSelectionOfFilters(this.state.selectedFilters)
    this.props.onToggleFilterMenu()
  }

  isFilterItemSelected = (filter, category) => {
    const filterCategory = this.state.selectedFilters[category]

    return Array.isArray(filterCategory) && filterCategory.includes(filter)
  }

  render() {
    const { show, onToggleFilterMenu, classes } = this.props
    const {
      hasFilters,
      rangeFilter: { valueMin, valueMax },
    } = this.state

    if (show) {
      return (
        <div className="filter__contatiner">
          <div className="filter__header-container">
            <TextClick onClicked={onToggleFilterMenu} text="Close" />
            <span className="filter__header-heading">Refine Search</span>
            <TextClick onClicked={this.applyFilters} text="Apply" />
          </div>
          {hasFilters && (
            <TextClick onClicked={this.clearFilter} text="Clear" />
          )}
          <div className="filter__content-flex-container">
            {FILTER_OPTIONS.map(({ type, options }) => (
              <div className="filter__body-container">
                <h3>{type}</h3>
                <div className="filter__category">
                  {options.map(filter => (
                    <Chip
                      key={shortid.generate()}
                      className={classes.chip}
                      label={filter}
                      variant={
                        this.isFilterItemSelected(filter, type)
                          ? ''
                          : 'outlined'
                      }
                      onClick={() => this.handleFilterClick(filter, type)}
                    />
                  ))}
                </div>
              </div>
            ))}
            <h3>CALORIES</h3>
            <Range
              valueMin={valueMin}
              valueMax={valueMax}
              onhandleFilterRange={this.handleRanageChange}
            />
          </div>
        </div>
      )
    }
    return null
  }
}

Filter.propTypes = {
  show: PropTypes.bool,
  onToggleFilterMenu: PropTypes.func,
  onSelectionOfFilters: PropTypes.func,
  classes: PropTypes.shape(),
}

export default withStyles(styles)(Filter)
