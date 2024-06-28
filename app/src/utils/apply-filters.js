/**
 * Filters an array of items based on filter criteria, searching across specific item properties or all properties.
 * @param {Array} items - The array of items to filter.
 * @param {Object} filters - An object representing the current filter state.
 * @returns {Array} - The filtered array of items.
 */
function applyFilters(items, filters) {
  return items.filter((item) => {
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        // Handling a generic text search across all fields
        if (key === 'search') {
          const regex = new RegExp(value, 'i'); // 'i' for case-insensitive
          if (!Object.values(item).some(prop => regex.test(String(prop)))) {
            return false; // If no property matches the search, exclude this item
          }
        }
        // Handling specific field filters (e.g., 'category', 'role')
        else if (item[key] !== value && value !== 'all') {
          return false; // If the item does not match a specific filter field, exclude it
        }
      }
    }
    return true; // If all conditions pass, include this item
  });
}

export default applyFilters;
