import React, { Component } from 'react'
import shortid from 'shortid'
import Range from '../Range/Range'
import {getFilterSelectedIndex, addFilterToCategory, isFilterSelected} from '../utils/filterSelections'
import './Filter.css'

const DIET_OPTIONS = ['balanced', 'high-protein', 'high-fiber', 'low-fat', 'low-carb', 'low-sodium']
const HEALTH_OPTIONS = ['peanut-free', 'tree-nut-free', 'soy-free', 'fish-free', 'shellfish-free']
const propTypes = {
  show: React.PropTypes.bool,
  onToggleFilterMenu: React.PropTypes.func,
  onSelectionOfFilters: React.PropTypes.func
}

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFilters: {}
    }
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.isFilterItemSelected = this.isFilterItemSelected.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
  }

  handleFilterClick(filter, category) {
    let selectedFilters = this.state.selectedFilters,
      filterSelectedIndex = getFilterSelectedIndex(selectedFilters[category], filter)

    if (filterSelectedIndex > -1) {
      selectedFilters[category] = [
        ...selectedFilters[category].slice(0, filterSelectedIndex),
        ...selectedFilters[category].slice(filterSelectedIndex + 1)
      ]
      this.setState({selectedFilters: selectedFilters}, () => {this.props.onSelectionOfFilters(this.state.selectedFilters)})
    } else {
      selectedFilters[category] = addFilterToCategory(selectedFilters[category], filter)
      this.setState({selectedFilters: selectedFilters}, () => {this.props.onSelectionOfFilters(this.state.selectedFilters)})
    }
  }

  clearFilter() {
    this.setState({
      selectedFilters: []
    })
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

		if (show) {
			return (
				<div className="filter__contatiner">
          <div className="filter__header-container">
						<span className="filter__action-text" onClick={this.props.onToggleFilterMenu}>Close</span>
						<span className="filter__header-heading">Refine Search</span>
						<span className="filter__action-text" onClick={this.clearFilter}>Clear</span>
					</div>
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
            <Range />
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