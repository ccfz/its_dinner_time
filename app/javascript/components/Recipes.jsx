import React, { useState } from 'react';

import useRecipeFetch from '../hooks/useRecipeFetch';
const Recipes = () => {
  const [recipes, queryRecipes] = useRecipeFetch();
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
    queryRecipes({ ingredients: e.target.value })
  }

  return (
    <div>
      <h1>ITS DINNER TIME</h1>
      <input
        value={value}
        onChange={handleChange}
        aria-label="ingredients-input"
        placeholder="Tomato, Chicken, Pasta"
      />
      <table>
        <tbody>
          {recipes.map(recipe => {
            return (
              <tr key={recipe.id}>
                <td>{recipe.name}</td>
                <td>{recipe.ingredients.join(', ')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  )
}

export default Recipes;
