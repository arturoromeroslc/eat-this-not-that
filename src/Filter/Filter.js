import React, { Component } from 'react';
import './Filter.css';

const DIET_OPTIONS = ['balanced', 'high-protein', 'high-fiber', 'low-fat', 'low-carb', 'low-sodium'];
const HEALTH_OPTIONS = ['peanut-free', 'tree-nut-free', 'soy-free', 'fish-free', 'shellfish-free'];
const propTypes = {
  show: React.PropTypes.bool,
  onToggleFilterMenu: React.PropTypes.func,
  onSelectionOfFilters: React.PropTypes.func
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: {}
    }
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.isFilterItemSelected = this.isFilterItemSelected.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  handleFilterClick(filter, category) {
    let selectedFilters = this.state.selectedFilters,
      index = selectedFilters[category] ? selectedFilters[category].indexOf(filter) : -1;

    if (selectedFilters[category] && index > -1) {
      selectedFilters[category] = [
        ...selectedFilters[category].slice(0, index),
        ...selectedFilters[category].slice(index + 1)
      ]
      this.setState({selectedFilters: selectedFilters}, () => {this.props.onSelectionOfFilters(this.state.selectedFilters)})
    } else {
      selectedFilters[category] = Array.isArray(selectedFilters[category]) ? [...this.state.selectedFilters[category], filter] : selectedFilters[category] = [filter]
      this.setState({selectedFilters: selectedFilters}, () => {this.props.onSelectionOfFilters(this.state.selectedFilters)})
    }
  }

  clearFilter() {
    this.setState({
      selectedFilters: []
    })
  }

  isFilterItemSelected(filter, category) {
    var defaultClass = 'filter__category__item';

    if (this.state.selectedFilters[category] && this.state.selectedFilters[category].includes(filter)) {
      return defaultClass + ' filter__category__item--is-active';
    } else {
      return defaultClass;
    }
  }

	render () {
		let show = this.props.show;

		if (show) {
			return (
				<div className="filter__contatiner">
					<div className="filter__header-container">
						<span className="filter__action-text" onClick={this.props.onToggleFilterMenu}>Close</span>
						<span className="filter__header-heading">Refine Search</span>
						<span className="filter__action-text" onClick={this.clearFilter}>Clear</span>
					</div>
          <div className="filter__body-container">
            <h3>Diet</h3> 
            <div className="filter__category">
              {DIET_OPTIONS.map((filter, i) =>
                <span key={i} className={this.isFilterItemSelected(filter, 'diet')} onClick={() => this.handleFilterClick(filter, 'diet')}>{filter}</span>
              )}
            </div>
          </div>

					<div className="filter__body-container">
						<h3>Health</h3>	
            <div className="filter__category">
              {HEALTH_OPTIONS.map((filter, i) =>
                <span key={i} className={this.isFilterItemSelected(filter, 'health')} onClick={() => this.handleFilterClick(filter, 'health')}>{filter}</span>
              )}
            </div>
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

Filter.propTypes = propTypes;

export default Filter;