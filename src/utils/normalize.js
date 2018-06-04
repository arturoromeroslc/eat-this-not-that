const dataNormalizer = data => data.hits.reduce((lastValue, { recipe }, currentIndex) => {
  lastValue[currentIndex] = {
    label: recipe.label,
    ingredientLines: recipe.ingredientLines,
    image: recipe.image,
  }
  return lastValue
}, {})

export default dataNormalizer
