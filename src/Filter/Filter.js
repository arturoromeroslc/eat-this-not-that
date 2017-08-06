import React, { Component } from 'react'
import PropTypes from 'prop-types';
import shortid from 'shortid'
import Range from '../Range/Range'
import {getFilterSelectedIndex, addFilterToCategory, isFilterSelected} from '../utils/filterSelections'
import './Filter.css'

const DIET_OPTIONS = ['balanced', 'high-protein', 'high-fiber', 'low-fat', 'low-carb', 'low-sodium']
const HEALTH_OPTIONS = ['peanut-free', 'tree-nut-free', 'soy-free', 'fish-free', 'shellfish-free']
const propTypes = {
  show: PropTypes.bool,
  onToggleFilterMenu: PropTypes.func,
  onSelectionOfFilters: PropTypes.func
}
const DEFAULT_RANGE_FILTER = {
  valueMin: 0,
  valueMax: 0
}

function TextClick({ onClicked, text }) {
  return (
    <span className="filter__action-text" onClick={onClicked}>{text}</span>
  )
}

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedFilters: {}, rangeFilter: DEFAULT_RANGE_FILTER }
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleRanageChange = this.handleRanageChange.bind(this)
    this.isFilterItemSelected = this.isFilterItemSelected.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
  }

  handleFilterClick(filter, category) {
    let selectedFilters = this.state.selectedFilters,
      filterSelectedIndex = getFilterSelectedIndex(selectedFilters[category], filter)
    
    if (filterSelectedIndex > -1) {
      selectedFilters[category] = [
        ...selectedFilters[category].slice(0, filterSelectedIndex),
        ...selectedFilters[category].slice(filterSelectedIndex + 1)
      ]
    } else {
      selectedFilters[category] = addFilterToCategory(selectedFilters[category], filter)
    }
    
    this.setState({selectedFilters: selectedFilters})
  }

  handleRanageChange(filterString, rangeValue) {
    const updatedSelectedFilters = Object.assign({}, this.state.selectedFilters)
    updatedSelectedFilters.calories = filterString
    this.setState({rangeFilter: rangeValue, selectedFilters: updatedSelectedFilters})
  }

  clearFilter() {
    this.setState({
      selectedFilters: [],
      rangeFilter: DEFAULT_RANGE_FILTER
    })
  }

  applyFilters() {
    this.props.onSelectionOfFilters(this.state.selectedFilters);
    this.props.onToggleFilterMenu()
  }

  isFilterItemSelected(filter, category) {
    var defaultClass = 'filter__category__item'

    if (isFilterSelected(this.state.selectedFilters[category], filter)) {
      return defaultClass + ' filter__category__item--is-active'
    } else {
      return defaultClass
    }
  }

	render () {
		let show = this.props.show
    let hasFilters = Object.keys(this.state.selectedFilters).length > 0
    let close = <TextClick onClicked={this.props.onToggleFilterMenu} text="Close" />
    let apply = <TextClick onClicked={this.applyFilters} text="Apply" />
    let clear = null

    if (hasFilters) {
      clear = <TextClick onClicked={this.clearFilter} text="Clear" />
    } 

		if (show) {
			return (
				<div className="filter__contatiner">
          <div className="filter__header-container">
						{close}
            <span className="filter__header-heading">Refine Search</span>
            {apply}
          </div>
          {clear}
          <div className="filter__content-flex-container">
            <div className="filter__body-container">
              <h3>Diet</h3> 
              <div className="filter__category">
                {DIET_OPTIONS.map((filter) =>
                  <span
                    className={this.isFilterItemSelected(filter, 'diet')}
                    key={shortid.generate()}
                    onClick={() => this.handleFilterClick(filter, 'diet')}>
                      {filter}
                  </span>
                )}
              </div>
            </div>
  					<div className="filter__body-container">
  						<h3>Health</h3>	
              <div className="filter__category">
                {HEALTH_OPTIONS.map((filter) =>
                  <span
                    className={this.isFilterItemSelected(filter, 'health')}
                    key={shortid.generate()}
                    onClick={() => this.handleFilterClick(filter, 'health')}>
                      {filter}
                  </span>
                )}
              </div>
  					</div>
            <h3>Calories</h3> 
            <Range valueMin={this.state.rangeFilter.valueMin} valueMax={this.state.rangeFilter.valueMax} onhandleFilterRange={this.handleRanageChange}/>
          </div>
				</div>
			)
		} else {
		 	return (
				null
			) 
		}
	}
}

Filter.propTypes = propTypes