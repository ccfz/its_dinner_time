import React from 'react';

import useRecipeFetch from '../hooks/useRecipeFetch';
const Recipes = () => {
  const [recipes] = useRecipeFetch();

  return (
    <div>
      <h1>ITS DINNER TIME</h1>
      <input placeholder="Tomato, Chicken, Pasta" />
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
