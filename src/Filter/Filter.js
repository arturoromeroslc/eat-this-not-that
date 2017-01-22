import React, { Component } from 'react';
import './Filter.css';

const checkboxes = ['balanced', 'high-protein', 'high-fiber', 'low-fat', 'low-carb', 'low-sodium'];
const propTypes = {
  show: React.PropTypes.bool,
  onToggleFilterMenu: React.PropTypes.func,
  onSelectionOfFilters: React.PropTypes.func
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: []
    }
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.isFilterItemSelected = this.isFilterItemSelected.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  handleFilterClick(filter) {
    let selectedFilters = this.state.selectedFilters,
      index = selectedFilters.indexOf(filter);

    if (index > -1) {
      this.setState({
        selectedFilters: [
          ...selectedFilters.slice(0, index),
          ...selectedFilters.slice(index + 1)
        ]
      }, () => {this.props.onSelectionOfFilters(this.state.selectedFilters)})
    } else {
      this.setState({
        selectedFilters: [...this.state.selectedFilters, filter]
      }, () => {this.props.onSelectionOfFilters(this.state.selectedFilters)})
    }
  }

  clearFilter() {
    this.setState({
      selectedFilters: []
    })
  }

  isFilterItemSelected(filter) {
    var defaultClass = 'filter__catergory__item';

    if (this.state.selectedFilters.includes(filter)) {
      return defaultClass + ' filter__catergory__item--is-active';
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
						<div className="filter__catergory">
							{checkboxes.map((filter, i) =>
								<span key={i} className={this.isFilterItemSelected(filter)} onClick={() => this.handleFilterClick(filter)}>{filter}</span>
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