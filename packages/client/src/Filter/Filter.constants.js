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
const FILTER_OPTIONS = [
  { type: 'DIET', options: DIET_OPTIONS },
  { type: 'HEALTH', options: HEALTH_OPTIONS },
]

const DEFAULT_RANGE_FILTER = { valueMin: 0, valueMax: 0 }

export { FILTER_OPTIONS, DEFAULT_RANGE_FILTER }
