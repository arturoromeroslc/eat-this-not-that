import shortid from 'shortid'

const normalize = data =>
  data.hits.map(({ recipe }) => ({
    id: shortid.generate(),
    label: recipe.label,
    ingredientLines: recipe.ingredientLines,
    image: recipe.image,
    calories: Math.round(recipe.calories),
    url: recipe.url,
  }))

export default normalize
