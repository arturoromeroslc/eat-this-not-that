export function getFilterSelectedIndex(category, filter) {
	return Array.isArray(category) ? category.indexOf(filter) : -1
}

export function addFilterToCategory(category, filter) {
	let categoryUpdated;

	if (Array.isArray(category)) {
		categoryUpdated = [...category, filter]
	} else {
		categoryUpdated = [filter]
	}

	return categoryUpdated
}

export function isFilterSelected(category, filter) {
	return (Array.isArray(category) && category.includes(filter))
}
