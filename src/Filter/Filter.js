import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Range from '../Range/Range'
import './Filter.css'

const DIET_OPTIONS = [
  'balanced',
  'high-protein',
  'high-fiber',
  'low-fat',
  'low-carb',
  'low-sodium',
]
const HEALTH_OPTIONS = [
  'peanut-free',
  'tree-nut-free',
  'soy-free',
  'fish-free',
  'shellfish-free',
]
const DEFAULT_RANGE_FILTER = { valueMin: 0, valueMax: 0 }

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

export default class Filter extends Component {
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

    this.setState({
      selectedFilters,
      hasFilters: Object.keys(selectedFilters).length > 0,
    })
  }

  handleRanageChange = (filterString, rangeValue) => {
    const updatedSelectedFilters = Object.assign({}, this.state.selectedFilters)
    updatedSelectedFilters.calories = filterString
    this.setState({
      rangeFilter: rangeValue,
      selectedFilters: updatedSelectedFilters,
    })
  }

  clearFilter = () => {
    this.setState({
      selectedFilters: [],
      rangeFilter: DEFAULT_RANGE_FILTER,
    })
  }

  applyFilters = () => {
    this.props.onSelectionOfFilters(this.state.selectedFilters)
    this.props.onToggleFilterMenu()
  }

  isFilterItemSelected = (filter, category) => {
    const defaultClass = 'filter__category__item'
    const filterCategory = this.state.selectedFilters[category]

    return Array.isArray(filterCategory) && filterCategory.includes(filter)
      ? `${defaultClass} filter__category__item--is-active`
      : defaultClass
  }

  render() {
    const { show, onToggleFilterMenu } = this.props
    const { hasFilters } = this.state
    console.log(hasFilters)

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
            <div className="filter__body-container">
              <h3>Diet</h3>
              <div className="filter__category">
                {DIET_OPTIONS.map(filter => (
                  <button
                    className={this.isFilterItemSelected(filter, 'diet')}
                    key={shortid.generate()}
                    onKeyUp={() => this.handleFilterClick(filter, 'diet')}
                    onClick={() => this.handleFilterClick(filter, 'diet')}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter__body-container">
              <h3>Health</h3>
              <div className="filter__category">
                {HEALTH_OPTIONS.map(filter => (
                  <button
                    className={this.isFilterItemSelected(filter, 'health')}
                    key={shortid.generate()}
                    onKeyUp={() => this.handleFilterClick(filter, 'health')}
                    onClick={() => this.handleFilterClick(filter, 'health')}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <h3>Calories</h3>
            <Range
              valueMin={this.state.rangeFilter.valueMin}
              valueMax={this.state.rangeFilter.valueMax}
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
}
