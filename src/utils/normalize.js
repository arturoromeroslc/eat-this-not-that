import shortid from 'shortid'

const dataNormalizer = data => data.hits.map(({ recipe }) => ({
  id: shortid.generate(),
  label: recipe.label,
  ingredientLines: recipe.ingredientLines,
  image: recipe.image,
}))

export default dataNormalizer
