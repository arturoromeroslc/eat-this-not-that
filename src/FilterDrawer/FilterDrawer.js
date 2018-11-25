import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Filter from '../Filter/Filter'

const FilterDrawer = ({
  showFilter,
  toggleFilterMenu,
  updateSelectedFilters,
  selectedFilters,
  onSelectionOfFilters,
  onToggleFilterMenu,
}) => (
  <Drawer anchor="top" open={showFilter} onClose={toggleFilterMenu}>
    <div tabIndex={0} role="button">
      <Filter
        updateSelectedFilters={updateSelectedFilters}
        selectedFilters={selectedFilters}
        onToggleFilterMenu={onToggleFilterMenu}
        onSelectionOfFilters={onSelectionOfFilters}
      />
    </div>
  </Drawer>
)

export default FilterDrawer
