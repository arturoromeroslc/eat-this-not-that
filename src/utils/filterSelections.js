export function getFilterSelectedIndex(category, filter) {
	return Array.isArray(category) ? category.indexOf(filter) : -1
}

export function addFilterToCategory(category, filter) {
	if (Array.isArray(category)) {
		return [...category, filter] 
	} else {
		return [filter]
	}
}

export function isFilterSelected(category, filter) {
	return (Array.isArray(category) && category.includes(filter))
}
