import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles'

import { FILTER_OPTIONS, DEFAULT_RANGE_FILTER } from './Filter.constants'
import Range from '../Range/Range'

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  filterCategory: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'scroll',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  h3: {
    textAlign: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  filterSection: {
    paddingBottom: '4%',
  },
  closeButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // This needs to be read from props
      rangeFilter:
        props.selectedFilters.CALORIES_RANGE_VALUES || DEFAULT_RANGE_FILTER,
      hasFilters: false,
    }
  }

  handleFilterClick = (filter, category) => {
    const selectedFilters = Object.assign({}, this.props.selectedFilters)

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
      hasFilters: Object.keys(selectedFilters).length > 0,
    })

    this.props.updateSelectedFilters(selectedFilters)
  }

  handleRanageChange = (filterString, rangeValue) => {
    const selectedFilters = Object.assign({}, this.props.selectedFilters)
    selectedFilters.CALORIES = filterString
    selectedFilters.CALORIES_RANGE_VALUES = rangeValue
    this.setState({
      rangeFilter: rangeValue,
      hasFilters: true,
    })
    this.props.updateSelectedFilters(selectedFilters)
  }

  clearFilter = () => {
    this.setState({
      rangeFilter: DEFAULT_RANGE_FILTER,
      hasFilters: false,
    })
    this.props.updateSelectedFilters({})
  }

  applyFilters = () => {
    this.props.onSelectionOfFilters(this.props.selectedFilters)
    this.props.onToggleFilterMenu()
  }

  isFilterItemSelected = (filter, category) => {
    const filterCategory = this.props.selectedFilters[category]

    return Array.isArray(filterCategory) && filterCategory.includes(filter)
  }

  render() {
    const { onToggleFilterMenu, classes } = this.props
    const {
      hasFilters,
      rangeFilter: { valueMin, valueMax },
    } = this.state

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.closeButton}
              color="inherit"
              aria-label="Close"
              onClick={onToggleFilterMenu}
            >
              <CancelIcon />
            </IconButton>
            {hasFilters && (
              <IconButton
                className={classes.closeButton}
                color="inherit"
                aria-label="Close"
                onClick={this.clearFilter}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            )}
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Refine Search
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Close"
              onClick={this.applyFilters}
            >
              <SearchOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.flexContainer}>
          {FILTER_OPTIONS.map(({ type, options }) => (
            <div key={type} className={classes.filterSection}>
              <Divider />
              <h3 className={classes.h3}>{type}</h3>
              <div className={classes.filterCategory}>
                {options.map(filter => (
                  <Chip
                    key={shortid.generate()}
                    className={classes.chip}
                    label={filter}
                    variant={
                      this.isFilterItemSelected(filter, type)
                        ? 'default'
                        : 'outlined'
                    }
                    onClick={() => this.handleFilterClick(filter, type)}
                  />
                ))}
              </div>
            </div>
          ))}
          <Divider />
          <div className={classes.filterSection}>
            <h3 className={classes.h3}>CALORIES</h3>
            <Range
              valueMin={valueMin}
              valueMax={valueMax}
              onhandleFilterRange={this.handleRanageChange}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Filter.propTypes = {
  onToggleFilterMenu: PropTypes.func,
  onSelectionOfFilters: PropTypes.func,
  classes: PropTypes.shape(),
  updateSelectedFilters: PropTypes.func,
  selectedFilters: PropTypes.shape(),
}

export default withStyles(styles)(Filter)
